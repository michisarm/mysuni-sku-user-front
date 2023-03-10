import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import CourseLectureModel from '../../../model/CourseLectureModel';
import CourseLectureApi from '../apiclient/CourseLectureApi';
import LectureViewModel from '../../../model/LectureViewModel';
import StudentModel from '../../../model/StudentModel';


@autobind
class CourseLectureService {
  //
  static instance: CourseLectureService;

  private courseLectureApi: CourseLectureApi;

  @observable
  courseLecture: CourseLectureModel = new CourseLectureModel();

  @action
  setCourseLecture(lecture: CourseLectureModel) {
    this.courseLecture = lecture;
  }

  // 선수코스
  @observable
  preLectureView: LectureViewModel = new LectureViewModel();

  // 선수코스
  @observable
  preLectureViews: LectureViewModel[] = [];

  // 선수코스 학습정보
  @observable
  preLectureStudents: StudentModel[] = [];

  @computed
  get getPreLectureViews() {
    //
    return (this.preLectureViews as IObservableArray).peek();
  }

  constructor(courseLectureApi: CourseLectureApi) {
    this.courseLectureApi = courseLectureApi;
  }

  // CourseLecture -----------------------------------------------------------------------------------------------------

  @action
  async findCourseLecture(courseLectureId: string) {
    //
    const courseLecture = await this.courseLectureApi.findCourseLecture(
      courseLectureId
    );

    runInAction(() => (this.courseLecture = courseLecture));
    return courseLecture;
  }

  @action
  async findCourseLectureByCoursePlanId(coursePlanId: string) {
    const courseLecture: CourseLectureModel = await this.courseLectureApi.findCourseLectureByCoursePlanId(
      coursePlanId
    );
    runInAction(() => (this.courseLecture = courseLecture));
    return courseLecture;
  }

  @action
  setPreLectureViews(
    preLectureViewSet: LectureViewModel[]
  ) {
    // runInAction(() => (this.preLectureViews = preLectureViewSet));
    this.preLectureViews = preLectureViewSet;
    return preLectureViewSet;
  }

  @action
  setPreLectureStudents(
    preLectureStudents: StudentModel[]
  ) {
    return runInAction(() =>
      (this.preLectureStudents = preLectureStudents));

  }

  @computed
  get getPreLectureStudents() {
    //
    return (this.preLectureStudents as IObservableArray).peek();
  }
}

CourseLectureService.instance = new CourseLectureService(
  CourseLectureApi.instance
);

export default CourseLectureService;
