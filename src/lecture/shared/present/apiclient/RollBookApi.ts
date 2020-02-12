
import { axiosApi } from '@nara.platform/accent';
import RollBookModel from '../../../model/RollBookModel';


class RollBookApi {
  //
  static instance: RollBookApi;

  baseUrl = '/api/lecture/rollbooks';


  findRollBookByLectureCardIdAndRound(lectureCardId: string, round: number) {
    //
    return axiosApi.get<RollBookModel>(this.baseUrl + `/byLectureCardIdAndRound`, { params: { lectureCardId, round }})
      .then(response => response && response.data);
  }

  findAllLecturesByLectureCardId(lectureCardId: string) {
    //
    return axiosApi.get<RollBookModel[]>(this.baseUrl + '/byLectureCardId', { params: { lectureCardId }})
      .then(response => response && response.data);
  }

}

RollBookApi.instance = new RollBookApi();

export default RollBookApi;
