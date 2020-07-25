
import { axiosApi } from '@nara.platform/accent';
import CourseLectureModel from '../../../model/CourseLectureModel';


class CourseLectureApi {
  //
  static instance: CourseLectureApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_COURSE_LECTURE_API === undefined || process.env.REACT_APP_COURSE_LECTURE_API === '' ?
    '/api/lecture/courseLectures' : process.env.REACT_APP_COURSE_LECTURE_API;
  // baseUrl = 'http://localhost:8555/courseLectures';


  findCourseLecture(courseLectureId: string) {
    //
    return axiosApi.get<CourseLectureModel>(this.baseUrl + `/${courseLectureId}`)
      .then(response => response && response.data && new CourseLectureModel(response.data) || null);
  }

  findCourseLectureByCoursePlanId(coursePlanId: string) {
    return axiosApi.get<CourseLectureModel>(this.baseUrl + `/find/${coursePlanId}`)
      .then(response => response && response.data && new CourseLectureModel(response.data) || null);
  }
}

CourseLectureApi.instance = new CourseLectureApi();

export default CourseLectureApi;
