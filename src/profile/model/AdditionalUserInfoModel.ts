import { decorate, observable } from 'mobx';
import { IdNameList } from 'shared/model';
import { LearningGoal } from './LearningGoal';

class AdditionalUserInfoModel {
  //
  id: string = '';
  learningGoal: LearningGoal = {
    attendance: 0,
    dailyTime: {
      hours: 0,
      minutes: 0,
    },
    hour: 0,
  };

  currentJobDutyId: string = '';
  currentJobGroupId: string = '';
  favoriteChannelIds: string[] = [];
  favoriteJobDutyId: string = '';
  favoriteJobGroupId: string = '';
  favoriteLearningTypes: IdNameList | null = null;
  userDefinedFavoriteJobDuty: string = '';
  userDefinedCurrentJobDuty: string = '';
  // agreementFormId: string = '';
  mySuniPisAgreementFormId: string = '';
  serviceId: string = '';

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
  learningGoal: observable,
  currentJobDutyId: observable,
  currentJobGroupId: observable,
  favoriteChannelIds: observable,
  favoriteJobDutyId: observable,
  favoriteJobGroupId: observable,
  favoriteLearningTypes: observable,
});

export default AdditionalUserInfoModel;
