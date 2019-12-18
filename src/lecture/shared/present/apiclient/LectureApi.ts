
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import LectureModel from '../../model/LectureModel';


class LectureApi {
  //
  static instance: LectureApi;

  baseUrl = '/api/lecture/lectures';


  findAllLectures(offset?: number, limit?: number) {
    //
    const params = {
      offset,
      limit,
    };

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl, { params })
      .then(response => response && response.data || []);
  }
}

LectureApi.instance = new LectureApi();

export default LectureApi;
