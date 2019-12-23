
import { axiosApi } from '@nara.platform/accent';
import CourseLectureModel from '../../model/CourseLectureModel';


class CourseLectureApi {
  //
  static instance: CourseLectureApi;

  baseUrl = '/api/lecture/courseLectures';


  findCourseLecture(courseLectureId: string) {
    //
    const params = {
      courseLectureId,
    };

    return axiosApi.get<CourseLectureModel>(this.baseUrl, { params })
      .then(response => response && response.data && new CourseLectureModel(response.data) || null);
  }
}

CourseLectureApi.instance = new CourseLectureApi();

export default CourseLectureApi;
