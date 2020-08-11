import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import LectureModel from '../../../model/LectureModel';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';
import ArrangeApi from '../apiclient/ArrangeApi';


@autobind
class LRSLectureService {
  //
  static instance: LRSLectureService;

  private arrangeApi: ArrangeApi;

  constructor(arrangeApi: ArrangeApi) {
    this.arrangeApi = arrangeApi;
  }

  _title: string | null = '';

  @action
  setTitle(title: string | null) {
    if (title && title.length > 0) {
      this._title = title;
    }
    else {
      this._title = `mySUNI가 ${this._profileName}님을 위해 추천하는 과정입니다.`;
    }
  }

  @computed
  get Title() {
    if (this._title && this._title.length > 0) {
      return this._title;
    }
    else {
      return `mySUNI가 ${this._profileName}님을 위해 추천하는 과정입니다.`;
    }
  }

  _profileName: string | null = '';

  @action
  setProfileName(name: string) {
    if (name && name.length > 0) {
      this._profileName = name;
    }
    else {
      this._profileName = '학습자';
    }
  }

  @observable
  _lectures: LectureModel[] = [];

  @observable
  _totalCount: number = 0;

  @action
  clearLectures() {
    //
    this._totalCount = 0;
    return runInAction(() => this._lectures = []);
  }

  @action
  async findPagingLrsLectures(lectureFilterRdo: LectureFilterRdoModel, fromMain: boolean=false) {
    //
    // LRS 추천 학습정보 가져오기
    const response = await this.arrangeApi.findLrsLectures(lectureFilterRdo);
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    if (fromMain) {
      window.sessionStorage.setItem('LrsLearningList', JSON.stringify(lectureOffsetElementList));
    }

    if (!lectureOffsetElementList.empty) {
      lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
    }
    this._totalCount = lectureOffsetElementList.totalCount;
    this._title = lectureOffsetElementList.title;

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @action
  async setPagingLrsLectures(lectures: OffsetElementList<LectureModel>) {
    //
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(lectures);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
    //this._totalCount = lectureOffsetElementList.totalCount;

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @computed
  get lrsLectures() {
    //
    return (this._lectures as IObservableArray).peek();
  }

  @computed
  get totalCount() {
    return this._totalCount;
  }
}

LRSLectureService.instance = new LRSLectureService(ArrangeApi.instance);

export default LRSLectureService;
