//
class AplUdoModel {
  private readonly id: string;
  private readonly approvalYn: boolean;
  private readonly allowHour: number;
  private readonly allowMinute: number;
  private readonly causeOfReturn: string;

  private constructor(id: string, approvalYn: boolean, allowHour: number, allowMinute: number, causeOfReturn: string) {
    this.id = id;
    this.approvalYn = approvalYn;
    this.allowHour = allowHour;
    this.allowMinute = allowMinute;
    this.causeOfReturn = causeOfReturn;
  }

  public static createForApproval(id: string, allowHour: number, allowMinute: number) {
    return new AplUdoModel(id, true, allowHour, allowMinute, '');
  }

  public static createForReject(id: string, causeOfReturn: string) {
    return new AplUdoModel(id, false, 0, 0, causeOfReturn);
  }
}

export default AplUdoModel;