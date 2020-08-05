
import { axiosApi } from '@nara.platform/accent';
import axios from 'axios';
import { OffsetElementList } from 'shared/model';
import LectureRdoModel from '../../../model/LectureRdoModel';
import RecommendLectureListRdo from '../../../model/RecommendLectureListRdo';
import CollegeLectureCountRdo from '../../../model/CollegeLectureCountRdo';
import LectureModel from '../../../model/LectureModel';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';
import BannerModel from '../../../../shared/model/BannerModel';


class ArrangeApi {
  //
  static instance: ArrangeApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_ARRANGE_API === undefined || process.env.REACT_APP_ARRANGE_API === '' ?
    '/api/arrange/user/flow' : process.env.REACT_APP_ARRANGE_API;

  // baseUrl = '/api/lecture/lectures/flow'; // + '/arrange/NEW|POP|RQD'

  /********************************************************************************************************/

  reqLectureUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_LECTURE_FLOW_API === undefined || process.env.REACT_APP_LECTURE_FLOW_API === '' ?
    '/api/lecture/lectures/flow' : process.env.REACT_APP_LECTURE_FLOW_API;

  // 권장과정 조회
  findRequiredLectures(lectureFilterRdo: LectureFilterRdoModel) {
    //
    return axiosApi.post<OffsetElementList<LectureModel>>(this.reqLectureUrl + '/required', lectureFilterRdo)
      .then(response => response && response.data);
  }

  // 권장과정 갯수 조회 API
  countRequiredLectures() {
    return axiosApi.post<number>(this.reqLectureUrl + '/requiredCount')
      .then((response: any) => response.data && response.data.searchOnCount && response.data.searchOnCount.valueOf()); //searchOnCount
  }

  /********************************************************************************************************/

  // 신규과정 조회
  findNewLectures(lectureFilterRdo: LectureFilterRdoModel) {
    //
    const params = {
      offset: lectureFilterRdo.offset,
      limit: lectureFilterRdo.limit,
      orderBy: lectureFilterRdo.orderBy,
    };

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl + '/arrange/NEW', {params})
      .then(response => response && response.data);
  }

  // 인기과정 조회
  findPopularLectures(lectureFilterRdo: LectureFilterRdoModel) {
    //
    const params = {
      offset: lectureFilterRdo.offset,
      limit: lectureFilterRdo.limit,
      orderBy: lectureFilterRdo.orderBy,
    };

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl + '/arrange/POP', {params})
      .then(response => response && response.data);
  }

  // LRS 추천과정 조회
  findRecommendLectures(lectureFilterRdo: LectureFilterRdoModel) {
    //
    const params = {
      offset: lectureFilterRdo.offset,
      limit: lectureFilterRdo.limit,
      orderBy: lectureFilterRdo.orderBy,
    };

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl + '/arrange/RQD', {params})
      .then(response => response && response.data);
  }
}

ArrangeApi.instance = new ArrangeApi();

export default ArrangeApi;
