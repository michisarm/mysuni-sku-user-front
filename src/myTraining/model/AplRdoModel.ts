//
export class AplRdoModel {
  state: string;
  countType: CountType;
  offset: number;
  limit: number;

  public constructor(state: string = '', countType: CountType = CountType.None, offset: number = 0, limit: number = 20) {
    this.state = state;
    this.countType = countType;
    this.offset = offset;
    this.limit = limit;
  }
}

/* 
  MyLearningPage 탭 카운트 조회 :: 'patronKeyString'
  MyApprovalPage 탭 카운트 조회 :: 'approvalId'
*/
export enum CountType {
  approvalId = 'approvalId',
  patronKeyString = 'patronKeyString',
  None = ''
}