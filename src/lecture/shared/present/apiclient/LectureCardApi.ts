
import { axiosApi } from '@nara.platform/accent';
import LectureCardModel from '../../../model/LectureCardModel';

class LectureCardApi {
  //
  static instance: LectureCardApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_LECTURE_CARD_API === undefined || process.env.REACT_APP_LECTURE_CARD_API === '' ?
    '/api/lecture/lectureCards' : process.env.REACT_APP_LECTURE_CARD_API;

  findAllLectureCards(offset: number, limit: number, college?: string, channel?: string) {
    //
    const params = {
      offset,
      limit,
      college,
      channel,
    };

    return axiosApi.get<LectureCardModel[]>(this.baseUrl, { params })
      .then(response => response && response.data || []);
  }

  findLectureCard(lectureCardId: string) {
    //
    return axiosApi.get<LectureCardModel>(this.baseUrl + `/${lectureCardId}`)
      .then(response => response && response.data || undefined);
  }
}

LectureCardApi.instance = new LectureCardApi();

export default LectureCardApi;
