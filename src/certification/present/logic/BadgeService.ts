import { action, computed, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import BadgeApi from '../apiclient/BadgeApi';
import {
  findBadgesWithStudentCount,
  findAvailableBadgesByRdo,
  findBadgesByBadgeIssueState,
  findBadge,
  findBadgesByIds,
  challengeBadge,
  cancelBadgeChallenges,
  requestIssue,
  cancelRequestIssue,
} from '../../api/BadgeApi';
import { Badge, BadgeBundle } from '../../model/Badge';
import { MyBadgeRdo } from '../../model/MyBadgeRdo';
import { MyBadge } from '../../model/MyBadge';
import { BadgeRdo } from '../../model/BadgeRdo';
import { AllBadgeCount } from '../../model/AllBadgeCount';
import { BadgeLevel } from '../../model/BadgeLevel';

@autobind
class BadgeService {
  //
  static instance: BadgeService;

  // private badgeApi: BadgeApi;

  // constructor(badgeApi: BadgeApi) {
  //   this.badgeApi = badgeApi;
  // }

  @observable
  _badge?: Badge;

  @computed get badge() {
    return this._badge;
  }

  @action
  async findBadge(badgeId: string) {
    const foundBadge = await findBadge(badgeId);

    if (foundBadge !== undefined) {
      runInAction(() => {
        this._badge = foundBadge;
      });
    }
  }

  @observable
  _badges: BadgeBundle[] = [];

  @computed get badges() {
    return this._badges;
  }

  @observable
  _badgeCount: number = 0;

  @computed get badgeCount() {
    return this._badgeCount;
  }

  @action
  async findAllBadges(badgeRdo: BadgeRdo) {
    const offsetElementList = await findAvailableBadgesByRdo(badgeRdo);

    if (
      offsetElementList &&
      offsetElementList.results &&
      offsetElementList.results.length > 0
    ) {
      runInAction(() => {
        this._badgeCount = offsetElementList.totalCount;
        this._badges = [...this._badges, ...offsetElementList.results];
      });
    }

    return offsetElementList;
  }

  @observable
  _myBadges: MyBadge[] = [];

  @computed get myBadges() {
    return this._myBadges;
  }

  @observable
  _myBadgeCount: number = 0;

  @computed get myBadgeCount() {
    return this._myBadgeCount;
  }

  @action
  async findAllMyBadges(myBadgeRdo: MyBadgeRdo) {
    const offsetElementList = await findBadgesByBadgeIssueState(myBadgeRdo);

    if (
      offsetElementList &&
      offsetElementList.results &&
      offsetElementList.results.length > 0
    ) {
      runInAction(() => {
        this._myBadgeCount = offsetElementList.totalCount;
        this._myBadges = [...this._myBadges, ...offsetElementList.results];
      });
    }

    return offsetElementList;
  }

  @observable
  _challengeBadges: MyBadge[] = [];

  @computed
  get challengeBadges() {
    return this._challengeBadges;
  }

  @observable
  _challengeBadgeCount: number = 0;

  @computed
  get challengeBadgeCount() {
    return this._challengeBadgeCount;
  }

  @action
  async findAllChallengeBadges(
    myBadgeRdo: MyBadgeRdo,
    fromMain: boolean = false
  ) {
    const offsetElementList = await findBadgesByBadgeIssueState(myBadgeRdo);

    // // use session storage (사용할 거면 풀 것) : by JSM
    // if (fromMain) {
    //   window.sessionStorage.setItem('ChallengingBadgeList', JSON.stringify(badgeOffsetElementList));
    // }
    if (
      offsetElementList &&
      offsetElementList.results &&
      offsetElementList.results.length > 0
    ) {
      runInAction(() => {
        this._challengeBadgeCount = offsetElementList.totalCount;
        this._challengeBadges = [
          ...this._challengeBadges,
          ...offsetElementList.results,
        ];
      });
    }

    return offsetElementList;
  }

  @observable
  _linkedBadges: BadgeBundle[] = [];

  @computed get linkedBadges(): BadgeBundle[] {
    return this._linkedBadges;
  }

  @action
  async findAllLinkedBadges(badgeIds: string[]): Promise<void> {
    const foundLinkedBadges = await findBadgesByIds(badgeIds);

    if (foundLinkedBadges) {
      runInAction(() => {
        this._linkedBadges = foundLinkedBadges;
      });
    }
  }

  @observable
  _allBadgeCount: AllBadgeCount = {
    totalCount: 0,
    challengingCount: 0,
    issuedCount: 0,
  };

  @computed get allBadgeCount(): AllBadgeCount {
    return this._allBadgeCount;
  }

  @action
  async findAllBadgeCount(): Promise<void> {
    const allCount = await findBadgesWithStudentCount();

    runInAction(() => {
      if (allCount) {
        this._allBadgeCount = {
          totalCount: allCount.badgeCount,
          challengingCount: allCount.challengingCount,
          issuedCount: allCount.issuedCount,
        };
      }
    });
  }

  @observable
  _selectedLevel: BadgeLevel = '';

  @computed get selectedLevel() {
    return this._selectedLevel;
  }

  @action
  setSelectedLevel(next: BadgeLevel) {
    this._selectedLevel = next;
  }

  @action
  clearBadge(): void {
    this._badge = undefined;
  }

  @action
  clearBadges(): void {
    this._badges = [];
    this._badgeCount = 0;
  }

  @action
  clearMyBadges(): void {
    this._myBadges = [];
    this._myBadgeCount = 0;
  }

  @action
  clearLinkedBadges(): void {
    this._linkedBadges = [];
  }

  @action
  clearChallengeBadges(): void {
    this._challengeBadges = [];
    this._challengeBadgeCount = 0;
  }

  async challengeBadge(badgeId: string): Promise<boolean> {
    const badgeStudentCdo = {
      badgeId,
    };

    return challengeBadge(badgeStudentCdo);
  }

  async cancelChallengeBadge(badgeStudentId: string): Promise<boolean> {
    return cancelBadgeChallenges([badgeStudentId]);
  }

  async requestIssue(badgeId: string): Promise<boolean> {
    return requestIssue(badgeId);
  }

  async cancelRequestIssue(badgeId: string): Promise<boolean> {
    return cancelRequestIssue(badgeId);
  }

  /////////////////////////////////////////////////////
  // @observable
  // _challengingCount: number = 0;

  // @observable
  // _earnedCount: number = 0;

  // // 수동뱃지 발급 요청
  // @action
  // async requestManualIssued(badgeStudentId: string, issueState: string) {
  //   //
  //   const response = await this.badgeApi.requestManualIssued(
  //     badgeStudentId,
  //     issueState
  //   );
  //   return response;
  // }

  // // 수동뱃지 발급 요청취소
  // @action
  // async cancelManualIssued(badgeStudentId: string) {
  //   //
  //   const response = await this.badgeApi.cancelManualIssued(badgeStudentId);
  //   return response;
  // }

  // // 자동뱃지 발급 요청
  // @action
  // async requestAutoIssued(List: any[]) {
  //   //
  //   const response: boolean = await this.badgeApi.requestAutoIssued(List);

  //   return response;
  // }

  // // 획득뱃지 개수
  // @action
  // async earnedBadgeCount(issueState: string) {
  //   //
  //   const response = await this.badgeApi.earnedBadgeCount(issueState);
  // }
}

Object.defineProperty(BadgeService, 'instance', {
  value: new BadgeService(),
  writable: false,
  configurable: false,
});

export default BadgeService;
