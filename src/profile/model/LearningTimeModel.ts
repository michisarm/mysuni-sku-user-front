
import { decorate, observable } from 'mobx';


class LearningTimeModel {
  //
  learningMinutes: number = 0;
  totalHours: number = 0;

  constructor(learningTime? : LearningTimeModel) {
    if (learningTime) {
      Object.assign(this, { ...learningTime });
    }
  }
}

decorate(LearningTimeModel, {
  learningMinutes: observable,
  totalHours: observable,
});

export default LearningTimeModel;
