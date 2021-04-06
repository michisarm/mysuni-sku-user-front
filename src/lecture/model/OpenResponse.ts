export default interface OpenResponse {
  approver: { keyString: string };
  remark: string;
  accepted: boolean;
  time: number;
}
