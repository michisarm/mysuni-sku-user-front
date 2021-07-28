import React from 'react';
import { Button } from 'semantic-ui-react';
import moment from 'moment';
import classNames from 'classnames';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import ChallengeStateText from '../../shared/Badge/ui/model/ChallengeStateText';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { ChallengeStateDescription } from '../model/ChallengeStateDescription';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface ChallengeStateViewProps {
  challengeState: ChallengeState;
  passedCardCount: number;
  badgeCardCount: number;
  issueStateTime: number;
  onClickButton: () => void;
}

function ChallengeStateView({
  challengeState,
  passedCardCount,
  badgeCardCount,
  issueStateTime,
  onClickButton,
}: ChallengeStateViewProps) {
  const formattedIssueStateTime =
    moment(issueStateTime).format('YYYY.MM.DD') || '';

  const stateText = ChallengeStateText[challengeState];
  const stateDescription = ChallengeStateDescription[challengeState];

  return (
    <div className="status">
      {(challengeState === ChallengeState.WaitForChallenge ||
        challengeState === ChallengeState.Challenging ||
        challengeState === ChallengeState.ReadyForRequest ||
        challengeState === ChallengeState.Requested) && (
        <>
          <Button className="fix bg" onClick={onClickButton}>
            {stateText}
          </Button>
          {challengeState === ChallengeState.Challenging && (
            <>
              <span className="ing">
                <span>
                  <PolyglotText
                    id="Certification-ChallengeState-진행중"
                    defaultString="진행중"
                  />
                </span>
                <span className="num">
                  <b>{passedCardCount}</b>/{badgeCardCount}
                </span>
              </span>
            </>
          )}
          {challengeState === ChallengeState.Requested ? (
            <span className="txt">
              {formattedIssueStateTime} {stateDescription}
            </span>
          ) : (
            <span className="txt">{stateDescription}</span>
          )}
        </>
      )}

      {/*발급요청 완료, 획득 완료*/}
      {challengeState === ChallengeState.Issued && (
        <>
          <div className={classNames('big black')}>{stateText}</div>
          <span className="txt">
            {formattedIssueStateTime} {stateDescription}
          </span>
        </>
      )}
    </div>
  );
}

export default inject(
  mobxHelper.injectFrom('badge.badgeStudentService', 'badge.badgeCardService')
)(observer(ChallengeStateView));
