import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import LectureModel from '../../../model/LectureModel';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';
import ArrangeApi from '../apiclient/ArrangeApi';
import InMyLectureApi from '../../../../myTraining/present/apiclient/InMyLectureApi';


@autobind
class POPLectureService {
  //
  static instance: POPLectureService;

  private arrangeApi: ArrangeApi;
  private inMyLectureApi: InMyLectureApi;

  constructor(arrangeApi: ArrangeApi, inMyLectureApi: InMyLectureApi) {
    this.arrangeApi = arrangeApi;
    this.inMyLectureApi = inMyLectureApi;
  }

  _title: string | null = '';

  @action
  setTitle(title: string | null) {
    if (title && title.length > 0) {
      this._title = title;
    }
    else {
      this._title = '학습자들의 평가가 좋은 인기 과정입니다.';
    }
  }

  @computed
  get Title() {
    if (this._title && this._title.length > 0) {
      return this._title;
    }
    else {
      return '학습자들의 평가가 좋은 인기 과정입니다.';
    }
  }

  @observable
  _lectures: LectureModel[] = [];

  @observable
  _totalCount: number = 0;

  @action
  clearLectures() {
    //
    return runInAction(() => this._lectures = []);
  }

  @action
  async findPagingPopLectures(lectureFilterRdo: LectureFilterRdoModel, fromMain: boolean=false) {
    //
    // 인기과정 학습정보 가져오기
    const response = await this.arrangeApi.findPopLectures(lectureFilterRdo);
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    if (fromMain) {
      window.sessionStorage.setItem('PopLearningList', JSON.stringify(lectureOffsetElementList));
    }

    if (!lectureOffsetElementList.empty) {
      lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
    }
    this._totalCount = lectureOffsetElementList.totalCount;
    if (lectureOffsetElementList.title !== this._title) {
      this._title = lectureOffsetElementList.title;
      const savedPopLearningList = window.navigator.onLine && window.sessionStorage.getItem('PopLearningList');
      if (savedPopLearningList && savedPopLearningList.length > 0) {
        const popMain: OffsetElementList<LectureModel> = JSON.parse(savedPopLearningList);
        popMain.title = this._title;
        window.sessionStorage.setItem('PopLearningList', JSON.stringify(popMain));
      }
    }

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @action
  async setPagingPopLectures(lectures: OffsetElementList<LectureModel>) {
    //
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(lectures);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
    this._totalCount = lectureOffsetElementList.totalCount;

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @computed
  get popLectures() {
    //
    return (this._lectures as IObservableArray).peek();
  }

  @computed
  get totalCount() {
    return this._totalCount;
  }

  @action
  removeLectureFromStorage(serviceId: string) {
    const savedPopularLearningList = window.navigator.onLine && window.sessionStorage.getItem('PopLearningList');
    if (savedPopularLearningList && savedPopularLearningList.length > 0) {
      const PopularMain: OffsetElementList<LectureModel> = JSON.parse(savedPopularLearningList);
      if (PopularMain && PopularMain.results && PopularMain.results.length > 0) {
        PopularMain.results = PopularMain.results.filter((item) => item.serviceId !== serviceId);
        PopularMain.totalCount = PopularMain.results.length;
        PopularMain.empty = PopularMain.totalCount < 1;
        window.sessionStorage.setItem('PopLearningList', JSON.stringify(PopularMain));
      }
    }
  }
}

POPLectureService.instance = new POPLectureService(ArrangeApi.instance, InMyLectureApi.instance);

export default POPLectureService;
