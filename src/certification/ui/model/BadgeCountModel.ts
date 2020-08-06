
class BadgeCountModel {
  //
  code: string = '';
  message: string = '';
  totalCount: number = 0;
  challengedCount: number = 0;
  issuedCount: number = 0;

  constructor(badge?: BadgeCountModel) {
    //
    Object.assign(this, { ...badge });
  }
}

export default BadgeCountModel;
