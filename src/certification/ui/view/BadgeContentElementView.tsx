import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Button, Icon, Label, Segment } from 'semantic-ui-react';
import classNames from 'classnames';
import { dateTimeHelper } from 'shared';
import moment from 'moment';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import ChallengeStateName from '../../shared/Badge/ui/model/ChallengeStateName';
import IssueState from '../../shared/Badge/ui/model/IssueState';

interface Props {
  children: React.ReactNode;
}

export const BadgeContentHeader: React.FC<Props> = ({ children }) => (
  <div className="badge-header">
    <div className="inner">{children}</div>
  </div>
);

interface BadgeTitleProps {
  college: string;
  name: string;
}

let count = 0;
export const BadgeTitle: React.FC<BadgeTitleProps> = ({ college, name }) => {

  ++count;
  if (count === 3) {
    // console.log('name',name);
    ReactGA.pageview(window.location.pathname + window.location.search, [], `(Badge) - ${name}`);
  }

  useEffect(() => {
    return () => {
      count = 0;
    };
  }, []);

  return (
    <div className="title-area">
      <div className="college">{college}</div>
      <div className="title">{name}</div>
    </div>
  );
};

interface BadgeInfoProps {
  certiAdminCategoryName: string;
  designAdminName: string;
  difficultyLevel: string;
  learningTime: number;
}

export const BadgeInformation: React.FC<BadgeInfoProps> = ({
  certiAdminCategoryName,
  designAdminName,
  difficultyLevel,
  learningTime,
}) => {
  //
  const learningTimeFormat = dateTimeHelper.timeToHourMinuteFormat(
    learningTime
  );

  // Level
  const getDifficultyLevel = (level: string) => {
    //
    let levelHtml = '';
    const num = Number(level.charAt(level.length - 1));
    for (let i = 0; i < num; i++) {
      levelHtml += '<span class="star"></span>';
    }

    return levelHtml;
  };

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
          <span>{designAdminName}</span>
        </span>
      </div>
      <div>
        <span className="detail level">
          <span>Level</span>
          <span
            dangerouslySetInnerHTML={{
              __html: getDifficultyLevel(difficultyLevel),
            }}
          />
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
  children: React.ReactNode;
}

export const BadgeOverview: React.FC<BadgeOverviewProps> = ({ children }) => (
  <Segment className="full">
    <div className="badge-detail">{children}</div>
  </Segment>
);

interface LinkedBadgeProps {
  children: React.ReactNode | any;
}

export const LinkedBadgeListWrapper: React.FC<LinkedBadgeProps> = ({
  children,
}) => (
    <div className="relation-badge-area">
      <Segment className="full">
        <h3 className="title-style">
          <Label className="onlytext bold size24">
            <Icon className="series" />
            <span>연관 Badge</span>
          </Label>
        </h3>
        {children}
      </Segment>
    </div>
  );

interface BadgeStatusProps {
  // badgeState 에 IssueState 타입 추가. 2020.09.28 by 김동구
  badgeState: ChallengeState | IssueState | undefined;
  issueStateTime?: number | undefined;
  onClickButton: () => void;
  description?: string;
  learningTotalCount?: number;
  learningCompleted?: number;
}

export const BadgeStatus: React.FC<BadgeStatusProps> = BadgeStatusProps => {
  //
  const {
    badgeState,
    issueStateTime,
    onClickButton,
    description,
    learningTotalCount,
    learningCompleted,
  } = BadgeStatusProps;
  const issueStateTimeFormat = moment(issueStateTime).format('YYYY.MM.DD');

  return (
    <div className="status">
      {(badgeState === ChallengeState.WaitForChallenge ||
        badgeState === ChallengeState.Challenging ||
        badgeState === ChallengeState.ReadyForRequest ||
        badgeState === ChallengeState.Requested) && (
          <>
            <Button className="fix bg" onClick={onClickButton}>
              {ChallengeStateName[ChallengeState[badgeState]]}
            </Button>
            {badgeState === ChallengeState.Challenging && (
              <>
                <span className="ing">
                  <span>진행중</span>
                  <span className="num">
                    <b>{learningCompleted}</b>/{learningTotalCount}
                  </span>
                </span>
              </>
            )}
            {badgeState === ChallengeState.Requested ? (
              <span className="txt">
                {issueStateTimeFormat} {description}
              </span>
            ) : (
                <span className="txt">{description}</span>
              )}
          </>
        )}

      {/*발급요청 완료, 획득 완료*/}
      {badgeState === ChallengeState.Issued && (
        <>
          <div className={classNames('big black')}>
            {ChallengeStateName[badgeState as ChallengeState]}
          </div>
          <span className="txt">
            {issueStateTimeFormat} {description}
          </span>
        </>
      )}
    </div>
  );
};
