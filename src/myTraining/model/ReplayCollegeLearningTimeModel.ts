import { decorate, observable } from 'mobx';

export default class ReplayCollegeLearningTimeModel {
  //
  collegeId: string = '';
  denizenId: string = '';
  id: string = '';
  replayLearningTime: number = 0;
  modifiedTime: number = 0;
  year: number = 0;

  constructor(replayCollegeLearningTimeModel?: ReplayCollegeLearningTimeModel) {
    if (replayCollegeLearningTimeModel) {
      Object.assign(this, { replayCollegeLearningTimeModel });
    }
  }
}

decorate(ReplayCollegeLearningTimeModel, {
  collegeId: observable,
  denizenId: observable,
  id: observable,
  replayLearningTime: observable,
  modifiedTime: observable,
  year: observable,
});
