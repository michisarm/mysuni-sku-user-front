import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import CourseLectureModel from '../../../model/CourseLectureModel';
import CourseLectureApi from '../apiclient/CourseLectureApi';
import LectureViewModel from '../../../model/LectureViewModel';


@autobind
class CourseLectureService {
  //
  static instance: CourseLectureService;

  private courseLectureApi: CourseLectureApi;

  @observable
  courseLecture: CourseLectureModel = new CourseLectureModel();

  // 선수코스
  @observable
  preLectureView: LectureViewModel = new LectureViewModel();

  // 선수코스
  @observable
  preLectureViews: LectureViewModel[] = [];

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
    // console.log('courseLecture : ', courseLecture);
    runInAction(() => (this.courseLecture = courseLecture));
    return courseLecture;
  }

  @action
  setPreLectureViews(
    preLectureViewSet: LectureViewModel[]
  ) {
    // console.log('preLectureViewSet : ', preLectureViewSet);
    // runInAction(() => (this.preLectureViews = preLectureViewSet));
    this.preLectureViews = preLectureViewSet;
    // console.log('preLectureViews : ', this);
    return preLectureViewSet;

  }
}

CourseLectureService.instance = new CourseLectureService(
  CourseLectureApi.instance
);

export default CourseLectureService;
