import React, { Fragment } from 'react';
import BadgeCompLeft from './BadgeCompLeft';
import BadgeCompRight from './BadgeCompRight';
import { MyBadge } from '../../model/MyBadge';
import { useBadgeCards } from '../../service/useBadgeCards/useBadgeCards';
import {
  getPassedCardIdMap,
  getPassedCardCount,
  getChallengeState,
  getFormattedIssueTime,
} from '../../model/BadgeStudent';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import { useBadgeStudent } from '../../service/useBadgeStudent/useBadgeStudent';

interface ChallengeBoxContainerProps {
  challengeBadge: MyBadge;
}

function ChallengeBoxContainer({ challengeBadge }: ChallengeBoxContainerProps) {
  const { badgeStudent, onSetBadgeStudent } = useBadgeStudent(challengeBadge.id);
  const { badgeCards } = useBadgeCards(challengeBadge.cardIds);

  const badgeCardCount = badgeCards.length;
  const passedCardIdMap = badgeStudent && getPassedCardIdMap(badgeStudent) || new Map<string, boolean>();
  const passedCardCount = badgeStudent && getPassedCardCount(badgeStudent) || 0;
  const challengeState = badgeStudent && getChallengeState(badgeStudent) || ChallengeState.WaitForChallenge;
  const formattedIssueTime = badgeStudent && getFormattedIssueTime(badgeStudent) || '';

  return (
    <div className="challenge-wrap">
      <Fragment key={`challenge-badge-${challengeBadge.id}`}>
        <div className="challenge-badge">
          <div>
            <BadgeCompLeft
              challengeBadge={challengeBadge}
              challengeState={challengeState}
              passedCardCount={passedCardCount}
              badgeCardCount={badgeCardCount}
              issueTime={formattedIssueTime}
              onSetBadgeStudent={onSetBadgeStudent}
            />
          </div>
          <BadgeCompRight
            name={challengeBadge.name}
            categoryId={challengeBadge.categoryId}
            badgeCards={badgeCards}
            passedCardIdMap={passedCardIdMap}
          />
        </div>
        <hr className="dividing" />
      </Fragment>
    </div>
  );
}

export default ChallengeBoxContainer;
