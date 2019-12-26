
import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel } from 'shared';


class CourseLectureModel extends DramaEntityObservableModel {
  //
  usid: string = '';
  coursePlanId: string = '';
  lectureCardUsids: string[] = [];
  reviewId: string = '';
  commentId: string = '';
  time: number = 0;


  constructor(courseLecture?: CourseLectureModel) {
    super();
    if (courseLecture) {
      Object.assign(this, courseLecture);
    }
  }
}

decorate(CourseLectureModel, {
  usid: observable,
  coursePlanId: observable,
  lectureCardUsids: observable,
  reviewId: observable,
  commentId: observable,
  time: observable,
});

export default CourseLectureModel;
