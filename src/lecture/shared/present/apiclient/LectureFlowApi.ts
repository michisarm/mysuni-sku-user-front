
import { axiosApi } from '@nara.platform/accent';
import LectureRdoModel from '../../model/LectureRdoModel';
import RecommendLectureRdo from '../../model/RecommendLectureRdo';
import CollegeLectureCountRdo from '../../model/CollegeLectureCountRdo';


class LectureFlowApi {
  //
  static instance: LectureFlowApi;

  baseUrl = '/api/lecture/lectures/flow';


  findAllRecommendLectures(lectureRdo: LectureRdoModel) {
    //
    const params = lectureRdo;
    return axiosApi.get<RecommendLectureRdo[]>(this.baseUrl + '/recommend', { params })
      .then(response => response && response.data);
  }

  findCollegeLectureCount() {
    //
    return axiosApi.get<CollegeLectureCountRdo[]>(this.baseUrl + '/college')
      .then(response => response && Array.isArray(response.data) && response.data.map((collegeLectureCount) =>
        new CollegeLectureCountRdo(collegeLectureCount)
      ) || []);
  }
}

LectureFlowApi.instance = new LectureFlowApi();

export default LectureFlowApi;
