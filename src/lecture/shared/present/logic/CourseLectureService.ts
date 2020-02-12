
import { observable, action, runInAction } from 'mobx';
import CourseLectureModel from '../../../model/CourseLectureModel';
import CourseLectureApi from '../apiclient/CourseLectureApi';


class CourseLectureService {
  //
  static instance: CourseLectureService;

  private courseLectureApi: CourseLectureApi;

  @observable
  courseLecture: CourseLectureModel = new CourseLectureModel();


  constructor(courseLectureApi: CourseLectureApi) {
    this.courseLectureApi = courseLectureApi;
  }


  // CourseLecture -----------------------------------------------------------------------------------------------------

  @action
  async findCourseLecture(courseLectureId: string) {
    //
    const courseLecture = await this.courseLectureApi.findCourseLecture(courseLectureId);

    runInAction(() => this.courseLecture = courseLecture);
    return courseLecture;
  }
}

CourseLectureService.instance = new CourseLectureService(CourseLectureApi.instance);

export default CourseLectureService;
