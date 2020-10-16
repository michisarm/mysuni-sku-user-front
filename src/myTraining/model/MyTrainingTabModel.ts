import { decorate, observable } from 'mobx';

class MyTrainingTabModel {
  //
  inprogressCount: number = 0;              // 학습중
  enrolledCount: number = 0;                // 학습예정
  completedCount: number = 0;               // 학습완료
  retryCount: number = 0;                   // 취소/미이수


  constructor(mytrainingRdo?: MyTrainingTabModel) {
    //
    if (mytrainingRdo) {
      Object.assign(this, { ...mytrainingRdo });
    }
  }

  static new(inprogressCount: number, enrolledCount: number, completedCount: number, retryCount: number) {
    //
    return new MyTrainingTabModel({
      inprogressCount,
      enrolledCount,
      completedCount,
      retryCount
    });
  }

  static newDefault(inprogressCount: number, enrolledCount: number, completedCount: number, retryCount: number) {
    //
    return new MyTrainingTabModel({
      inprogressCount,
      enrolledCount,
      completedCount,
      retryCount
    });
  }
}

decorate(MyTrainingTabModel, {
  inprogressCount: observable,
  enrolledCount: observable,
  completedCount: observable,
  retryCount: observable,
});

export default MyTrainingTabModel;
