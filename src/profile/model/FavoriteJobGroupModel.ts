import { decorate, observable } from 'mobx';
import { IdName } from '../../shared/model/IdName';

export class FavoriteJobGroupModel {

  favoriteJobGroup : IdName = new IdName();
  favoriteJobDuty : IdName = new IdName();

  constructor(favoriteJobGroup? : FavoriteJobGroupModel) {
    Object.assign(this, { ...favoriteJobGroup });
  }

}

decorate(FavoriteJobGroupModel, {
  favoriteJobGroup: observable,
  favoriteJobDuty: observable,
});
