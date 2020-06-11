
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import InMyLectureRdoModel from '../../model/InMyLectureRdoModel';
import InMyLectureModel from '../../model/InMyLectureModel';
import InMyLectureCdoModel from '../../model/InMyLectureCdoModel';


class InMyLectureApi {
  //
  static instance: InMyLectureApi;

  // devUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOPMENT_URL : '';
  // baseUrl = this.devUrl + '/api/mytraining/mytraining/inmylecture';

  serverUrl = '/api/mytraining/mytraining/inmylecture';
  devUrl = process.env.REACT_APP_IN_MY_LECTURE_API  === undefined || process.env.REACT_APP_IN_MY_LECTURE_API  === '' ?
    this.serverUrl : process.env.REACT_APP_IN_MY_LECTURE_API ;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ?
    this.serverUrl : this.devUrl;


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
    return axiosApi.post<OffsetElementList<InMyLectureModel>>(this.baseUrl + '/myLectures/filterWithJoinedValue', inMyLectureRdo)
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
