import { decorate, observable } from 'mobx';
import SkProfileModel from './SkProfileModel';
import AdditionalUserInfoModel from './AdditionalUserInfoModel';

class TempProfileModel {
  //
  user: SkProfileModel = new SkProfileModel();
  additionalUserInfo: AdditionalUserInfoModel = new AdditionalUserInfoModel();


  constructor(profile?: TempProfileModel) {
    //
    if (profile) {
      Object.assign(this, { ...profile });
    }
  }
}

decorate(TempProfileModel, {
  user: observable,
  additionalUserInfo: observable
});

export default TempProfileModel;
