export interface MemberCount {
  totalCount: number;
  approvalCount: ApprovalCount;
}

export interface ApprovalCount {
  approvedCount: number;
  waitingCount: number;
  rejectCount: number;
  drawCount: number;
}
