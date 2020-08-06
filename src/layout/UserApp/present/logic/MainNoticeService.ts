
import { IObservableArray, observable, action, computed, runInAction } from 'mobx';
import MainNoticeApi from '../apiclient/MainNoticeApi';
import {OffsetElementList} from '../../../../shared/model';
import {PostModel} from '../../../../board/model';


class MainNoticeService {
  //
  static instance: MainNoticeService;

  private mainNoticeApi: MainNoticeApi;

  constructor(mainNoticeApi: MainNoticeApi) {
    this.mainNoticeApi = mainNoticeApi;
  }

  @observable
  _mainNotices: PostModel[] = [];

  @observable
  totalMainNoticeCount: number = 0;

  /**************************************************************/

  // @observable
  // _mainNoticeList: OffsetElementList<PostModel> = new OffsetElementList<PostModel>();

  @action
  clearMainNotices() {
    // this._mainNoticeList = new OffsetElementList<PostModel>();
    return this._mainNotices = [];
  }

  @action
  async getMainNotices() {
    //
    const response = await this.mainNoticeApi.getLeastNotices();
    const mainNoticeList = new OffsetElementList<PostModel>(response);

    mainNoticeList.results = mainNoticeList.results.map((notice) => new PostModel(notice));

    runInAction(() => this._mainNotices = this._mainNotices.concat(mainNoticeList.results));

    // 알림이 없으면 null을 리턴한다.
    return mainNoticeList.results.length > 0 ? mainNoticeList.results : null;
  }

  @computed
  get leastNotices() {
    //
    return (this._mainNotices as IObservableArray).peek();
  }

  /**************************************************************/
}

MainNoticeService.instance = new MainNoticeService(MainNoticeApi.instance);

export default MainNoticeService;
