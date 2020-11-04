export class AplCountModel {
  searchOnCount: number = 0;
  searchOffCount: number = 0;
  totalCount: number = 0;
  all: number = 0;
  openApproval: number = 0;
  opened: number = 0;
  rejected: number = 0;

  constructor(aplCountModel?: AplCountModel) {
    if (aplCountModel) {
      Object.assign(this, aplCountModel);
    }
  }
}
