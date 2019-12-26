
import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel } from 'shared-model';


class ProgramLectureModel extends DramaEntityObservableModel {
  //
  programLectureId: string = '';
  coursePlanId: string = '';
  courseLectures: string[] = [];
  lectureCards: string[] = [];
  reviewFeedbackId: string = '';
  commentFeedbackId: string = '';
  time: number = 0;

  constructor(programLecture?: ProgramLectureModel) {
    super();
    if (programLecture) {
      Object.assign(this, programLecture);
    }
  }
}

decorate(ProgramLectureModel, {
  programLectureId: observable,
  coursePlanId: observable,
  courseLectures: observable,
  lectureCards: observable,
  reviewFeedbackId: observable,
  commentFeedbackId: observable,
  time: observable,
});

export default ProgramLectureModel;
