
import { decorate, observable } from 'mobx';
import { IdName, OffsetElementList } from 'shared';
import LectureModel from './LectureModel';


class RecommendLectureRdo {
  //
  channel: IdName = new IdName();
  lectures: OffsetElementList<LectureModel> = new OffsetElementList<LectureModel>();

  constructor(lecture?: RecommendLectureRdo) {
    //
    if (lecture) {
      Object.assign(this, { ...lecture });

      this.lectures = lecture.lectures
        && new OffsetElementList({
          results: lecture.lectures.results.map(lecture => new LectureModel(lecture)),
          totalCount: lecture.lectures.totalCount,
          empty: false,
        }) || this.lectures;
    }
  }
}

decorate(RecommendLectureRdo, {
  channel: observable,
  lectures: observable,
});

export default RecommendLectureRdo;
