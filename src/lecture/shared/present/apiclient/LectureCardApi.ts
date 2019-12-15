
import { axiosApi } from '@nara.platform/accent';
import LectureCardModel from '../../model/LectureCardModel';


class LectureCardApi {
  //
  static instance: LectureCardApi;

  baseUrl = '/api/lectureCards';

  findAllLectureCards(offset: number, limit: number) {
    //
    const params = {
      offset,
      limit,
    };

    return axiosApi.get<LectureCardModel[]>(this.baseUrl, { params })
      .then(response => response && response.data || []);
  }
}

LectureCardApi.instance = new LectureCardApi();

export default LectureCardApi;
