import React from 'react';
import {Button, Icon, Label, Segment} from 'semantic-ui-react';
import classNames from 'classnames';
import {dateTimeHelper} from 'shared';
import moment from 'moment';

import IssueState from '../../shared/Badge/ui/model/IssueState';
import IssueStateTypeName from '../../shared/Badge/ui/model/IssueStateNameType';

import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import ChallengeStateName from '../../shared/Badge/ui/model/ChallengeStateName';


interface Props {
  children: React.ReactNode
}

export const BadgeContentHeader: React.FC<Props> = ({children}) => (
  <div className="badge-header">
    <div className="inner">
      {children}
    </div>
  </div>
);


interface BadgeTitleProps {
  college: string,
  name: string,
}

export const BadgeTitle: React.FC<BadgeTitleProps> = ({college, name}) => (
  <div className="title-area">
    <div className="college">{college}</div>
    <div className="title">{name}</div>
  </div>
);


interface BadgeInfoProps {
  certiAdminCategoryName: string,
  certiAdminSubCategoryName: string,
  difficultyLevel: string,
  learningTime: number
}

export const BadgeInformation: React.FC<BadgeInfoProps> = ({certiAdminCategoryName, certiAdminSubCategoryName, difficultyLevel, learningTime}) => {
  //
  const learningTimeFormat = dateTimeHelper.timeToHourMinuteFormat(learningTime);

  return (
    <div className="info">
      <div>
        <span className="detail admin">
          <span>인증/관리 주체</span>
          <span>{certiAdminCategoryName}</span>
        </span>
      </div>
      <div>
        <span className="detail design">
          <span>설계 주체</span>
          <span>{certiAdminSubCategoryName}</span>
        </span>
      </div>
      <div>
        <span className="detail level">
          <span>Level</span>
          <span>{difficultyLevel}</span>
        </span>
        <span className="detail period">
          <span>총 학습시간</span>
          <span>{learningTimeFormat}</span>
        </span>
      </div>
    </div>
  );
};


interface BadgeOverviewProps {
  children: React.ReactNode
}

export const BadgeOverview: React.FC<BadgeOverviewProps> = ({children}) => (
  <Segment className="full">
    <div className="badge-detail">
      {children}
    </div>
  </Segment>
);


interface LinkedBadgeProps {
  children: React.ReactNode
}

export const LinkedBadgeListWrapper: React.FC<LinkedBadgeProps> = ({children}) => (
  <div className="relation-badge-area">
    <Segment className="full">
      <h3 className="title-style">
        <Label className="onlytext bold size24">
          <Icon className="series"/>
          <span>연관 Badge</span>
        </Label>
      </h3>
      {children}
    </Segment>
  </div>
);


interface BadgeStatusProps {
  badgeState: ChallengeState | undefined,
  issueStateTime?: number,
  onClickButton: () => void,
  description?: string,
  learningTotalCount?: number,
  learningCompleted?: number,
  onClickSample: () => void,
}

export const BadgeStatus: React.FC<BadgeStatusProps> = ({badgeState, issueStateTime, onClickButton, description, learningTotalCount, learningCompleted, onClickSample}) => {
  //
  const issueStateTimeFormat = moment(issueStateTime).format('YYYY.MM.DD');

  return (
    <div className="status">
      { (badgeState === ChallengeState.WaitForChallenge || badgeState === ChallengeState.Challenging || badgeState === ChallengeState.ReadyForRequest) && (
        <>
          <Button className="fix bg" onClick={onClickButton}>{ChallengeStateName[ChallengeState[badgeState]]}</Button>
          { badgeState === ChallengeState.Challenging && (
            <>
              <span className="ing">
                <span>진행중</span>
                <span className="num">
                  <b>{learningCompleted}</b>/{learningTotalCount}
                </span>
              </span>
              <Button onClick={onClickSample}>샘플 학습하기</Button>
            </>
          )}
          <span className="txt">{description}</span>
        </>
      )}

      {/*발급요청 완료, 획득 완료*/}
      { (badgeState === ChallengeState.Issued || badgeState === ChallengeState.Requested) && (
        <>
          <div className={ classNames('big', (badgeState === ChallengeState.Requested) ? 'orange' : 'black' )}>
            {ChallengeStateName[badgeState as ChallengeState]}
          </div>
          <span className="txt">{issueStateTimeFormat} {description}</span>
        </>
      )}

    </div>
  );
};
