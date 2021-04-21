import moment from 'moment';
import { Badge } from './Badge';
import { BadgeIssueState } from './BadgeIssueState';
import ChallengeState from '../shared/Badge/ui/model/ChallengeState';

export interface BadgeStudent {
  id: string;
  name: string;
  company: string;
  department: string;
  email: string;
  time: number;
  badgeIssueState: BadgeIssueState;
  badgeIssueStateModifiedTime: number;
  learningCanceledTime: number;
  learningCompletedTime: number;
  additionalRequirementsMailSentTime: number;
  additionalRequirementsConfirmedTime: number;
  additionalRequirementsPassed: boolean;
  badgeIssueMailSentTime: number;
  badgeId: string;
  completedCardIds: string[];
  badge: Badge;
}

export function getLearningCompleted(badgeStudent: BadgeStudent): boolean {
  return badgeStudent.learningCompletedTime ? true : false;
}

export function getPassedCardCount(badgeStudent: BadgeStudent): number {
  if (
    badgeStudent.completedCardIds &&
    badgeStudent.completedCardIds.length > 0
  ) {
    return badgeStudent.completedCardIds.length;
  }

  return 0;
}

export function getPassedCardIdMap(
  badgeStudent: BadgeStudent
): Map<string, boolean> {
  const map = new Map<string, boolean>();

  if (
    badgeStudent.completedCardIds &&
    badgeStudent.completedCardIds.length > 0
  ) {
    badgeStudent.completedCardIds.forEach(cardId => {
      map.set(cardId, true);
    });
  }

  return map;
}

export function getChallengeState(badgeStudent: BadgeStudent): ChallengeState {
  if (
    badgeStudent.learningCanceledTime &&
    !badgeStudent.learningCompletedTime &&
    (!badgeStudent.badgeIssueState ||
      badgeStudent.badgeIssueState === 'RequestCanceled')
  ) {
    return ChallengeState.WaitForChallenge;
  }

  if (badgeStudent.badgeIssueState === ChallengeState.Issued) {
    return ChallengeState.Issued;
  }

  if (badgeStudent.badgeIssueState === ChallengeState.Requested) {
    return ChallengeState.Requested;
  }

  if (badgeStudent.learningCompletedTime) {
    return ChallengeState.ReadyForRequest;
  } else {
    return ChallengeState.Challenging;
  }
}

export function getFormattedIssueTime(badgeStudent: BadgeStudent): string {
  return moment(badgeStudent.badgeIssueStateModifiedTime).format('YYYY.MM.DD');
}
