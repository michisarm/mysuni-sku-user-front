
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import LectureModel from '../../model/LectureModel';
import LectureRdoModel from '../../model/LectureRdoModel';


class LectureApi {
  //
  static instance: LectureApi;

  baseUrl = '/api/lecture/lectures';


  findAllLectures(lectureRdo: LectureRdoModel) {
    //
    // Todo: API 정상작동 하면 수정
    const params = {};

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl, { params })
      .then(response => response && response.data || []);
  }
}

LectureApi.instance = new LectureApi();

export default LectureApi;
