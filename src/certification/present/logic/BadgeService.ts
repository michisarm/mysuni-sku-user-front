import {action, computed, IObservableArray, observable, runInAction} from 'mobx';
import {autobind} from '@nara.platform/accent';
import {OffsetElementList} from 'shared/model';
import BadgeApi from '../apiclient/BadgeApi';
import BadgeFilterRdoModel from '../../ui/model/BadgeFilterRdoModel';
import BadgeModel from '../../ui/model/BadgeModel';
import MyBadgeModel from '../../ui/model/MyBadgeModel';
import CategoryModel from '../../ui/model/CategoryModel';
import BadgeDetailModel from '../../ui/model/BadgeDetailModel';
import BadgeCompModel from '../../ui/model/BadgeCompModel';
import BadgeStudentModel from '../../ui/model/BadgeStudentModel';


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
  _myBadge: MyBadgeModel[] = [];

  @observable
  _myBadgeCount: number = 0;

  @observable
  _badgeDetail: BadgeDetailModel = new BadgeDetailModel();

  @observable
  _badgeComposition: BadgeCompModel[] = [];

  @observable
  _badgeCount: number = 0;

  @observable
  _challengingCount: number = 0;

  @observable
  _earnedCount: number = 0;

  @observable
  _badgeStudent: BadgeStudentModel[] = [];

  @action
  clearCategories() {
    //
    return runInAction(() => this._category = []);
  }

  @action
  async findAllCategories() {
    //
    this.clearCategories();

    // 모든 뱃지 정보 가져오기
    const categoryList: CategoryModel[] = await this.badgeApi.findAllCategories();

    runInAction(() => {
      this._categoryCount = categoryList.length;
      this._category = this._category.concat(categoryList);
    });

    return categoryList;
  }

  @computed
  get categories() {
    return (this._category as IObservableArray).peek();
  }

  @computed
  get categoryCount() {
    return this._categoryCount ? this._categoryCount : 0;
  }

  @computed
  get badges() {
    //
    return (this._badge as IObservableArray).peek();
  }

  @computed
  get badgeCount() {
    return this._badgeCount ? this._badgeCount : 0;
  }

  @action
  clearBadges() {
    //
    return runInAction(() => this._badge = []);
  }

  @computed
  get myBadges() {
    //
    return (this._myBadge as IObservableArray).peek();
  }

  @computed
  get myBadgeCount() {
    return this._myBadgeCount ? this._myBadgeCount : 0;
  }

  @action
  clearMyBadges() {
    //
    return runInAction(() => this._myBadge = []);
  }

  @computed
  get challengingCount() {
    return this._challengingCount ? this._challengingCount : 0;
  }

  @computed
  get earnedCount() {
    return this._earnedCount ? this._earnedCount : 0;
  }

  @action
  clearBadgeComposition() {
    //
    return runInAction(() => this._badgeComposition = []);
  }

  @computed
  get badgeComposition() {
    return (this._badgeComposition as IObservableArray).peek();
  }

  @computed
  get badgeCompostionCount() {
    return this._badgeComposition ? this._badgeComposition.length : 0;
  }

  @action
  clearBadgeStudentInfo() {
    //
    return runInAction(() => this._badgeStudent = []);
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
    const response = await this.badgeApi.findPagingChallengingBadges(badgeFilterRdo);
    const badgeOffsetElementList = new OffsetElementList<MyBadgeModel>(response);

    // // use session storage (사용할 거면 풀 것) : modified by JSM
    // if (fromMain) {
    //   window.sessionStorage.setItem('ChallengingBadgeList', JSON.stringify(badgeOffsetElementList));
    // }

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new MyBadgeModel(badge));
    runInAction(() => {
      this._challengingCount = badgeOffsetElementList.totalCount;
      this._myBadge = this._myBadge.concat(badgeOffsetElementList.results);
    });

    return badgeOffsetElementList;
  }

  // use session storage : modified by JSM
  @action
  async setPagingChallengingBadges(badge: OffsetElementList<MyBadgeModel>) {
    //
    this.clearMyBadges();

    const badgeOffsetElementList = new OffsetElementList<MyBadgeModel>(badge);

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new MyBadgeModel(badge));
    runInAction(() => {
      this._challengingCount = badgeOffsetElementList.totalCount;
      this._myBadge = this._myBadge.concat(badgeOffsetElementList.results);
    });

    return badgeOffsetElementList;
  }

  @action
  async findPagingEarnedBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    // 도전 뱃지 정보 가져오기
    const response = await this.badgeApi.findPagingEarnedBadges(badgeFilterRdo);
    const badgeOffsetElementList = new OffsetElementList<MyBadgeModel>(response);

    badgeOffsetElementList.results = badgeOffsetElementList.results.map((badge) => new MyBadgeModel(badge));
    runInAction(() => {
      this._earnedCount = badgeOffsetElementList.totalCount;
      this._myBadge = this._myBadge.concat(badgeOffsetElementList.results);
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
  }

  @action
  async getCountOfIssuedBadges() {
    //
    const count = await this.badgeApi.getCountOfIssuedBadges();
    runInAction(() => {
      if (count && count !== null) {
        this._earnedCount = count;
      }
      else {
        this._earnedCount = 0;
      }
    });

    return this._earnedCount;
  }

  // PSJ - 연관 뱃지 목록
  @action
  async findLinkedBadges(badgeId: string) {
    //
    this.clearMyBadges();

    const linkedBadges: MyBadgeModel[] = await this.badgeApi.findLikedBadges(badgeId);

    if (linkedBadges && linkedBadges.length > 0) {
      runInAction(() => {
        this._myBadge = this._myBadge.concat(linkedBadges);
      });
    }

    return linkedBadges;
  }

  @computed
  get linkedBadges() {
    return this.badges;
  }

  @action
  async findBadgeDetailInfo(badgeId: string) {
    //
    const response = await this.badgeApi.findBadgeDetailInformation(badgeId);

    runInAction( () => {
      this._badgeDetail = new BadgeDetailModel(response);
    });

    return this._badgeDetail;
  }

  @computed
  get badgeDetailInfo() {
    return this._badgeDetail;
  }

  // 뱃지 구성 학습 목록
  @action
  async findBadgeComposition(badgeId: string) {
    //
    this.clearBadgeComposition();

    const badgeOffsetElementList = await this.badgeApi.findBadgeComposition(badgeId);

    if (badgeOffsetElementList && badgeOffsetElementList.length > 0) {
      runInAction(() => {
        this._badgeComposition = this._badgeComposition.concat(badgeOffsetElementList);
      });
    }

    return badgeOffsetElementList;
  }

  // 뱃지 수강정보
  @action
  async findBadgeStudentInfo(badgeId: string) {
    //
    this.clearBadgeStudentInfo();

    const studentOffsetElementList = await this.badgeApi.findBadgeStudentInfo(badgeId);

    if ( studentOffsetElementList && typeof studentOffsetElementList === 'object') {
      runInAction(() => {
        this._badgeStudent = this._badgeStudent.concat(studentOffsetElementList.results[0]);
      });
    }

    console.log( studentOffsetElementList );

    return studentOffsetElementList;
  }

  @computed
  get badgeStudentInfo() {
    return this._badgeStudent;
  }

  // 도전하기
  @action
  async challengeBadge(studentInfo: any, badgeId: string, challengeState: string) {
    //
    const response = await this.badgeApi.challengeBadge(studentInfo, badgeId, challengeState);

    return response;
  }

  // 도전취소
  @action
  async cancelChallengeBadge(id: string) {
    //
    const response = await this.badgeApi.cancelChallengeBadge(id);

    return response;
  }

  // 뱃지 자동발급 요청
  @action
  async requestAutoIssued() {
    //
    const response = await this.badgeApi.requestAutoIssued();

    return response;
  }


  // 획득뱃지 개수
  @action
  async earnedBadgeCount(issueState: string) {
    //
    const response = await this.badgeApi.earnedBadgeCount(issueState);
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
}

BadgeService.instance = new BadgeService(BadgeApi.instance);

export default BadgeService;
