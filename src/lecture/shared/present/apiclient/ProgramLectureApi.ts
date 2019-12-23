
import { axiosApi } from '@nara.platform/accent';
import ProgramLectureModel from '../../model/ProgramLectureModel';


class CourseLectureApi {
  //
  static instance: CourseLectureApi;

  baseUrl = '/api/lecture/programLectures';


  findProgramLecture(programLectureId: string) {
    //
    const params = {
      programLectureId,
    };

    return axiosApi.get<ProgramLectureModel>(this.baseUrl, { params })
      .then(response => response && response.data && new ProgramLectureModel(response.data) || null);
  }
}

CourseLectureApi.instance = new CourseLectureApi();

export default CourseLectureApi;
