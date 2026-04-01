export type ActivityAction =
  | 'RFP_CREATED'
  | 'RFP_STATUS_CHANGED'
  | 'RFP_NOTIFIED'
  | 'BID_PLACED'
  | 'BID_APPROVED'
  | 'JOB_CREATED'
  | 'FILE_UPLOADED';

export type ActivityEntityType = 'RFP' | 'Bid' | 'Job';

interface LogActivityParams {
  companyId: number;
  userId: number;
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId: number;
  metadata?: Record<string, any>;
}

export async function logActivity(prisma: any, params: LogActivityParams) {
  try {
    await prisma.activityLog.create({ data: params });
  } catch (err) {
    // Activity logging should never break the primary operation
    console.error('Failed to log activity:', err);
  }
}
