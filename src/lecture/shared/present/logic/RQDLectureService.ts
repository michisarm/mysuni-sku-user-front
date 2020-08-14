import {action, computed, IObservableArray, observable, runInAction} from 'mobx';
import {autobind} from '@nara.platform/accent';
import {OffsetElementList} from 'shared/model';
import LectureModel from '../../../model/LectureModel';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';
import ArrangeApi from '../apiclient/ArrangeApi';
import InMyLectureApi from '../../../../myTraining/present/apiclient/InMyLectureApi';
import InMyLectureCdoModel from '../../../../myTraining/model/InMyLectureCdoModel';


@autobind
class RQDLectureService {
  //
  static instance: RQDLectureService;

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
      this._title = 'SK 구성원이라면 꼭 들어야 하는 필수 권장 학습 과정!';
    }
  }

  @computed
  get Title() {
    if (!this._title || this._title.length < 1) {
      this._title = 'SK 구성원이라면 꼭 들어야 하는 필수 권장 학습 과정!';
    }
    return this._title;
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
  async findPagingRqdLectures(lectureFilterRdo: LectureFilterRdoModel, fromMain: boolean=false) {
    //
    // 신규과정 학습정보 가져오기
    const response = await this.arrangeApi.findRqdLectures(lectureFilterRdo);
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    if (fromMain) {
      window.sessionStorage.setItem('RqdLearningList', JSON.stringify(lectureOffsetElementList));
    }

    if (!lectureOffsetElementList.empty) {
      lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
    }
    this._totalCount = lectureOffsetElementList.totalCount;
    if (lectureOffsetElementList.title !== this._title) {
      this._title = lectureOffsetElementList.title;
      const savedRqdLearningList = window.navigator.onLine && window.sessionStorage.getItem('RqdLearningList');
      if (savedRqdLearningList && savedRqdLearningList.length > 0) {
        const rqdMain: OffsetElementList<LectureModel> = JSON.parse(savedRqdLearningList);
        rqdMain.title = this._title;
        window.sessionStorage.setItem('RqdLearningList', JSON.stringify(rqdMain));
      }
    }

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @action
  async setPagingRqdLectures(lectures: OffsetElementList<LectureModel>) {
    //
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(lectures);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
    this._totalCount = lectureOffsetElementList.totalCount;

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @computed
  get rqdLectures() {
    //
    return (this._lectures as IObservableArray).peek();
  }

  @computed
  get totalCount() {
    return this._totalCount;
  }

  @action
  removeLectureFromStorage(serviceId: string) {
    const savedRequiredLearningList = window.navigator.onLine && window.sessionStorage.getItem('RqdLearningList');
    if (savedRequiredLearningList && savedRequiredLearningList.length > 0) {
      const requiredMain: OffsetElementList<LectureModel> = JSON.parse(savedRequiredLearningList);
      if (requiredMain && requiredMain.results && requiredMain.results.length > 0) {
        requiredMain.results = requiredMain.results.filter((item) => item.serviceId !== serviceId);
        requiredMain.totalCount = requiredMain.results.length;
        requiredMain.empty = requiredMain.totalCount < 1;
        window.sessionStorage.setItem('RqdLearningList', JSON.stringify(requiredMain));
      }
    }
  }
}

RQDLectureService.instance = new RQDLectureService(ArrangeApi.instance, InMyLectureApi.instance);

export default RQDLectureService;
