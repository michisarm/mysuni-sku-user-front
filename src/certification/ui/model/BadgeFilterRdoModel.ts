import { decorate, observable } from 'mobx';


class BadgeFilterRdoModel {
  //
  categoryId: string = '';
  difficultyLevel: string = '';
  limit: number = 0;
  offset: number = 0;

  constructor(badgeRdo?: BadgeFilterRdoModel) {
    //
    if (badgeRdo) {
      Object.assign(this, { ...badgeRdo });
    }
  }

  static new(categoryId: string, difficultyLevel: string, limit: number, offset: number) {
    //
    return new BadgeFilterRdoModel({
      categoryId,
      difficultyLevel,
      limit,
      offset,
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
