
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import LectureRdoModel from '../../../model/LectureRdoModel';
import RecommendLectureListRdo from '../../../model/RecommendLectureListRdo';
import CollegeLectureCountRdo from '../../../model/CollegeLectureCountRdo';
import LectureModel from '../../../model/LectureModel';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';


class LectureFlowApi {
  //
  static instance: LectureFlowApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_LECTURE_FLOW_API === undefined || process.env.REACT_APP_LECTURE_FLOW_API === '' ?
    '/api/lecture/lectures/flow' : process.env.REACT_APP_LECTURE_FLOW_API;


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

  findRqdLectures(lectureFilterRdo: LectureFilterRdoModel) {
    //
    return axiosApi.post<OffsetElementList<LectureModel>>(this.baseUrl + '/required', lectureFilterRdo)
      .then(response => response && response.data);
  }

  /**
   * 권장과정 갯수 조회 API
   */
  countRequiredLectures() {
    return axiosApi.post<number>(this.baseUrl + '/requiredCount')
      .then((response: any) => response.data && response.data.searchOnCount && response.data.searchOnCount.valueOf()); //searchOnCount
  }
}

LectureFlowApi.instance = new LectureFlowApi();

export default LectureFlowApi;
