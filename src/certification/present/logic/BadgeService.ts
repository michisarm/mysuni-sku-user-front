import {action, computed, IObservableArray, observable, runInAction} from 'mobx';
import {autobind} from '@nara.platform/accent';
import {OffsetElementList} from 'shared/model';
import BadgeApi from '../apiclient/BadgeApi';
import BadgeFilterRdoModel from "../../../badge/model/BadgeFilterRdoModel";
import BadgeModel from "../../../badge/model/BadgeModel";


@autobind
class BadgeService {
  //
  static instance: BadgeService;

  private badgeApi: BadgeApi;

  constructor(badgeApi: BadgeApi) {
    this.badgeApi = badgeApi;
  }

  @observable
  _badge: BadgeModel[] = [];

  @observable
  _totalCount: number = 0;

  @action
  clearLectures() {
    //
    return runInAction(() => this._badge = []);
  }

  @action
  async findPagingBadges(badgeFilterRdo: BadgeFilterRdoModel, fromMain: boolean=false) {
    //
    // 신규과정 학습정보 가져오기
    const response = await this.badgeApi.findBadges(badgeFilterRdo);
    const badgeOffsetElementList = new OffsetElementList<BadgeModel>(response);

    // use session storage : modified by JSM
    if (fromMain) {
      window.sessionStorage.setItem('NewLearningList', JSON.stringify(badgeOffsetElementList));
    }

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new BadgeModel(badge));
    this._totalCount = badgeOffsetElementList.totalCount;

    runInAction(() => this._badge = this._badge.concat(badgeOffsetElementList.results));
    return badgeOffsetElementList;
  }

  // use session storage : modified by JSM
  @action
  async setPagingBadges(badge: OffsetElementList<BadgeModel>) {
    //
    const badgeOffsetElementList = new OffsetElementList<BadgeModel>(badge);

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new BadgeModel(badge));
    this._totalCount = badgeOffsetElementList.totalCount;

    runInAction(() => this._badge = this._badge.concat(badgeOffsetElementList.results));
    return badgeOffsetElementList;
  }

  @computed
  get newLectures() {
    //
    return (this._badge as IObservableArray).peek();
  }

  @computed
  get totalCount() {
    return this._totalCount;
  }
}

BadgeService.instance = new BadgeService(BadgeApi.instance);

export default BadgeService;
