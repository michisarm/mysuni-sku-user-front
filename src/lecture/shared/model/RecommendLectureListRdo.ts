
import { decorate, observable } from 'mobx';
import RecommendLectureRdo from './RecommendLectureRdo';


class RecommendLectureListRdo {
  //
  recommendLectureRdos: RecommendLectureRdo[] = [];

  totalCount: number = 0;


  constructor(recommendLectureListRdo?: RecommendLectureListRdo) {
    //
    if (recommendLectureListRdo) {
      Object.assign(this, { ...recommendLectureListRdo });
    }
  }
}

decorate(RecommendLectureListRdo, {
  recommendLectureRdos: observable,
});

export default RecommendLectureListRdo;
