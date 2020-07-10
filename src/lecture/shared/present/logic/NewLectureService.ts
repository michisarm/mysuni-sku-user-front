import {action, computed, IObservableArray, observable, runInAction} from 'mobx';
import {autobind} from '@nara.platform/accent';
import {OffsetElementList} from 'shared/model';
import LectureFlowApi from '../apiclient/LectureFlowApi';
import LectureModel from '../../../model/LectureModel';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';


@autobind
class NewLectureService {
  //
  static instance: NewLectureService;

  private lectureFlowApi: LectureFlowApi;

  constructor(lectureFlowApi: LectureFlowApi) {
    this.lectureFlowApi = lectureFlowApi;
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
    const response = await this.lectureFlowApi.findNewLectures(lectureFilterRdo);
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    // use session storage : modified by JSM
    if (fromMain) {
      window.sessionStorage.setItem('NewLearningList', JSON.stringify(lectureOffsetElementList));
    }

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
    this._totalCount = lectureOffsetElementList.totalCount;

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  // use session storage : modified by JSM
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
}

NewLectureService.instance = new NewLectureService(LectureFlowApi.instance);

export default NewLectureService;
