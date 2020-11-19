import AplModel from "./AplModel";

//
class AplUdoModel {
  private readonly id: string;
  private readonly title: string;
  private readonly creatorId: string;
  private readonly creatorName: string;
  private readonly approvalName: string;
  private readonly approvalEmail: string;
  private readonly approvalYn: boolean;
  private readonly allowHour: number;
  private readonly allowMinute: number;
  private readonly causeOfReturn: string;

  private constructor(
    id: string, title: string,
    creatorId: string, creaetorName: string,
    approvalName: string, approvalEmail: string,
    approvalYn: boolean, allowHour: number,
    allowMinute: number, causeOfReturn: string) {
    //
    this.id = id;
    this.title = title;
    this.creatorId = creatorId;
    this.creatorName = creaetorName;
    this.approvalName = approvalName;
    this.approvalEmail = approvalEmail;
    this.approvalYn = approvalYn;
    this.allowHour = allowHour;
    this.allowMinute = allowMinute;
    this.causeOfReturn = causeOfReturn;
  }

  public static createForApproval(apl: AplModel, allowHour: number, allowMinute: number) {
    return new AplUdoModel(apl.id, apl.title, apl.creatorId, apl.creatorName, apl.approvalName, apl.approvalEmail, true, allowHour, allowMinute, '');
  }

  public static createForReject(apl: AplModel, causeOfReturn: string) {
    return new AplUdoModel(apl.id, apl.title, apl.creatorId, apl.creatorName, apl.approvalName, apl.approvalEmail, false, 0, 0, causeOfReturn);
  }
}

export default AplUdoModel;