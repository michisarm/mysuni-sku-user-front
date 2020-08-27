import { decorate, observable } from 'mobx';
import CurrentJobGroupModel from './CurrentJobGroupModel';
import FavoriteJobGroupModel from './FavoriteJobGroupModel';
import PisAgreementModel from './PisAgreementModel';

class SkProfileUdo {
  //
  currentJobGroup: CurrentJobGroupModel = new CurrentJobGroupModel();
  favoriteJobGroup: FavoriteJobGroupModel = new FavoriteJobGroupModel();
  pisAgreement: PisAgreementModel = new PisAgreementModel();

  constructor(
    currentJobGroupModel?: CurrentJobGroupModel,
    favoriteJobGroupModel?: FavoriteJobGroupModel,
    pisAgreement?: PisAgreementModel
  ) {
    if (currentJobGroupModel) {
      this.currentJobGroup = currentJobGroupModel;
    }
    if (favoriteJobGroupModel) {
      this.favoriteJobGroup = favoriteJobGroupModel;
    }
    if (pisAgreement) {
      this.pisAgreement = pisAgreement;
    }
  }

  static fromPisAgreement(pisAgreement: PisAgreementModel) {
    //
    return new SkProfileUdo({} as any, {} as any, pisAgreement);
  }
}

decorate(SkProfileUdo, {
  currentJobGroup: observable,
  favoriteJobGroup: observable,
  pisAgreement: observable,
});

export default SkProfileUdo;
