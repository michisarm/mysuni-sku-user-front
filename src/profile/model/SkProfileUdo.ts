import { decorate, observable } from 'mobx';
import { FavoriteJobGroupModel } from './FavoriteJobGroupModel';
import { PisAgreementModel } from './PisAgreementModel';

export class SkProfileUdo {

    favoriteJobGroup : FavoriteJobGroupModel = new FavoriteJobGroupModel();
    pisAgreement : PisAgreementModel = new PisAgreementModel();

    constructor(favoriteJobGroupModel? : FavoriteJobGroupModel, pisAgreement? : PisAgreementModel) {
      if (favoriteJobGroupModel) Object.assign(this, { ...favoriteJobGroupModel });
      if (pisAgreement) Object.assign((this, { ...pisAgreement }));
    }
}

decorate(SkProfileUdo, {
  favoriteJobGroup: observable,
  pisAgreement: observable,
});
