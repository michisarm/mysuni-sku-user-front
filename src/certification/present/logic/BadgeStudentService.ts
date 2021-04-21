import { reactAutobind } from '@nara.platform/accent';
import { observable, computed, action, runInAction } from 'mobx';
import {
  BadgeStudent,
  getLearningCompleted,
  getPassedCardIdMap,
  getChallengeState,
  getPassedCardCount,
} from '../../model/BadgeStudent';
import { findBadgeStudent } from '../../api/BadgeStudentApi';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';

@reactAutobind
export default class BadgeStudentService {
  static instance: BadgeStudentService;

  @observable
  _badgeStudent?: BadgeStudent;

  @computed get badgeStudent() {
    return this._badgeStudent;
  }

  @observable
  _passedCardCount: number = 0;

  @computed get passedCardCount() {
    return this._passedCardCount;
  }

  @observable
  _passedCardIdMap: Map<string, boolean> = new Map();

  @computed get passedCardIdMap(): Map<string, boolean> {
    return this._passedCardIdMap;
  }

  @observable
  _learningCompleted: boolean = false;

  @computed get learningCompleted() {
    return this._learningCompleted;
  }

  @observable
  _challengeState: ChallengeState = ChallengeState.WaitForChallenge;

  @computed get challengeState() {
    return this._challengeState;
  }

  @action
  setChallengeState(challengeState: ChallengeState) {
    this._challengeState = challengeState;
  }

  @action
  async findBadgeStudent(badgeId: string): Promise<BadgeStudent | undefined> {
    const foundBadgeStudent = await findBadgeStudent(badgeId);

    if (foundBadgeStudent !== undefined) {
      runInAction(() => {
        this._badgeStudent = foundBadgeStudent;
        this._learningCompleted = getLearningCompleted(foundBadgeStudent);
        this._passedCardCount = getPassedCardCount(foundBadgeStudent);
        this._passedCardIdMap = getPassedCardIdMap(foundBadgeStudent);
        this._challengeState = getChallengeState(foundBadgeStudent);
      });
    }

    return foundBadgeStudent;
  }

  @action
  clearBadgeStudent() {
    this._badgeStudent = undefined;
    this._passedCardCount = 0;
    this._passedCardIdMap = new Map();
    this._challengeState = ChallengeState.WaitForChallenge;
  }
}

Object.defineProperty(BadgeStudentService, 'instance', {
  value: new BadgeStudentService(),
  writable: false,
  configurable: false,
});
