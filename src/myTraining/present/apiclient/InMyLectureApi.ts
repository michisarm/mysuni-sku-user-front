
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import InMyLectureRdoModel from '../../model/InMyLectureRdoModel';
import InMyLectureModel from '../../model/InMyLectureModel';
import InMyLectureCdoModel from '../../model/InMyLectureCdoModel';


class InMyLectureApi {
  //
  static instance: InMyLectureApi;

  baseUrl = '/api/mytraining/mytraining/inmylecture';


  addInMyLecture(inMyLectureCdo: InMyLectureCdoModel) {
    return axiosApi.post<string>(this.baseUrl, inMyLectureCdo)
      .then(response => response && response.data);
  }

  removeInMyLecture(inMyLectureId: string) {
    return axiosApi.delete(this.baseUrl + `/${inMyLectureId}`);
  }

  findInMyLecture(inMyLectureRdo: InMyLectureRdoModel) {
    //
    const params = inMyLectureRdo;

    return axiosApi.get<InMyLectureModel>(this.baseUrl + '/myLecture', { params })
      .then(response => response && response.data);
  }

  findInMyLectures(inMyLectureRdo: InMyLectureRdoModel) {
    //
    return axiosApi.post<OffsetElementList<InMyLectureModel>>(this.baseUrl + '/myLectures/filter', inMyLectureRdo)
      .then(response => response && response.data);
  }

  findAllInMyLectures() {
    return axiosApi.get<InMyLectureModel[]>(this.baseUrl + '/myLectures/all')
      .then(response => response && Array.isArray(response.data) && response.data || []);
  }

  /**
   * 관심목록 갯수 조회 API
   */
  countInMyLectures() {
    return axiosApi.post<number>(this.baseUrl + '/myLecturesCount')
      .then((response : any) => response.data && response.data.myStateCount && response.data.myStateCount.valueOf()); //myStateCount
  }

}

InMyLectureApi.instance = new InMyLectureApi();

export default InMyLectureApi;
