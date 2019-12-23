
import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel } from 'shared';


class CourseLectureModel extends DramaEntityObservableModel {
  //
  courseLectureId: string = '';
  coursePlanId: string = '';
  lectureCards: string[] = [];
  reviewFeedbackId: string = '';
  commentFeedbackId: string = '';
  time: number = 0;


  constructor(courseLecture?: CourseLectureModel) {
    super();
    if (courseLecture) {
      Object.assign(this, courseLecture);
    }
  }
}

decorate(CourseLectureModel, {
  courseLectureId: observable,
  coursePlanId: observable,
  lectureCards: observable,
  reviewFeedbackId: observable,
  commentFeedbackId: observable,
  time: observable,
});

export default CourseLectureModel;
