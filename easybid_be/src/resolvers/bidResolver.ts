import { Context, AuthUser } from '../context';
import { getAllJobs, createJob as createJobService } from '../services/jobService';
import { sendRFPNotificationEmail, RFPNotificationData } from '../services/emailService';
import { logActivity } from '../services/activityService';

// ── Visibility helpers ──────────────────────────────────────────────────────
// An RFP is visible to a user when:
//   • Admin: originalCompany matches their company, OR any company-member email
//            appears in emailList
//   • Regular user: they created it (User display-name matches) OR their email
//            appears in emailList
// If there is no authenticated user in context, all data is returned (backward
// compatibility for unauthenticated /graphql access).

function canSeeRFP(rfp: any, user: AuthUser): boolean {
  // Creator side: the RFP was sent FROM user's company
  const companyMatch = user.companyName
    ? rfp.originalCompany?.toLowerCase() === user.companyName.toLowerCase()
    : false;

  // Recipient side: user (or company-member) email is in emailList
  const emailList: string[] = Array.isArray(rfp.emailList) ? rfp.emailList.map((e: string) => e.toLowerCase()) : [];

  if (user.isAdmin) {
    // Admin sees anything involving their company
    if (companyMatch) return true;
    // Admin sees RFPs sent TO any member of their company
    if (user.companyEmails.some(e => emailList.includes(e.toLowerCase()))) return true;
    return false;
  }

  // Regular user
  // Did I create it? Match on display name + company
  if (companyMatch && rfp.User === user.displayName) return true;
  // Was it sent to my email?
  if (emailList.includes(user.email.toLowerCase())) return true;
  return false;
}

function getVisibleRFPIds(allRFPs: any[], user: AuthUser | null): Set<number> | null {
  if (!user) return null; // no user = no filtering
  const ids = new Set<number>();
  for (const rfp of allRFPs) {
    if (canSeeRFP(rfp, user)) ids.add(rfp.id);
  }
  return ids;
}

const normalizeStatus = (s: any) => {
  if (s === null || s === undefined) return 1;
  if (typeof s === 'number') return s;
  if (typeof s === 'string') {
    const trimmed = s.trim();
    if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10);
    const low = trimmed.toLowerCase();
    if (low === 'draft') return 1;
    if (low === 'receiving' || low === 'receiving bids' || low === 'receiving_bids' || low === 'bids open' || low === 'open') return 2;
    if (low === 'in process' || low === 'in_process' || low === 'inprocess') return 3;
    if (low === 'closed') return 4;
    return 1;
  }
  return 1;
};

