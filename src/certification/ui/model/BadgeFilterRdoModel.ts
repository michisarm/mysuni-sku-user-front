import { decorate, observable } from 'mobx';


class BadgeFilterRdoModel {
  //
  patronKey: string = '';
  categoryId: string = '';
  difficultyLevel: string = '';
  limit: number = 0;
  offset: number = 0;
  issueState: string = '';

  constructor(badgeRdo?: BadgeFilterRdoModel) {
    //
    if (badgeRdo) {
      Object.assign(this, { ...badgeRdo });
    }
  }

  static all(categoryId: string, difficultyLevel: string, limit: number, offset: number) {
    //
    return new BadgeFilterRdoModel({
      patronKey: '',
      categoryId,
      difficultyLevel,
      limit,
      offset,
      issueState: '',
    });
  }

  static challenging(patronKey: string, difficultyLevel: string, limit: number, offset: number) {
    //
    return new BadgeFilterRdoModel({
      patronKey,
      categoryId: '',
      difficultyLevel,
      limit,
      offset,
      issueState: '',
    });
  }

  static earned(patronKey: string, difficultyLevel: string, issueState: string, limit: number=0, offset: number=0) {
    //
    return new BadgeFilterRdoModel({
      patronKey,
      categoryId: '',
      difficultyLevel,
      limit,
      offset,
      issueState,
    });
  }
}

decorate(BadgeFilterRdoModel, {
  categoryId: observable,
  difficultyLevel: observable,
  limit: observable,
  offset: observable,
});

export default BadgeFilterRdoModel;
