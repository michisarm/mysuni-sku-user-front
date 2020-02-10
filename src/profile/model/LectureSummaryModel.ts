
import { decorate, observable } from 'mobx';


class LectureSummaryModel {
  //
  completeCount: number = 0;
  runningCount: number = 0;
  enrolledCount: number = 0;
  rejectedCount: number = 0;


  constructor(lectureSummary? : LectureSummaryModel) {
    if (lectureSummary) {
      Object.assign(this, { ...lectureSummary });
    }
  }
}

decorate(LectureSummaryModel, {
  completeCount: observable,
  runningCount: observable,
  enrolledCount: observable,
  rejectedCount: observable,
});

export default LectureSummaryModel;
