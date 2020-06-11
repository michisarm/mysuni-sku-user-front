
import { axiosApi } from '@nara.platform/accent';
import ProgramLectureModel from '../../../model/ProgramLectureModel';


class CourseLectureApi {
  //
  static instance: CourseLectureApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_PROGRAM_LECTURE_API === undefined || process.env.REACT_APP_PROGRAM_LECTURE_API === '' ?
    '/api/lecture/programLectures' : process.env.REACT_APP_PROGRAM_LECTURE_API;


  findProgramLecture(programLectureId: string) {
    //
    return axiosApi.get<ProgramLectureModel>(this.baseUrl + `/${programLectureId}`)
      .then(response => response && response.data && new ProgramLectureModel(response.data) || null);
  }
}

CourseLectureApi.instance = new CourseLectureApi();

export default CourseLectureApi;
