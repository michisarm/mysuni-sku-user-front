import { decorate, observable } from 'mobx';
import { IdNameList } from 'shared/model';

class AdditionalUserInfoModel {
  //
  id: string = '';
  // learningGoal: 
  currentJobDutyId: string = '';
  currentJobGroupId: string = '';
  favoriteChannelIds: [] = [];
  favoriteJobDutyId: string = '';
  favoriteJobGroupId: string = '';
  favoriteLearningTypes: IdNameList | null = null;


  constructor(addtionalModel?: AdditionalUserInfoModel) {
    //
    if (addtionalModel) {
      // const member =
      //   (skProfile.member && new EmployeeModel(skProfile.member)) ||
      //   this.member;
      Object.assign(this, { ...addtionalModel });
    }
  }
}

decorate(AdditionalUserInfoModel, {
  id: observable,
  // learningGoal: 
  currentJobDutyId: observable,
  currentJobGroupId: observable,
  favoriteChannelIds: observable,
  favoriteJobDutyId: observable,
  favoriteJobGroupId: observable,
  favoriteLearningTypes: observable,
});

export default AdditionalUserInfoModel;
