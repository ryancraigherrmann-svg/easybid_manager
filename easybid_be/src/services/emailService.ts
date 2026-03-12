import nodemailer from 'nodemailer';

// ── Mail transport ──────────────────────────────────────────────────────────
// In production set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS env vars.
// For development use Ethereal (free test SMTP) when no vars are present.

let _transporter: nodemailer.Transporter | null = null;

async function getTransporter(): Promise<nodemailer.Transporter> {
  if (_transporter) return _transporter;

  if (process.env.SMTP_HOST) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Ethereal test account — emails are captured at https://ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    _transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    console.log('📧 Using Ethereal test email account:', testAccount.user);
  }

  return _transporter;
}

const FROM_ADDRESS = process.env.SMTP_FROM || 'EasyBid <noreply@easybid.io>';

// ── Template: Email Verification ────────────────────────────────────────────

export async function sendVerificationEmail(to: string, firstName: string | null, verificationUrl: string) {
  const transporter = await getTransporter();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email — EasyBid</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F7FA;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F7FA;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#1E3A50;padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:0.5px;">EasyBid</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 32px 24px;">
              <h2 style="margin:0 0 12px;color:#1E3A50;font-size:22px;font-weight:600;">Verify your email address</h2>
              <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
                Hi${firstName ? ` ${firstName}` : ''},<br/><br/>
                Thanks for creating an EasyBid account! Please click the button below to verify your email address and activate your account.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                <tr>
                  <td align="center" style="background-color:#2C5272;border-radius:8px;">
                    <a href="${verificationUrl}" target="_blank"
                       style="display:inline-block;padding:14px 36px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 12px;color:#94a3b8;font-size:13px;line-height:1.5;">
                If the button doesn't work, copy and paste this link into your browser:<br/>
                <a href="${verificationUrl}" style="color:#2C5272;word-break:break-all;">${verificationUrl}</a>
              </p>
              <p style="margin:0;color:#94a3b8;font-size:13px;">This link expires in 24 hours.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #E2E8F0;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">&copy; ${new Date().getFullYear()} EasyBid. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const info = await transporter.sendMail({
    from: FROM_ADDRESS,
    to,
    subject: 'Verify your email — EasyBid',
    html,
  });

  // When using Ethereal, log the preview URL
  const preview = nodemailer.getTestMessageUrl(info);
  if (preview) console.log('📧 Verification email preview:', preview);

  return info;
}

// ── Template: RFP Notification ──────────────────────────────────────────────

export interface RFPNotificationData {
  rfpId: number;
  title: string;
  description: string;
  jobType: string;
  company: string;
  startDate: string;
  bidsDueDate: string;
  senderName: string;
}

export async function sendRFPNotificationEmail(to: string[], data: RFPNotificationData) {
  if (!to.length) return null;
  const transporter = await getTransporter();

  const bidsDueDateFormatted = data.bidsDueDate
    ? new Date(data.bidsDueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Not specified';
  const startDateFormatted = data.startDate
    ? new Date(data.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Not specified';

  const appUrl = process.env.APP_URL || 'http://localhost:5173';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New RFP Invitation — EasyBid</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F7FA;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F7FA;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#1E3A50;padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td><h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">EasyBid</h1></td>
                  <td align="right"><span style="color:#94a3b8;font-size:13px;">Request for Proposal</span></td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 32px 12px;">
              <h2 style="margin:0 0 6px;color:#1E3A50;font-size:22px;font-weight:600;">You've been invited to bid!</h2>
              <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">
                <strong>${data.senderName}</strong> from <strong>${data.company}</strong> has published a new RFP and is requesting your proposal.
              </p>
            </td>
          </tr>
          <!-- RFP Details Card -->
          <tr>
            <td style="padding:0 32px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F7FF;border-radius:10px;border:1px solid #D4E4F7;">
                <tr>
                  <td style="padding:24px;">
                    <h3 style="margin:0 0 16px;color:#1E3A50;font-size:18px;font-weight:600;">${data.title || 'Untitled RFP'}</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding:6px 0;vertical-align:top;">
                          <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Job Type</span><br/>
                          <span style="color:#1E3A50;font-size:14px;font-weight:500;">${data.jobType || 'N/A'}</span>
                        </td>
                        <td width="50%" style="padding:6px 0;vertical-align:top;">
                          <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">RFP #</span><br/>
                          <span style="color:#1E3A50;font-size:14px;font-weight:500;">${data.rfpId}</span>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding:6px 0;vertical-align:top;">
                          <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Start Date</span><br/>
                          <span style="color:#1E3A50;font-size:14px;font-weight:500;">${startDateFormatted}</span>
                        </td>
                        <td width="50%" style="padding:6px 0;vertical-align:top;">
                          <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Bids Due</span><br/>
                          <span style="color:#DC2626;font-size:14px;font-weight:600;">${bidsDueDateFormatted}</span>
                        </td>
                      </tr>
                    </table>
                    ${data.description ? `
                    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #D4E4F7;">
                      <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Description</span>
                      <p style="margin:6px 0 0;color:#334155;font-size:14px;line-height:1.5;">${data.description}</p>
                    </div>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td align="center" style="padding:0 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#2C5272;border-radius:8px;">
                    <a href="${appUrl}" target="_blank"
                       style="display:inline-block;padding:14px 40px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;">
                      View RFP &amp; Submit Bid
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #E2E8F0;text-align:center;">
              <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;">You received this because your email was added to an RFP on EasyBid.</p>
              <p style="margin:0;color:#94a3b8;font-size:12px;">&copy; ${new Date().getFullYear()} EasyBid. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const info = await transporter.sendMail({
    from: FROM_ADDRESS,
    to: to.join(', '),
    subject: `New RFP: ${data.title || 'Bid Request'} — EasyBid`,
    html,
  });

  const preview = nodemailer.getTestMessageUrl(info);
  if (preview) console.log('📧 RFP notification email preview:', preview);

  return info;
}
