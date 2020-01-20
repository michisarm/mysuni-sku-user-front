
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import LectureRdoModel from '../../model/LectureRdoModel';
import RecommendLectureListRdo from '../../model/RecommendLectureListRdo';
import CollegeLectureCountRdo from '../../model/CollegeLectureCountRdo';
import LectureModel from '../../model/LectureModel';
import LectureFilterRdoModel from '../../model/LectureFilterRdoModel';


class LectureFlowApi {
  //
  static instance: LectureFlowApi;

  baseUrl = '/api/lecture/lectures/flow';


  findAllRecommendLectures(lectureRdo: LectureRdoModel) {
    //
    const params = lectureRdo;
    return axiosApi.get<RecommendLectureListRdo>(this.baseUrl + '/recommend', { params })
      .then(response => response && new RecommendLectureListRdo(response.data) || new RecommendLectureListRdo());
  }

  findCollegeLectureCount() {
    //
    return axiosApi.get<CollegeLectureCountRdo[]>(this.baseUrl + '/college')
      .then(response => response && Array.isArray(response.data) && response.data.map((collegeLectureCount) =>
        new CollegeLectureCountRdo(collegeLectureCount)
      ) || []);
  }

  findRequiredLectures(lectureFilterRdo: LectureFilterRdoModel) {
    //
    return axiosApi.post<OffsetElementList<LectureModel>>(this.baseUrl + '/required', lectureFilterRdo)
      .then(response => response && response.data);
  }
}

LectureFlowApi.instance = new LectureFlowApi();

export default LectureFlowApi;
