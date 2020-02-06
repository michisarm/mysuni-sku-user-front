
import { decorate, observable } from 'mobx';
import { FavoriteJobGroupModel } from './FavoriteJobGroupModel';
import { PisAgreementModel } from './PisAgreementModel';

export class SkProfileUdo {
  //
  favoriteJobGroup : FavoriteJobGroupModel = new FavoriteJobGroupModel();
  pisAgreement : PisAgreementModel = new PisAgreementModel();

  constructor(favoriteJobGroupModel? : FavoriteJobGroupModel, pisAgreement? : PisAgreementModel) {
    if (favoriteJobGroupModel) {
      this.favoriteJobGroup = favoriteJobGroupModel;
    }
    if (pisAgreement) {
      this.pisAgreement = pisAgreement;
    }
  }

  static fromPisAgreement(pisAgreement: PisAgreementModel) {
    //
    return new SkProfileUdo({} as any, pisAgreement);
  }
}

decorate(SkProfileUdo, {
  favoriteJobGroup: observable,
  pisAgreement: observable,
});
