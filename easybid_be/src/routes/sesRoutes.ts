import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

// ── SNS Webhook: SES Bounce & Complaint Notifications ───────────────────────
// SNS sends a POST with a JSON body. On first subscription it sends a
// SubscriptionConfirmation message that we must acknowledge by fetching the
// SubscribeURL.  After that it sends Notification messages for each bounce or
// complaint event.

router.post('/ses/notifications', async (req: Request, res: Response) => {
  try {
    const messageType = req.headers['x-amz-sns-message-type'] as string;
    // SNS sends text/plain even though the body is JSON
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // ── Subscription confirmation ──
    if (messageType === 'SubscriptionConfirmation') {
      const subscribeUrl = body.SubscribeURL;
      if (subscribeUrl && subscribeUrl.startsWith('https://sns.')) {
        console.log('📧 Confirming SNS subscription…');
        await fetch(subscribeUrl);
        console.log('📧 SNS subscription confirmed');
      }
      return res.sendStatus(200);
    }

    // ── Notification ──
    if (messageType === 'Notification') {
      const message = typeof body.Message === 'string' ? JSON.parse(body.Message) : body.Message;
      const notificationType: string | undefined = message?.notificationType;

      const emailsToSuppress: string[] = [];
      let reason = 'bounce';

      if (notificationType === 'Bounce') {
        reason = 'bounce';
        const recipients = message.bounce?.bouncedRecipients || [];
        for (const r of recipients) {
          if (r.emailAddress) emailsToSuppress.push(r.emailAddress.toLowerCase());
        }
      } else if (notificationType === 'Complaint') {
        reason = 'complaint';
        const recipients = message.complaint?.complainedRecipients || [];
        for (const r of recipients) {
          if (r.emailAddress) emailsToSuppress.push(r.emailAddress.toLowerCase());
        }
      }

      for (const email of emailsToSuppress) {
        await prisma.suppressedEmail.upsert({
          where: { email },
          update: { reason, source: 'sns' },
          create: { email, reason, source: 'sns' },
        });
        console.log(`📧 Suppressed email: ${email} (${reason})`);
      }

      return res.sendStatus(200);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('Error processing SES notification:', err);
    res.sendStatus(500);
  }
});

// ── Unsubscribe endpoint ────────────────────────────────────────────────────
// Linked from RFP notification emails. Adds the email to the suppression list.
router.get('/unsubscribe', async (req: Request, res: Response) => {
  const email = (req.query.email as string || '').toLowerCase().trim();

  if (!email || !email.includes('@')) {
    return res.status(400).send('Invalid email address.');
  }

  try {
    await prisma.suppressedEmail.upsert({
      where: { email },
      update: { reason: 'unsubscribe', source: 'user' },
      create: { email, reason: 'unsubscribe', source: 'user' },
    });

    res.send(`
      <!DOCTYPE html>
      <html><head><title>Unsubscribed — EasyBid</title></head>
      <body style="font-family:Arial,sans-serif;text-align:center;padding:60px 20px;">
        <h2 style="color:#1E3A50;">You've been unsubscribed</h2>
        <p style="color:#475569;">You will no longer receive RFP notification emails from EasyBid.</p>
      </body></html>
    `);
  } catch (err) {
    console.error('Unsubscribe error:', err);
    res.status(500).send('Something went wrong. Please try again.');
  }
});

export default router;
