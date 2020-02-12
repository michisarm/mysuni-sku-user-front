
import { decorate, observable } from 'mobx';

class StudentScoreModel {
  //
  testScoreList: number[] = [];
  testTotalScore: number = 0;
  homeworkScore: number = 0;
  numberOfTrials: number = 0;
  latestScore: number = 0;

  constructor(score?: StudentScoreModel) {
    if (score) {
      Object.assign(this, score);
    }
  }
}

decorate(StudentScoreModel, {
  testScoreList: observable,
  testTotalScore: observable,
  homeworkScore: observable,
  numberOfTrials: observable,
  latestScore: observable,
});

export default StudentScoreModel;
