
import { decorate, observable } from 'mobx';
import RecommendLectureRdo from './RecommendLectureRdo';


class RecommendLectureListRdo {
  //
  // 서버에서 recommand 오타 나있음
  recommandLectureRdos: RecommendLectureRdo[] = [];
  recommendLectureRdos: RecommendLectureRdo[] = [];

  totalCount: number = 0;


  constructor(recommendLectureListRdo?: RecommendLectureListRdo) {
    //
    if (recommendLectureListRdo) {
      Object.assign(this, { ...recommendLectureListRdo });

      if (recommendLectureListRdo.recommandLectureRdos) {
        this.recommendLectureRdos = recommendLectureListRdo.recommandLectureRdos.map((rdo) => new RecommendLectureRdo(rdo));
      }
    }
  }
}

decorate(RecommendLectureListRdo, {
  recommandLectureRdos: observable,
  recommendLectureRdos: observable,
  totalCount: observable,
});

export default RecommendLectureListRdo;
