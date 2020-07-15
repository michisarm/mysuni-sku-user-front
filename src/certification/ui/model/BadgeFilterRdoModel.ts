import { decorate, observable } from 'mobx';
import { patronInfo } from '@nara.platform/dock';

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

  static all(categoryId: string, difficultyLevel: string, limit: number=12, offset: number=0) {
    //
    return new BadgeFilterRdoModel({
      patronKey: patronInfo.getPatronId()!,
      categoryId,
      difficultyLevel,
      limit,
      offset,
      issueState: '',
    });
  }

  static challenging(difficultyLevel: string, limit: number, offset: number=0) {
    //
    return new BadgeFilterRdoModel({
      patronKey: patronInfo.getPatronId()!,
      categoryId: '',
      difficultyLevel,
      limit,
      offset,
      issueState: '',
    });
  }

  static earned(difficultyLevel: string, issueState: string, limit: number=12, offset: number=0) {
    //
    return new BadgeFilterRdoModel({
      patronKey: patronInfo.getPatronId()!,
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
