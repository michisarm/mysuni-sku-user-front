
import { axiosApi } from '@nara.platform/accent';
import RollBookModel from '../../../model/RollBookModel';


class RollBookApi {
  //
  static instance: RollBookApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_ROLL_BOOK_API === undefined || process.env.REACT_APP_ROLL_BOOK_API === '' ?
    '/api/lecture/rollbooks' : process.env.REACT_APP_ROLL_BOOK_API;


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
