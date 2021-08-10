import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import AplModel from './AplModel';

//
class AplApprovalUdo {
  private readonly id: string;
  private readonly allowHour: number;
  private readonly allowMinute: number;
  private readonly approvalYn: boolean;
  private readonly causeOfReturn: string;

  private constructor(
    id: string,
    allowHour: number,
    allowMinute: number,
    approvalYn: boolean,
    causeOfReturn: string
  ) {
    //
    this.id = id;
    this.allowHour = allowHour;
    this.allowMinute = allowMinute;
    this.approvalYn = approvalYn;
    this.causeOfReturn = causeOfReturn;
  }

  public static createForApproval(
    id: string,
    allowHour: number,
    allowMinute: number
  ) {
    return new AplApprovalUdo(id, allowHour, allowMinute, true, '');
  }

  public static createForReject(id: string, causeOfReturn: string) {
    return new AplApprovalUdo(id, 0, 0, false, causeOfReturn);
  }
}

export default AplApprovalUdo;
