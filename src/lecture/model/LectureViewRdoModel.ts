
import { decorate, observable } from 'mobx';


class LectureViewRdoModel {
  //
  coursePlanId: string = '';
  lectureCardIds: string[] = [];
  courseLectureIds: string[] = [];

  constructor(lectureViewRdoModel?: LectureViewRdoModel) {
    //
    if (lectureViewRdoModel) {
      Object.assign(this, lectureViewRdoModel);
    }
  }
}

decorate(LectureViewRdoModel, {
  coursePlanId: observable,
  lectureCardIds: observable,
  courseLectureIds: observable,
});

export default LectureViewRdoModel;