export const resolvers = {
  Query: {
    bids: async (_: any, args: { limit?: number; page?: number }, ctx: Context) => {
      const limit = args.limit ?? 20;
      const page = args.page && args.page > 0 ? args.page - 1 : 0;

      if (!ctx.user) {
        // Unauthenticated – return all (backward compat)
        return ctx.prisma.bid.findMany({ skip: page * limit, take: limit, orderBy: { createdAt: 'desc' } });
      }

      // Load all RFPs to determine visibility, then filter bids
      const allRFPs = await ctx.prisma.rFP.findMany();
      const visibleIds = getVisibleRFPIds(allRFPs, ctx.user)!;

      const allBids = await ctx.prisma.bid.findMany({ orderBy: { createdAt: 'desc' } });
      const filtered = allBids.filter((b: any) => {
        // Bid is on an RFP the user can see
        if (b.rfpId && visibleIds.has(b.rfpId)) return true;
        // User created the bid (match by company name)
        if (ctx.user!.isAdmin && ctx.user!.companyName && b.company?.toLowerCase() === ctx.user!.companyName.toLowerCase()) return true;
        // Regular user: match by email or display name in bid.user field
        if (b.user === ctx.user!.displayName || b.user === ctx.user!.email) return true;
        return false;
      });

      return filtered.slice(page * limit, page * limit + limit);
    },

    bid: async (_: any, args: { id: number }, ctx: Context) => {
      return ctx.prisma.bid.findUnique({ where: { id: args.id } });
    },

    bidPostings: async (_: any, args: { bidId?: number; limit?: number; page?: number }, ctx: Context) => {
      const limit = args.limit ?? 20;
      const page = args.page && args.page > 0 ? args.page - 1 : 0;
      const where = args.bidId ? { bidId: args.bidId } : undefined;
      return ctx.prisma.bidPosting.findMany({
        where,
        skip: page * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
    },

    bidPosting: async (_: any, args: { id: number }, ctx: Context) => {
      return ctx.prisma.bidPosting.findUnique({ where: { id: args.id } });
    },

    rfps: async (_: any, _args: any, ctx: Context) => {
      const results = await ctx.prisma.rFP.findMany({ orderBy: { createdAt: 'desc' } });

      // Apply visibility filtering if user is authenticated
      const filtered = ctx.user
        ? results.filter((r: any) => canSeeRFP(r, ctx.user!))
        : results;

      return filtered.map((r: any) => ({ ...r, status: normalizeStatus((r as any).status) }));
    },

    emailGroups: async (_: any, args: { company?: string }, ctx: Context) => {
      const where = args && args.company ? { company: args.company } : undefined;
      return ctx.prisma.emailGroup.findMany({ where, orderBy: { createdAt: 'desc' } });
    },

    jobs: async (_: any, _args: any, ctx: Context) => {
      if (!ctx.user) {
        return getAllJobs((ctx as any).prisma);
      }

      // Load all jobs, then filter by RFP visibility + company
      const allJobs = await getAllJobs((ctx as any).prisma);
      const allRFPs = await ctx.prisma.rFP.findMany();
      const visibleIds = getVisibleRFPIds(allRFPs, ctx.user)!;

      return (allJobs as any[]).filter((job: any) => {
        // Job linked to a visible RFP
        if (job.rfpId && visibleIds.has(job.rfpId)) return true;
        // Admin sees all jobs for their company
        if (ctx.user!.isAdmin && ctx.user!.companyName && job.company?.toLowerCase() === ctx.user!.companyName.toLowerCase()) return true;
        return false;
      });
    },

    jobTypes: async (_: any, _args: any, ctx: Context) => {
      return ctx.prisma.jobType.findMany({ orderBy: { name: 'asc' } });
    },

    bidsForRFP: async (_: any, args: { rfpId: number }, ctx: Context) => {
      const { rfpId } = args;

      // If authenticated, verify user can see the parent RFP
      if (ctx.user) {
        const rfp = await ctx.prisma.rFP.findUnique({ where: { id: rfpId } });
        if (rfp && !canSeeRFP(rfp, ctx.user)) {
          return []; // not authorised to see this RFP's bids
        }
      }

      return ctx.prisma.bid.findMany({ where: { rfpId }, orderBy: { createdAt: 'desc' } });
    },

    jobActivities: async (_: any, args: { rfpId: number }, ctx: Context) => {
      const { rfpId } = args;

      // Verify visibility
      if (ctx.user) {
        const rfp = await ctx.prisma.rFP.findUnique({ where: { id: rfpId } });
        if (rfp && !canSeeRFP(rfp, ctx.user)) {
          return [];
        }
      }

      return ctx.prisma.jobActivity.findMany({
        where: { rfpId },
        orderBy: { createdAt: 'asc' },
      });
    },

    activityLogs: async (_: any, args: { limit?: number; cursor?: number }, ctx: Context) => {
      if (!ctx.user || !ctx.user.companyId) return [];
      const take = Math.min(args.limit ?? 30, 100);
      const where: any = { companyId: ctx.user.companyId };
      if (args.cursor) {
        where.id = { lt: args.cursor };
      }
      return ctx.prisma.activityLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take,
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      });
    },

    analytics: async (_: any, args: { startDate?: string; endDate?: string }, ctx: Context) => {
      const end = args.endDate ? new Date(args.endDate) : new Date();
      const start = args.startDate
        ? new Date(args.startDate)
        : new Date(end.getTime() - 12 * 7 * 24 * 60 * 60 * 1000);

      const buildBuckets = (rows: { createdAt: Date; amount: number }[]) => {
        const map = new Map<string, { count: number; totalAmount: number; weekStart: Date }>();
        const cursor = new Date(start);
        cursor.setDate(cursor.getDate() - ((cursor.getDay() + 6) % 7));
        cursor.setHours(0, 0, 0, 0);
        while (cursor <= end) {
          const key = cursor.toISOString().slice(0, 10);
          map.set(key, { count: 0, totalAmount: 0, weekStart: new Date(cursor) });
          cursor.setDate(cursor.getDate() + 7);
        }
        for (const row of rows) {
          const d = new Date(row.createdAt);
          d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
          d.setHours(0, 0, 0, 0);
          const key = d.toISOString().slice(0, 10);
          const bucket = map.get(key);
          if (bucket) {
            bucket.count++;
            bucket.totalAmount += row.amount;
          }
        }
        return Array.from(map.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, val]) => ({
            weekStart: key,
            weekLabel: `${val.weekStart.getMonth() + 1}/${val.weekStart.getDate()}`,
            count: val.count,
            totalAmount: Math.round(val.totalAmount * 100) / 100,
          }));
      };

      // Fetch all data, then filter by visibility
      const [allRFPs, allBids, allJobRows, allRfpsForStatus] = await Promise.all([
        ctx.prisma.rFP.findMany({ orderBy: { createdAt: 'asc' } }),
        ctx.prisma.bid.findMany({ orderBy: { createdAt: 'asc' } }),
        ctx.prisma.job.findMany({ orderBy: { createdAt: 'asc' } }),
        ctx.prisma.rFP.findMany({ select: { id: true, status: true, originalCompany: true, User: true, emailList: true } }),
      ]);

      // Get visible RFP ids for filtering
      const visibleIds = getVisibleRFPIds(allRFPs, ctx.user);

      // Filter data to only what the user can see
      const rfpRows = allRFPs.filter((r: any) => {
        if (!visibleIds) return r.createdAt >= start && r.createdAt <= end;
        return visibleIds.has(r.id) && r.createdAt >= start && r.createdAt <= end;
      });

      const bidRows = allBids.filter((b: any) => {
        const inRange = b.createdAt >= start && b.createdAt <= end;
        if (!inRange) return false;
        if (!visibleIds) return true;
        if (b.rfpId && visibleIds.has(b.rfpId)) return true;
        if (ctx.user?.isAdmin && ctx.user.companyName && b.company?.toLowerCase() === ctx.user.companyName.toLowerCase()) return true;
        if (b.user === ctx.user?.displayName || b.user === ctx.user?.email) return true;
        return false;
      });

      const jobRows = allJobRows.filter((j: any) => {
        const inRange = j.createdAt >= start && j.createdAt <= end;
        if (!inRange) return false;
        if (!visibleIds) return true;
        if (j.rfpId && visibleIds.has(j.rfpId)) return true;
        if (ctx.user?.isAdmin && ctx.user.companyName && j.company?.toLowerCase() === ctx.user.companyName.toLowerCase()) return true;
        return false;
      });

      const awardeeBidRows = bidRows.filter((b: any) => b.approved);

      // Filter RFPs for status chart
      const filteredStatusRFPs = allRfpsForStatus.filter((r: any) => {
        if (!ctx.user) return true;
        return canSeeRFP(r, ctx.user);
      });

      const awardeeMap = new Map<string, number>();
      for (const b of awardeeBidRows as any[]) {
        const name = b.company || 'Unknown';
        awardeeMap.set(name, (awardeeMap.get(name) || 0) + 1);
      }
      const awardees = Array.from(awardeeMap.entries())
        .map(([company, count]) => ({ company, count }))
        .sort((a, b) => b.count - a.count);

      const statusMap = new Map<number, number>();
      const statusLabels: Record<number, string> = { 1: 'Draft', 2: 'Receiving Bids', 3: 'In Process', 4: 'Closed' };
      
      for (const rfp of filteredStatusRFPs as any[]) {
        const status = rfp.status === null || rfp.status === undefined ? 1 : Number(rfp.status);
        statusMap.set(status, (statusMap.get(status) || 0) + 1);
      }
      
      const rfpsByStatus = Array.from(statusMap.entries())
        .map(([statusNum, count]) => ({
          status: statusNum,
          statusLabel: statusLabels[statusNum] || `Status ${statusNum}`,
          count,
        }))
        .sort((a, b) => a.status - b.status);

      const rfps = buildBuckets(rfpRows.map((r: any) => ({ createdAt: r.createdAt, amount: 0 })));
      const bids = buildBuckets(bidRows.map((b: any) => ({ createdAt: b.createdAt, amount: b.amount })));
      const jobs = buildBuckets(jobRows.map((j: any) => ({ createdAt: j.createdAt, amount: 0 })));

      const totalBidAmount = bidRows.reduce((s: number, b: any) => s + (b.amount || 0), 0);
      const pendingBidAmount = bidRows
        .filter((b: any) => !b.approved)
        .reduce((s: number, b: any) => s + (b.amount || 0), 0);

      return {
        rfps,
        bids,
        jobs,
        awardees,
        rfpsByStatus,
        summary: {
          totalRFPs: rfpRows.length,
          totalBids: bidRows.length,
          totalJobs: jobRows.length,
          totalBidAmount: Math.round(totalBidAmount * 100) / 100,
          totalJobValue: 0,
          pendingBidAmount: Math.round(pendingBidAmount * 100) / 100,
        },
      };
    }
  },

  Mutation: {
    createBid: async (_: any, args: { input: any }, ctx: Context) => {
      const { amount, rfpId, user, company, info, expectedDate, lineItems } = args.input;
      const data: any = {
        amount,
        approved: false,
        rfpId: rfpId ?? null,
        user: user ?? null,
        company: company ?? null,
        info: info ?? null
      };
      if (expectedDate) {
        data.expectedDate = new Date(expectedDate);
      }

      if (Array.isArray(lineItems) && lineItems.length > 0) {
        // Use nested create to create line items with the bid
        data.lineItems = {
          create: lineItems.map((li: any) => ({
            description: li.description ?? null,
            amount: typeof li.amount === 'number' ? li.amount : parseFloat(li.amount || '0')
          }))
        };
      }

      const bid = await ctx.prisma.bid.create({
        data,
        include: { lineItems: true }
      });

      if (ctx.user?.companyId) {
        const rfp = rfpId ? await ctx.prisma.rFP.findUnique({ where: { id: rfpId } }) : null;
        await logActivity(ctx.prisma, {
          companyId: ctx.user.companyId,
          userId: ctx.user.userId,
          action: 'BID_PLACED',
          entityType: 'Bid',
          entityId: bid.id,
          metadata: { rfpTitle: rfp?.title || null, amount, company: company || null },
        });
      }

      return bid;
    },

    createRFP: async (_: any, args: { input: any }, ctx: Context) => {
      const input = { ...args.input };
      if (input.startDate) {
        input.startDate = new Date(input.startDate);
      }
      if (input.bidsDueDate) {
        input.bidsDueDate = new Date(input.bidsDueDate);
      }
      // Force new RFPs to be created as Draft (1) regardless of input
      input.status = 1;
      // Normalize emailList to array of strings
      if (input.emailList !== undefined) {
        if (!Array.isArray(input.emailList)) {
          // try to parse comma-separated string
          if (typeof input.emailList === 'string') {
            input.emailList = input.emailList.split(',').map((s: string) => s.trim()).filter(Boolean);
          } else {
            input.emailList = [];
          }
        }
      }
      // Normalize emailGroupId
      if (input.emailGroupId !== undefined && typeof input.emailGroupId === 'string') {
        const parsed = input.emailGroupId === '' ? null : parseInt(input.emailGroupId, 10);
        input.emailGroupId = Number.isNaN(parsed) ? null : parsed;
      }
      // Parse images JSON string into a proper array for Prisma Json field
      if (input.images !== undefined && typeof input.images === 'string') {
        try { input.images = JSON.parse(input.images); } catch { /* leave as-is */ }
      }
      // Allow title field
      if (input.title === undefined && input.description) {
        // keep existing behavior if no title provided
      }
      const rfp = await ctx.prisma.rFP.create({ data: input });

      if (ctx.user?.companyId) {
        await logActivity(ctx.prisma, {
          companyId: ctx.user.companyId,
          userId: ctx.user.userId,
          action: 'RFP_CREATED',
          entityType: 'RFP',
          entityId: rfp.id,
          metadata: { title: rfp.title || null, jobType: rfp.jobType || null },
        });
      }

      return rfp;
    },

    updateRFPStatus: async (_: any, args: { id: number; status: number }, ctx: Context) => {
      const { id, status } = args;
      const existing = await ctx.prisma.rFP.findUnique({ where: { id } });
      if (!existing) throw new Error(`RFP ${id} not found`);

      const oldStatus = existing.status === null || existing.status === undefined ? 1 : Number(existing.status);
      const newStatus = Number(status);

      // Allowed transitions:
      // 1 (Draft) -> 2 (Receiving Bids)
      // 2 (Receiving Bids) -> 3 (In Process)
      // 3 (In Process) -> 4 (Closed)
      const allowed = (
        (oldStatus === 1 && newStatus === 2) ||
        (oldStatus === 2 && newStatus === 3) ||
        (oldStatus === 3 && newStatus === 4)
      );

      if (!allowed) {
        throw new Error(`Invalid status transition from ${oldStatus} to ${newStatus}`);
      }

      const updated = await ctx.prisma.rFP.update({ where: { id }, data: { status: newStatus } });

      if (ctx.user?.companyId) {
        const statusLabels: Record<number, string> = { 1: 'Draft', 2: 'Receiving Bids', 3: 'In Process', 4: 'Closed' };
        await logActivity(ctx.prisma, {
          companyId: ctx.user.companyId,
          userId: ctx.user.userId,
          action: 'RFP_STATUS_CHANGED',
          entityType: 'RFP',
          entityId: id,
          metadata: { title: existing.title || null, oldStatus: statusLabels[oldStatus] || oldStatus, newStatus: statusLabels[newStatus] || newStatus },
        });
      }

      return updated;
    },

    updateRFP: async (_: any, args: { id: number; input: any }, ctx: Context) => {
      const { id, input } = args;
      console.log('updateRFP called with id:', id);
      console.log('updateRFP raw input:', input);
      const existing = await ctx.prisma.rFP.findUnique({ where: { id } });
      if (!existing) throw new Error(`RFP ${id} not found`);

      const updateData: any = { ...input };
      console.log('updateRFP initial updateData:', updateData);
      if (updateData.startDate) {
        updateData.startDate = new Date(updateData.startDate);
      }
      if (updateData.bidsDueDate) {
        updateData.bidsDueDate = new Date(updateData.bidsDueDate);
      }

      if (updateData.emailList !== undefined) {
        if (!Array.isArray(updateData.emailList)) {
          if (typeof updateData.emailList === 'string') {
            updateData.emailList = updateData.emailList.split(',').map((s: string) => s.trim()).filter(Boolean);
          } else {
            updateData.emailList = [];
          }
        }
        // Prisma requires using { set: [...] } when updating scalar list fields
        if (Array.isArray(updateData.emailList)) {
          updateData.emailList = { set: updateData.emailList };
        }
      }
      // Parse images JSON string into a proper array for Prisma Json field
      if (updateData.images !== undefined && typeof updateData.images === 'string') {
        try { updateData.images = JSON.parse(updateData.images); } catch { /* leave as-is */ }
      }
      console.log('updateRFP normalized updateData:', updateData);

      if (updateData.emailGroupId !== undefined && typeof updateData.emailGroupId === 'string') {
        const parsed = updateData.emailGroupId === '' ? null : parseInt(updateData.emailGroupId, 10);
        updateData.emailGroupId = Number.isNaN(parsed) ? null : parsed;
      }

      try {
        const updated = await ctx.prisma.rFP.update({ where: { id }, data: updateData });
        console.log('updateRFP succeeded:', { id, updatedEmailList: updated.emailList });
        return updated;
      } catch (err) {
        console.error('updateRFP error:', err);
        throw err;
      }
    },

    createEmailGroup: async (_: any, args: { input: any }, ctx: Context) => {
      const input = { ...args.input };
      if (input.emails !== undefined && !Array.isArray(input.emails)) {
        if (typeof input.emails === 'string') {
          input.emails = input.emails.split(',').map((s: string) => s.trim()).filter(Boolean);
        } else {
          input.emails = [];
        }
      }
      return ctx.prisma.emailGroup.create({ data: input });
    },

    updateEmailGroup: async (_: any, args: { id: number; input: any }, ctx: Context) => {
      const { id, input } = args;
      const updateData: any = { ...input };
      if (updateData.emails !== undefined && !Array.isArray(updateData.emails)) {
        if (typeof updateData.emails === 'string') {
          updateData.emails = updateData.emails.split(',').map((s: string) => s.trim()).filter(Boolean);
        } else {
          updateData.emails = [];
        }
      }
      if (Array.isArray(updateData.emails)) {
        updateData.emails = { set: updateData.emails };
      }
      return ctx.prisma.emailGroup.update({ where: { id }, data: updateData });
    },

    deleteEmailGroup: async (_: any, args: { id: number }, ctx: Context) => {
      const { id } = args;
      await ctx.prisma.emailGroup.delete({ where: { id } });
      return true;
    },

    createJob: async (_: any, args: { input: any }, ctx: Context) => {
      const input = { ...args.input };

      console.log('createJob resolver ctx.prisma present?:', !!(ctx as any).prisma);
      console.log('createJob resolver input (preview):', {
        title: input.title,
        rfpId: input.rfpId,
        daysExpected: input.daysExpected
      });

      // Normalize values similar to createRFP's date normalization so UI can send strings
      if (input.rfpId !== undefined) {
        if (typeof input.rfpId === 'string') {
          input.rfpId = input.rfpId === '' ? null : parseInt(input.rfpId, 10);
        }
      }

      if (input.daysExpected !== undefined) {
        if (typeof input.daysExpected === 'string') {
          input.daysExpected = input.daysExpected === '' ? null : parseInt(input.daysExpected, 10);
        }
      }

      // jobType is required in the DB — default to empty string if not provided
      if (!input.jobType) {
        input.jobType = '';
      }

      // startDate for Job is kept as string per schema; if present on input leave as-is
      const job = await createJobService((ctx as any).prisma, input);

      if (ctx.user?.companyId) {
        const rfp = input.rfpId ? await ctx.prisma.rFP.findUnique({ where: { id: input.rfpId } }) : null;
        await logActivity(ctx.prisma, {
          companyId: ctx.user.companyId,
          userId: ctx.user.userId,
          action: 'JOB_CREATED',
          entityType: 'Job',
          entityId: job.id,
          metadata: { title: job.title || null, company: job.company || null, rfpTitle: rfp?.title || null },
        });
      }

      return job;
    },

    createJobActivity: async (_: any, args: { input: any }, ctx: Context) => {
      const { rfpId, type, content, fileName, fileKey } = args.input;
      if (!ctx.user) throw new Error('Authentication required');
      if (!['message', 'file'].includes(type)) throw new Error('Invalid activity type');

      // Find the job linked to this RFP
      const job = await ctx.prisma.job.findFirst({ where: { rfpId } });
      if (!job) throw new Error(`No job found for RFP ${rfpId}`);

      // Verify user can see this RFP
      const rfp = await ctx.prisma.rFP.findUnique({ where: { id: rfpId } });
      if (rfp && !canSeeRFP(rfp, ctx.user)) {
        throw new Error('Not authorized to post to this job');
      }

      const activity = await ctx.prisma.jobActivity.create({
        data: {
          jobId: job.id,
          rfpId,
          type,
          content,
          fileName: fileName ?? null,
          fileKey: fileKey ?? null,
          author: ctx.user.displayName || ctx.user.email,
        },
      });

      if (ctx.user.companyId) {
        const rfpObj = await ctx.prisma.rFP.findUnique({ where: { id: rfpId } });
        await logActivity(ctx.prisma, {
          companyId: ctx.user.companyId,
          userId: ctx.user.userId,
          action: type === 'file' ? 'FILE_UPLOADED' : 'RFP_CREATED', // reuse for message; could add MESSAGE_SENT
          entityType: 'Job',
          entityId: job.id,
          metadata: { jobTitle: job.title || null, rfpTitle: rfpObj?.title || null, fileName: fileName || null, type },
        });
      }

      return activity;
    },

    createJobType: async (_: any, args: { name: string }, ctx: Context) => {
      return ctx.prisma.jobType.create({ data: { name: args.name } });
    },

    deleteJobType: async (_: any, args: { id: number }, ctx: Context) => {
      await ctx.prisma.jobType.delete({ where: { id: args.id } });
      return true;
    },

    notifyRFPRecipients: async (_: any, args: { rfpId: number; emails: string[] }, ctx: Context) => {
      const { rfpId, emails } = args;
      if (!emails || emails.length === 0) throw new Error('No email recipients provided');

      const rfp = await ctx.prisma.rFP.findUnique({ where: { id: rfpId } });
      if (!rfp) throw new Error(`RFP ${rfpId} not found`);

      const senderName = ctx.user?.displayName || ctx.user?.email || 'EasyBid User';
      const company = rfp.originalCompany || ctx.user?.companyName || '';

      const notificationData: RFPNotificationData = {
        rfpId: rfp.id,
        title: rfp.title || '',
        description: rfp.description || '',
        jobType: rfp.jobType || '',
        company,
        startDate: rfp.startDate ? rfp.startDate.toISOString() : '',
        bidsDueDate: rfp.bidsDueDate ? rfp.bidsDueDate.toISOString() : '',
        senderName,
      };

      try {
        await sendRFPNotificationEmail(emails, notificationData);
        // Merge newly-notified emails with any previously notified
        const existingNotified: string[] = Array.isArray(rfp.notifiedEmails) ? rfp.notifiedEmails : [];
        const mergedNotified = Array.from(new Set([...existingNotified, ...emails.map(e => e.toLowerCase())]));
        // Record the notification timestamp and the notified emails on the RFP
        await ctx.prisma.rFP.update({ where: { id: rfpId }, data: { notifiedAt: new Date(), notifiedEmails: { set: mergedNotified } } });

        if (ctx.user?.companyId) {
          await logActivity(ctx.prisma, {
            companyId: ctx.user.companyId,
            userId: ctx.user.userId,
            action: 'RFP_NOTIFIED',
            entityType: 'RFP',
            entityId: rfpId,
            metadata: { title: rfp.title || null, recipientCount: emails.length },
          });
        }

        return true;
      } catch (err) {
        console.error('Failed to send RFP notification emails:', err);
        throw new Error('Failed to send notification emails');
      }
    },

    updateBid: async (_: any, args: { id: number; input: any }, ctx: Context) => {
      const updateData = { ...args.input };
      // Bid model no longer contains `title` or `status` columns. Strip them.
      if ('title' in updateData) delete (updateData as any).title;
      if ('status' in updateData) delete (updateData as any).status;
      // Convert expectedDate string to Date if provided
      if (updateData.expectedDate) {
        updateData.expectedDate = new Date(updateData.expectedDate);
      }
      const updatedBid = await ctx.prisma.bid.update({ where: { id: args.id }, data: updateData });

      if (args.input.approved === true && ctx.user?.companyId) {
        const rfp = updatedBid.rfpId ? await ctx.prisma.rFP.findUnique({ where: { id: updatedBid.rfpId } }) : null;
        await logActivity(ctx.prisma, {
          companyId: ctx.user.companyId,
          userId: ctx.user.userId,
          action: 'BID_APPROVED',
          entityType: 'Bid',
          entityId: updatedBid.id,
          metadata: { rfpTitle: rfp?.title || null, amount: updatedBid.amount, bidderCompany: updatedBid.company || null },
        });
      }

      return updatedBid;
    },

    deleteBid: async (_: any, args: { id: number }, ctx: Context) => {
      return ctx.prisma.bid.delete({ where: { id: args.id } });
    },

    deleteJob: async (_: any, args: { id: number }, ctx: Context) => {
      // Delete related activities first
      await ctx.prisma.jobActivity.deleteMany({ where: { jobId: args.id } });
      return ctx.prisma.job.delete({ where: { id: args.id } });
    },

    deleteRFP: async (_: any, args: { id: number }, ctx: Context) => {
      const rfp = await ctx.prisma.rFP.findUnique({ where: { id: args.id } });
      if (!rfp) throw new Error(`RFP ${args.id} not found`);
      // Delete related bids (and their line items) and jobs
      const bids = await ctx.prisma.bid.findMany({ where: { rfpId: args.id } });
      for (const bid of bids) {
        await ctx.prisma.bidLineItem.deleteMany({ where: { bidId: bid.id } });
      }
      await ctx.prisma.bid.deleteMany({ where: { rfpId: args.id } });
      const jobs = await ctx.prisma.job.findMany({ where: { rfpId: args.id } });
      for (const job of jobs) {
        await ctx.prisma.jobActivity.deleteMany({ where: { jobId: job.id } });
      }
      await ctx.prisma.job.deleteMany({ where: { rfpId: args.id } });
      return ctx.prisma.rFP.delete({ where: { id: args.id } });
    }
  },

  Bid: {
    // Derive `status` from the boolean `approved` column for backward compatibility
    status: (parent: any) => parent.approved ? 'Approved' : 'Open',
    createdAt: (parent: any) => parent.createdAt instanceof Date ? parent.createdAt.toISOString() : parent.createdAt,
    updatedAt: (parent: any) => parent.updatedAt instanceof Date ? parent.updatedAt.toISOString() : parent.updatedAt,
    title: async (parent: any, _args: any, ctx: Context) => {
      // If the bid object already has a title, return it.
      if (parent && parent.title) return parent.title;
      // If the parent already included the related RFP, use its title.
      if (parent && parent.rfp && (parent.rfp as any).title) return (parent.rfp as any).title;
      // Otherwise, load the RFP by rfpId and return its title. Ensure non-nullable contract by returning empty string fallback.
      if (parent && parent.rfpId) {
        const rfp = await ctx.prisma.rFP.findUnique({ where: { id: parent.rfpId } });
        return rfp?.title ?? '';
      }
      return '';
    },
    postings: async (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.bidPosting.findMany({ where: { bidId: parent.id }, orderBy: { createdAt: 'desc' } });
    }
    ,
    lineItems: async (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.bidLineItem.findMany({ where: { bidId: parent.id }, orderBy: { createdAt: 'desc' } });
    }
  }
