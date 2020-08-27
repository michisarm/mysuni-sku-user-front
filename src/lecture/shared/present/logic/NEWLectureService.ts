import {action, computed, IObservableArray, observable, runInAction} from 'mobx';
import {autobind} from '@nara.platform/accent';
import {OffsetElementList} from 'shared/model';
import LectureModel from '../../../model/LectureModel';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';
import ArrangeApi from '../apiclient/ArrangeApi';
import InMyLectureApi from '../../../../myTraining/present/apiclient/InMyLectureApi';


@autobind
class NEWLectureService {
  //
  static instance: NEWLectureService;

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
      const today = new Date();
      const month = today.getMonth() + 1;
      const week = Math.ceil((today.getDate() + 6 - today.getDay()) / 7);

      this._title = `mySUNI ${month}월 ${week}주 신규 학습 과정`;
    }
  }

  @computed
  get Title() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const week = Math.ceil((today.getDate() + 6 - today.getDay()) / 7);

    if (this._title && this._title.length > 0) {
      return this._title;
    }
    else {
      return `mySUNI ${month}월 ${week}주 신규 학습 과정`;
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
  async findPagingNewLectures(lectureFilterRdo: LectureFilterRdoModel, fromMain: boolean=false) {
    //
    // 신규과정 학습정보 가져오기
    const response = await this.arrangeApi.findNewLectures(lectureFilterRdo);
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    if (fromMain) {
      window.sessionStorage.setItem('NewLearningList', JSON.stringify(lectureOffsetElementList));
    }

    if (!lectureOffsetElementList.empty) {
      lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
    }
    this._totalCount = lectureOffsetElementList.totalCount;
    if (lectureOffsetElementList.title !== this._title) {
      this._title = lectureOffsetElementList.title;
      const savedNewLearningList = window.navigator.onLine && window.sessionStorage.getItem('NewLearningList');
      if (savedNewLearningList && savedNewLearningList.length > 0) {
        const newMain: OffsetElementList<LectureModel> = JSON.parse(savedNewLearningList);
        newMain.title = this._title;
        window.sessionStorage.setItem('NewLearningList', JSON.stringify(newMain));
      }
    }

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @action
  async setPagingNewLectures(lectures: OffsetElementList<LectureModel>) {
    //
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(lectures);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
    this._totalCount = lectureOffsetElementList.totalCount;

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @computed
  get newLectures() {
    //
    return (this._lectures as IObservableArray).peek();
  }

  @computed
  get totalCount() {
    return this._totalCount;
  }

  @action
  removeLectureFromStorage(serviceId: string) {
    const savedNewLearningList = window.navigator.onLine && window.sessionStorage.getItem('NewLearningList');
    if (savedNewLearningList && savedNewLearningList.length > 0) {
      const NewMain: OffsetElementList<LectureModel> = JSON.parse(savedNewLearningList);
      if (NewMain && NewMain.results && NewMain.results.length > 0) {
        NewMain.results = NewMain.results.filter((item) => item.serviceId !== serviceId);
        NewMain.totalCount = NewMain.results.length;
        NewMain.empty = NewMain.totalCount < 1;
        window.sessionStorage.setItem('NewLearningList', JSON.stringify(NewMain));
      }
    }
  }
}

NEWLectureService.instance = new NEWLectureService(ArrangeApi.instance, InMyLectureApi.instance);

export default NEWLectureService;
