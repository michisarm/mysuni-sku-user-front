import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Button, Icon, Label, Segment } from 'semantic-ui-react';
import classNames from 'classnames';
import { dateTimeHelper } from 'shared';
import moment from 'moment';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import IssueState from '../../shared/Badge/ui/model/IssueState';
import { Area } from 'tracker/model';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

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
    ReactGA.pageview(
      window.location.pathname + window.location.search,
      [],
      `(Badge) - ${name}`
    );
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
  const learningTimeFormat =
    dateTimeHelper.timeToHourMinuteFormat(learningTime);

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
          <span>
            <PolyglotText
              defaultString="인증/관리 주체"
              id="Certification-View-인증관리주체"
            />
          </span>
          <span>{certiAdminCategoryName}</span>
        </span>
      </div>
      <div>
        <span className="detail design">
          <span>
            <PolyglotText
              defaultString="설계 주체"
              id="Certification-View-설계주체"
            />
          </span>
          <span>{designAdminName}</span>
        </span>
      </div>
      <div>
        <span className="detail level">
          <span>
            <PolyglotText defaultString="Level" id="Certification-View-Level" />
          </span>
          <span
            dangerouslySetInnerHTML={{
              __html: getDifficultyLevel(difficultyLevel),
            }}
          />
        </span>
        <span className="detail period">
          <span>
            <PolyglotText
              defaultString="총 학습시간"
              id="Certification-View-총학습시간"
            />
          </span>
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
    <div className="badge-detail" data-area={Area.CERTIFICATION_PATH}>
      {children}
    </div>
  </Segment>
);

interface LinkedBadgeProps {
  children: React.ReactNode | any;
}

export const LinkedBadgeListWrapper: React.FC<LinkedBadgeProps> = ({
  children,
}) => (
  <div className="relation-badge-area" data-area={Area.CERTIFICATION_RELATION}>
    <Segment className="full">
      <h3 className="title-style">
        <Label className="onlytext bold size24">
          <Icon className="series" />
          <span>
            <PolyglotText
              defaultString="연관 Badge"
              id="Certification-View-연관뱃지"
            />
          </span>
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

export const BadgeStatus: React.FC<BadgeStatusProps> = (BadgeStatusProps) => {
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

  function badgeStateText() {
    if (badgeState === ChallengeState.WaitForChallenge) {
      return (
        <PolyglotText id="Certification-View-도전" defaultString="도전하기" />
      );
    } else if (badgeState === ChallengeState.Challenging) {
      return (
        <PolyglotText
          id="Certification-View-도전취소"
          defaultString="도전취소"
        />
      );
    } else if (badgeState === ChallengeState.ReadyForRequest) {
      return (
        <PolyglotText
          id="Certification-View-발급요청"
          defaultString="발급요청"
        />
      );
    } else if (badgeState === ChallengeState.Requested) {
      return (
        <PolyglotText
          id="Certification-View-발급취소"
          defaultString="발급요청 취소"
        />
      );
    } else if (badgeState === ChallengeState.Issued) {
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
      {(badgeState === ChallengeState.WaitForChallenge ||
        badgeState === ChallengeState.Challenging ||
        badgeState === ChallengeState.ReadyForRequest ||
        badgeState === ChallengeState.Requested) && (
        <>
          <Button className="fix bg" onClick={onClickButton}>
            {badgeStateText()}
          </Button>
          {badgeState === ChallengeState.Challenging && (
            <>
              <span className="ing">
                <span>
                  <PolyglotText
                    id="Certification-View-진행중"
                    defaultString="진행중"
                  />
                </span>
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
          <div className={classNames('big black')}>{badgeStateText()}</div>
          <span className="txt">
            {issueStateTimeFormat} {description}
          </span>
        </>
      )}
    </div>
  );
};
