import ChallengeState from "../shared/Badge/ui/model/ChallengeState";


export interface ChallengeBadgeStudent {
  passedCardCount: number;
  passedCardIdMap: Map<string, boolean>;
  challengeState: ChallengeState;
  formattedIssueTime: string;
}

export function getEmptyChallengeBadgeStudent() {
  return {
    passedCardCount: 0,
    passedCardIdMap: new Map<string, boolean>(),
    challengeState: ChallengeState.WaitForChallenge,
    formattedIssueTime: '',
  }
}