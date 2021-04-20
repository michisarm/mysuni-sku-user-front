export interface OpenResponse {
  approver: {
    keyString: string;
  },
  remark: string;
  accepted: boolean;
  time: number;
}