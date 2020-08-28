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
    this._categoryCount = 0;
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
  clearMyBadges() {
    //
    this._myBadgeCount = 0;
    return runInAction(() => this._myBadge = []);
  }

  @action
  clearBadges() {
    //
    this._badgeCount = 0;
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
  clearChallengingBadges() {
    //
    this._challengingCount = 0;
    return runInAction(() => this._myBadge = []);
  }

  @computed
  get challengingCount() {
    return this._challengingCount ? this._challengingCount : 0;
  }

  @action
  clearEarnedBadges() {
    //
    this._earnedCount = 0;
    return runInAction(() => this._myBadge = []);
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
    //this.clearBadges();

    // 모든 뱃지 정보 가져오기
    const badgeOffsetElementList: OffsetElementList<BadgeModel> | null = await this.badgeApi.findPagingAllBadges(badgeFilterRdo);

    if (badgeOffsetElementList) {
      runInAction(() => {
        this._badgeCount = badgeOffsetElementList.totalCount;
        this._badge = this._badge.concat(badgeOffsetElementList.results);
      });
    }
    // else {
    //   this._badgeCount = 0;
    // }

    return badgeOffsetElementList;
  }

  @action
  async findPagingChallengingBadges(badgeFilterRdo: BadgeFilterRdoModel, fromMain: boolean=false) {
    //
    //this.clearChallengingBadges();

    // 도전 뱃지 정보 가져오기
    const badgeOffsetElementList: OffsetElementList<MyBadgeModel> | null  = await this.badgeApi.findPagingChallengingBadges(badgeFilterRdo);

    // // use session storage (사용할 거면 풀 것) : by JSM
    // if (fromMain) {
    //   window.sessionStorage.setItem('ChallengingBadgeList', JSON.stringify(badgeOffsetElementList));
    // }

    if (badgeOffsetElementList) {
      runInAction(() => {
        this._challengingCount = badgeOffsetElementList.totalCount;
        this._myBadge = this._myBadge.concat(badgeOffsetElementList.results);
      });
    }
    // else {
    //   this._challengingCount = 0;
    // }

    return badgeOffsetElementList;
  }

  @action
  async setPagingChallengingBadges(badge: OffsetElementList<MyBadgeModel>) {
    //
    this.clearChallengingBadges();

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
    //this.clearEarnedBadges();

    // 마이 뱃지 정보 가져오기
    const badgeOffsetElementList: OffsetElementList<MyBadgeModel> | null = await this.badgeApi.findPagingEarnedBadges(badgeFilterRdo);

    if (badgeOffsetElementList && badgeOffsetElementList.results) {
      runInAction(() => {
        this._earnedCount = badgeOffsetElementList.totalCount;
        this._myBadge = this._myBadge.concat(badgeOffsetElementList.results);
      });
    }

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
    const response: BadgeDetailModel | null = await this.badgeApi.findBadgeDetailInformation(badgeId);

    runInAction(() => {
      this._badgeDetail = new BadgeDetailModel(response);
    });

    return response;
  }

  @action
  async findBadgeInfo(badgeId: string) {
    //
    const response: BadgeDetailModel | null = await this.badgeApi.findBadgeInformation(badgeId);

    runInAction(() => {
      this._badgeDetail = new BadgeDetailModel(response);
    });

    return response;
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

    const badgeOffsetElementList: BadgeCompModel[] = await this.badgeApi.findBadgeComposition(badgeId);

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

    const studentOffsetElementList: OffsetElementList<BadgeStudentModel> | null = await this.badgeApi.findBadgeStudentInfo(badgeId);

    if (studentOffsetElementList && studentOffsetElementList.results) {
      runInAction(() => {
        this._badgeStudent = this._badgeStudent.concat(studentOffsetElementList.results);
      });
    }

    return !studentOffsetElementList || studentOffsetElementList.empty ? null : studentOffsetElementList.results[0];
  }

  @computed
  get badgeStudentInfo() {
    return this._badgeStudent;
  }

  // 도전하기
  @action
  async challengeBadge(id: string | null, studentInfo: {name: string, email: string, company: string, department: string}, badgeId: string, challengeState: string) {
    //
    const response = await this.badgeApi.challengeBadge(id, studentInfo, badgeId, challengeState);
    return response;
  }

  // 도전취소
  @action
  async cancelChallengeBadge(badgeStudentId: string, challengeState: string) {
    //
    const response = await this.badgeApi.cancelChallengeBadge(badgeStudentId, challengeState);
    return response;
  }

  // 수동뱃지 발급 요청
  @action
  async requestManualIssued(badgeStudentId: string, issueState: string) {
    //
    const response = await this.badgeApi.requestManualIssued(badgeStudentId, issueState);

    return response;
  }

  // 자동뱃지 발급 요청
  @action
  async requestAutoIssued(List: any[]) {
    //
    const response: boolean = await this.badgeApi.requestAutoIssued(List);

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

Object.defineProperty(BadgeService, 'instance',{
  value: new BadgeService(BadgeApi.instance),
  writable: false,
  configurable: false,
});

export default BadgeService;