,
  BidPosting: {
    images: (parent: any) => {
      if (parent.images === null || parent.images === undefined) return null;
      if (typeof parent.images === 'string') return parent.images;
      return JSON.stringify(parent.images);
    },
    createdAt: (parent: any) => parent.createdAt instanceof Date ? parent.createdAt.toISOString() : parent.createdAt,
    updatedAt: (parent: any) => parent.updatedAt instanceof Date ? parent.updatedAt.toISOString() : parent.updatedAt,
  },
  RFP: {
    images: (parent: any) => {
      if (parent.images === null || parent.images === undefined) return null;
      if (typeof parent.images === 'string') return parent.images;
      return JSON.stringify(parent.images);
    },
    createdAt: (parent: any) => parent.createdAt instanceof Date ? parent.createdAt.toISOString() : parent.createdAt,
    updatedAt: (parent: any) => parent.updatedAt instanceof Date ? parent.updatedAt.toISOString() : parent.updatedAt,
    notifiedAt: (parent: any) => parent.notifiedAt instanceof Date ? parent.notifiedAt.toISOString() : parent.notifiedAt ?? null,
    emailGroup: async (parent: any, _args: any, ctx: Context) => {
      if (!parent || parent.emailGroupId === undefined || parent.emailGroupId === null) return null;
      return ctx.prisma.emailGroup.findUnique({ where: { id: parent.emailGroupId } });
    }
  },
  Job: {
    activities: async (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.jobActivity.findMany({ where: { jobId: parent.id }, orderBy: { createdAt: 'asc' } });
    },
    createdAt: (parent: any) => parent.createdAt instanceof Date ? parent.createdAt.toISOString() : parent.createdAt,
    updatedAt: (parent: any) => parent.updatedAt instanceof Date ? parent.updatedAt.toISOString() : parent.updatedAt,
  },
  JobActivity: {
    createdAt: (parent: any) => parent.createdAt instanceof Date ? parent.createdAt.toISOString() : parent.createdAt,
    updatedAt: (parent: any) => parent.updatedAt instanceof Date ? parent.updatedAt.toISOString() : parent.updatedAt,
  },
  ActivityLog: {
    createdAt: (parent: any) => parent.createdAt instanceof Date ? parent.createdAt.toISOString() : parent.createdAt,
    metadata: (parent: any) => {
      if (parent.metadata === null || parent.metadata === undefined) return null;
      if (typeof parent.metadata === 'string') return parent.metadata;
      return JSON.stringify(parent.metadata);
    },
  }
};
