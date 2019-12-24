
import { observable, action, runInAction } from 'mobx';
import ProgramLectureModel from '../../model/ProgramLectureModel';
import CourseLectureApi from '../apiclient/ProgramLectureApi';


class ProgramLectureService {
  //
  static instance: ProgramLectureService;

  private programLectureApi: CourseLectureApi;

  @observable
  programLecture: ProgramLectureModel = new ProgramLectureModel();


  constructor(programLectureApi: CourseLectureApi) {
    this.programLectureApi = programLectureApi;
  }


  // ProgramLecture ----------------------------------------------------------------------------------------------------

  @action
  async findProgramLecture(programLectureId: string) {
    //
    const programLecture = await this.programLectureApi.findProgramLecture(programLectureId);

    runInAction(() => this.programLecture = programLecture);
    return programLecture;
  }
}

ProgramLectureService.instance = new ProgramLectureService(CourseLectureApi.instance);

export default ProgramLectureService;
