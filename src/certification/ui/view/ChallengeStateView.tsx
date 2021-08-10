import React from 'react';
import { Button } from 'semantic-ui-react';
import moment from 'moment';
import classNames from 'classnames';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
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

  //const stateText = ChallengeStateText[challengeState];
  const stateDescription = ChallengeStateDescription[challengeState];

  function challengeStateText() {
    if (challengeState === ChallengeState.WaitForChallenge) {
      return (
        <PolyglotText id="Certification-View-도전" defaultString="도전하기" />
      );
    } else if (challengeState === ChallengeState.Challenging) {
      return (
        <PolyglotText
          id="Certification-View-도전취소"
          defaultString="도전취소"
        />
      );
    } else if (challengeState === ChallengeState.ReadyForRequest) {
      return (
        <PolyglotText
          id="Certification-View-발급요청"
          defaultString="발급요청"
        />
      );
    } else if (challengeState === ChallengeState.Requested) {
      return (
        <PolyglotText
          id="Certification-View-발급취소"
          defaultString="발급요청 취소"
        />
      );
    } else if (challengeState === ChallengeState.Issued) {
      return (
        <PolyglotText
          id="Certification-View-획득완료"
          defaultString="획득완료"
        />
      );
    }
  }

  return (
    <div className="status">
      {(challengeState === ChallengeState.WaitForChallenge ||
        challengeState === ChallengeState.Challenging ||
        challengeState === ChallengeState.ReadyForRequest ||
        challengeState === ChallengeState.Requested) && (
        <>
          <Button className="fix bg" onClick={onClickButton}>
            {challengeStateText()}
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
          <div className={classNames('big black')}>{challengeStateText()}</div>
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
