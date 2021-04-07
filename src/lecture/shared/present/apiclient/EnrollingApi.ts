
import { axiosApi } from '@nara.platform/accent';
import axios from 'axios';
import { OffsetElementList } from 'shared/model';
import LectureModel from '../../../model/LectureModel';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';


class EnrollingApi {
  //
  static instance: EnrollingApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_ARRANGE_API === undefined || process.env.REACT_APP_ARRANGE_API === '' ?
    '/api/lecture/cards' : process.env.REACT_APP_ENROLLING_API;




  // 수강 신청 임박한 학습과정 조회
  findEnrollingLectures(lectureFilterRdo: LectureFilterRdoModel) {
    //
    const params = {
      offset: lectureFilterRdo.offset,
      limit: lectureFilterRdo.limit,
      excludeClosed: lectureFilterRdo.excludeClosed,
    };

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl + '/enrollingCards', {params})
      .then(response => response && response.data || null);
  }
}

EnrollingApi.instance = new EnrollingApi();

export default EnrollingApi;