import { decorate, observable } from 'mobx';
import { FavoriteJobGroupModel } from './FavoriteJobGroupModel';

export class SkProfileUdo {

    favoriteJobGroup : FavoriteJobGroupModel = new FavoriteJobGroupModel();

    constructor(favoriteJobGroupModel? : FavoriteJobGroupModel) {
      if (favoriteJobGroupModel) Object.assign(this, { ...favoriteJobGroupModel });
    }
}

decorate(SkProfileUdo, {
  favoriteJobGroup: observable,
});
