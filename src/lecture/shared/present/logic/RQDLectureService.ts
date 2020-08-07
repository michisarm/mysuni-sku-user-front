import {action, computed, IObservableArray, observable, runInAction} from 'mobx';
import {autobind} from '@nara.platform/accent';
import {OffsetElementList} from 'shared/model';
import LectureModel from '../../../model/LectureModel';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';
import ArrangeApi from '../apiclient/ArrangeApi';


@autobind
class RQDLectureService {
  //
  static instance: RQDLectureService;

  private arrangeApi: ArrangeApi;

  constructor(arrangeApi: ArrangeApi) {
    this.arrangeApi = arrangeApi;
  }

  _title: string | null = '';
  @computed
  get Title() {
    if (this._title && this._title.length > 0) {
      return this._title;
    }
    else {
      return 'SK 구성원이라면 꼭 들어야 하는 필수 권장 학습 과정!';
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
    this._title = lectureOffsetElementList.title;

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
}

RQDLectureService.instance = new RQDLectureService(ArrangeApi.instance);

export default RQDLectureService;
