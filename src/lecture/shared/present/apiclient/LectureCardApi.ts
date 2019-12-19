
import { axiosApi } from '@nara.platform/accent';
import LectureCardModel from '../../model/LectureCardModel';
import { IdName } from '../../../../shared';


class LectureCardApi {
  //
  static instance: LectureCardApi;

  baseUrl = '/api/lecture/lectureCards';

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
    const mockLectureCard = new LectureCardModel({
      id: lectureCardId,
      entityVersion: 0,
      patronKey: {} as any,
      lectureCardId,
      learningCard: new IdName(),
      roleBooks: [],
    });

    return Promise.resolve(mockLectureCard);
    // return axiosApi.get<LectureCardModel>(this.baseUrl + `/${lectureCardId}`)
    //   .then(response => response && response.data || undefined);
  }
}

LectureCardApi.instance = new LectureCardApi();

export default LectureCardApi;
