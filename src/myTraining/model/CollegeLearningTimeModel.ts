import _ from 'lodash';
import { decorate, observable } from 'mobx';

export default class CollegeLearningTimeModel {
  //
  collegeId: string = '';
  denizenId: string = '';
  id: string = '';
  learningTime: number = 0;
  modifiedTime: number = 0;
  year: number = 0;

  constructor(collegeLearningTime?: CollegeLearningTimeModel) {
    if (collegeLearningTime) {
      Object.assign(this, { collegeLearningTime });
    }
  }
}

decorate(CollegeLearningTimeModel, {
  collegeId: observable,
  denizenId: observable,
  id: observable,
  learningTime: observable,
  modifiedTime: observable,
  year: observable,
});
