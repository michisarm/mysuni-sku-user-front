import {action, computed, IObservableArray, observable, runInAction} from 'mobx';
import {autobind} from '@nara.platform/accent';
import {OffsetElementList} from 'shared/model';
import BadgeApi from '../apiclient/BadgeApi';
import BadgeFilterRdoModel from '../../ui/model/BadgeFilterRdoModel';
import BadgeModel from '../../ui/model/BadgeModel';
import CategoryModel from '../../ui/model/CategoryModel';


@autobind
class BadgeService {
  //
  static instance: BadgeService;

  private badgeApi: BadgeApi;

  constructor(badgeApi: BadgeApi) {
    this.badgeApi = badgeApi;
  }

  @observable
  _category: CategoryModel[] = [];

  @observable
  _categoryCount: number = 0;

  @observable
  _badge: BadgeModel[] = [];

  @observable
  _badgeCount: number = 0;

  @observable
  _challengingCount: number = 0;

  @observable
  _earnedCount: number = 0;

  @action
  clearCategories() {
    //
    return runInAction(() => this._category = []);
  }

  @action
  async findAllCategories() {
    //
    // 모든 뱃지 정보 가져오기
    const response = await this.badgeApi.findAllCategories();
    const categoryOffsetElementList = new OffsetElementList<CategoryModel>(response);

    categoryOffsetElementList.results = categoryOffsetElementList.results.map((category) => new CategoryModel(category));
    runInAction(() => {
      this._categoryCount = categoryOffsetElementList.totalCount;
      this._category = this._category.concat(categoryOffsetElementList.results);
    });

    return categoryOffsetElementList;
  }

  @computed
  get categories() {
    return (this._category as IObservableArray).peek();
  }

  @computed
  get categoryCount() {
    return this._categoryCount ? this._categoryCount : 0;
  }

  @action
  clearBadges() {
    //
    return runInAction(() => this._badge = []);
  }

  @action
  async findPagingAllBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    // 모든 뱃지 정보 가져오기
    const response = await this.badgeApi.findPagingAllBadges(badgeFilterRdo);
    const badgeOffsetElementList = new OffsetElementList<BadgeModel>(response);

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new BadgeModel(badge));
    runInAction(() => {
      this._badgeCount = badgeOffsetElementList.totalCount;
      this._badge = this._badge.concat(badgeOffsetElementList.results);
    });

    return badgeOffsetElementList;
  }

  @action
  async findPagingChallengingBadges(badgeFilterRdo: BadgeFilterRdoModel, fromMain: boolean=false) {
    //
    // 도전 뱃지 정보 가져오기
    // const response = fromMain await this.badgeApi.findPagingChallengingBadges(badgeFilterRdo);

    // 테스트 후 아랫줄 제거 (윗 줄 실행되어야 함)
    const response = fromMain ? await this.badgeApi.findPagingMainChallengingBadges(badgeFilterRdo) :
      await this.badgeApi.findPagingChallengingBadges(badgeFilterRdo);

    const badgeOffsetElementList = new OffsetElementList<BadgeModel>(response);

    // // use session storage (사용할 거면 풀 것) : modified by JSM
    // if (fromMain) {
    //   window.sessionStorage.setItem('ChallengingBadgeList', JSON.stringify(badgeOffsetElementList));
    // }

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new BadgeModel(badge));
    runInAction(() => {
      this._challengingCount = badgeOffsetElementList.totalCount;
      this._badge = this._badge.concat(badgeOffsetElementList.results);
    });

    return badgeOffsetElementList;
  }

  // use session storage : modified by JSM
  @action
  async setPagingChallengingBadges(badge: OffsetElementList<BadgeModel>) {
    //
    const badgeOffsetElementList = new OffsetElementList<BadgeModel>(badge);

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new BadgeModel(badge));
    runInAction(() => {
      this._challengingCount = badgeOffsetElementList.totalCount;
      this._badge = this._badge.concat(badgeOffsetElementList.results);
    });

    return badgeOffsetElementList;
  }

  @action
  async findPagingEarnedBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    // 도전 뱃지 정보 가져오기
    const response = await this.badgeApi.findPagingEarnedBadges(badgeFilterRdo);
    const badgeOffsetElementList = new OffsetElementList<BadgeModel>(response);

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new BadgeModel(badge));
    runInAction(() => {
      this._earnedCount = badgeOffsetElementList.totalCount;
      this._badge = this._badge.concat(badgeOffsetElementList.results);
    });

    return badgeOffsetElementList;
  }

  @action
  async getCountOfBadges() {
    //
    const countInfo = await this.badgeApi.getCountOfBadges();
    runInAction(() => {
      if (countInfo && countInfo !== null) {
        this._badgeCount = countInfo.totalCount;
        this._challengingCount = countInfo.challengedCount;
        this._earnedCount = countInfo.issuedCount;
      }
      else {
        this._badgeCount = 0;
        this._challengingCount = 0;
        this._earnedCount = 0;
      }
    });

    return countInfo.code;
  }

  // PSJ - 연관 뱃지 목록
  @action
  async findLinkedBadges(badgeId: string) {
    //
    const response = await this.badgeApi.findLikedBadges(badgeId);
    const badgeOffsetElementList = new OffsetElementList<BadgeModel>(response);

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new BadgeModel(badge));
    runInAction( () => {
      this._badge = this._badge.concat(badgeOffsetElementList.results);
    });

    return badgeOffsetElementList;
  }

  /*
  @action
  async countTotalBadges(badgeFilterRdo: BadgeFilterRdoModel = new BadgeFilterRdoModel()) {
    //
    const count = await this.badgeApi.getTotalBadgeCount(badgeFilterRdo);
    runInAction(() => { this._badgeCount = count && count !== null ? count : 0; });

    return count;
  }

  @action
  async countChallengingBadges(badgeFilterRdo: BadgeFilterRdoModel = new BadgeFilterRdoModel()) {
    //
    const count = await this.badgeApi.getChallengingBadgeCount(badgeFilterRdo);
    runInAction(() => { this._challengingCount = count && count !== null ? count : 0; });

    return count;
  }

  @action
  async countEarnedBadges(badgeFilterRdo: BadgeFilterRdoModel = new BadgeFilterRdoModel()) {
    //
    const count = await this.badgeApi.getEarnedBadgeCount(badgeFilterRdo);
    // @ts-ignore
    runInAction(() => { this._earnedCount = count && count !== null ? count : 0; });

    return count;
  }
  */

  @computed
  get badges() {
    //
    return (this._badge as IObservableArray).peek();
  }

  @computed
  get badgeCount() {
    return this._badgeCount ? this._badgeCount : 0;
  }

  @computed
  get challengingCount() {
    return this._challengingCount ? this._challengingCount : 0;
  }

  @computed
  get earnedCount() {
    return this._earnedCount ? this._earnedCount : 0;
  }
}

BadgeService.instance = new BadgeService(BadgeApi.instance);

export default BadgeService;
