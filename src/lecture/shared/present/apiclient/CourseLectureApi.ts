
import { axiosApi } from '@nara.platform/accent';
import CourseLectureModel from '../../../model/CourseLectureModel';


class CourseLectureApi {
  //
  static instance: CourseLectureApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_STUDENT_API === undefined || process.env.REACT_APP_STUDENT_API === '' ?
    '/api/lecture/students' : process.env.REACT_APP_STUDENT_API;


  findCourseLecture(courseLectureId: string) {
    //
    return axiosApi.get<CourseLectureModel>(this.baseUrl + `/${courseLectureId}`)
      .then(response => response && response.data && new CourseLectureModel(response.data) || null);
  }
}

CourseLectureApi.instance = new CourseLectureApi();

export default CourseLectureApi;
