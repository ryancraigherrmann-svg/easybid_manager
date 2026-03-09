import { Context } from '../context';
import { getAllJobs, createJob as createJobService } from '../services/jobService';

export const resolvers = {
  Query: {
    bids: async (_: any, args: { limit?: number; page?: number }, ctx: Context) => {
      console.log('resolver bids context value:', typeof ctx, !!(ctx && (ctx as any).prisma));
      const limit = args.limit ?? 20;
      const page = args.page && args.page > 0 ? args.page - 1 : 0;
      return ctx.prisma.bid.findMany({
        skip: page * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
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
      return results.map((r: any) => ({ ...r, status: normalizeStatus((r as any).status) }));
    },

    emailGroups: async (_: any, args: { company?: string }, ctx: Context) => {
      const where = args && args.company ? { company: args.company } : undefined;
      return ctx.prisma.emailGroup.findMany({ where, orderBy: { createdAt: 'desc' } });
    },

    jobs: async (_: any, _args: any, ctx: Context) => {
      console.log('resolver jobs context value:', typeof ctx, !!(ctx && (ctx as any).prisma));
      return getAllJobs((ctx as any).prisma);
    },

    bidsForRFP: async (_: any, args: { rfpId: number }, ctx: Context) => {
      const { rfpId } = args;
      console.log('bidsForRFP resolver called with args:', args, 'types:', typeof rfpId);
      return ctx.prisma.bid.findMany({ where: { rfpId }, orderBy: { createdAt: 'desc' } });
    },

    analytics: async (_: any, args: { startDate?: string; endDate?: string }, ctx: Context) => {
      // Default range: 12 weeks back from today
      const end = args.endDate ? new Date(args.endDate) : new Date();
      const start = args.startDate
        ? new Date(args.startDate)
        : new Date(end.getTime() - 12 * 7 * 24 * 60 * 60 * 1000);

      // Helper: build week buckets between start and end
      const buildBuckets = (rows: { createdAt: Date; amount: number }[]) => {
        const map = new Map<string, { count: number; totalAmount: number; weekStart: Date }>();
        // initialise empty buckets for every Monday in the range
        const cursor = new Date(start);
        // align to Monday
        cursor.setDate(cursor.getDate() - ((cursor.getDay() + 6) % 7));
        cursor.setHours(0, 0, 0, 0);
        while (cursor <= end) {
          const key = cursor.toISOString().slice(0, 10);
          map.set(key, { count: 0, totalAmount: 0, weekStart: new Date(cursor) });
          cursor.setDate(cursor.getDate() + 7);
        }
        // fill in the data
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

      // Fetch data in parallel
      const [rfpRows, bidRows, jobRows, awardeeBidRows, allRfpsForStatus] = await Promise.all([
        ctx.prisma.rFP.findMany({
          where: { createdAt: { gte: start, lte: end } },
          select: { createdAt: true },
          orderBy: { createdAt: 'asc' },
        }),
        ctx.prisma.bid.findMany({
          where: { createdAt: { gte: start, lte: end } },
          select: { createdAt: true, amount: true, approved: true },
          orderBy: { createdAt: 'asc' },
        }),
        ctx.prisma.job.findMany({
          where: { createdAt: { gte: start, lte: end } },
          select: { createdAt: true },
          orderBy: { createdAt: 'asc' },
        }),
        // Accepted bids → awardee companies
        ctx.prisma.bid.findMany({
          where: { createdAt: { gte: start, lte: end }, approved: true },
          select: { company: true },
        }),
        // All RFPs (not just in the date range) to count by status
        ctx.prisma.rFP.findMany({
          select: { status: true },
        }),
      ]);

      // Build awardee pie-chart data from accepted bids
      const awardeeMap = new Map<string, number>();
      for (const b of awardeeBidRows as any[]) {
        const name = b.company || 'Unknown';
        awardeeMap.set(name, (awardeeMap.get(name) || 0) + 1);
      }
      const awardees = Array.from(awardeeMap.entries())
        .map(([company, count]) => ({ company, count }))
        .sort((a, b) => b.count - a.count);

      // Build RFPs by status
      const statusMap = new Map<number, number>();
      const statusLabels: Record<number, string> = { 1: 'Draft', 2: 'Receiving Bids', 3: 'In Process', 4: 'Closed' };
      
      for (const rfp of allRfpsForStatus as any[]) {
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
          totalJobValue: 0, // placeholder – job value isn't tracked yet
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

      return ctx.prisma.bid.create({
        data,
        include: { lineItems: true }
      });
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
      // Allow title field
      if (input.title === undefined && input.description) {
        // keep existing behavior if no title provided
      }
      return ctx.prisma.rFP.create({ data: input });
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

      // startDate for Job is kept as string per schema; if present on input leave as-is
      return createJobService((ctx as any).prisma, input);
    },

    updateBid: async (_: any, args: { id: number; input: any }, ctx: Context) => {
      const updateData = { ...args.input };
      // Bid model no longer contains `title` or `status` columns. Strip them.
      if ('title' in updateData) delete (updateData as any).title;
      if ('status' in updateData) delete (updateData as any).status;
      return ctx.prisma.bid.update({ where: { id: args.id }, data: updateData });
    },

    deleteBid: async (_: any, args: { id: number }, ctx: Context) => {
      return ctx.prisma.bid.delete({ where: { id: args.id } });
    }
  },

  Bid: {
    // Derive `status` from the boolean `approved` column for backward compatibility
    status: (parent: any) => parent.approved ? 'Approved' : 'Open',
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
  RFP: {
    emailGroup: async (parent: any, _args: any, ctx: Context) => {
      if (!parent || parent.emailGroupId === undefined || parent.emailGroupId === null) return null;
      return ctx.prisma.emailGroup.findUnique({ where: { id: parent.emailGroupId } });
    }
  }
};


