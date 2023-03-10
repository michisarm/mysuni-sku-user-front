import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Button, Icon, Label, Segment } from 'semantic-ui-react';
import classNames from 'classnames';
import { dateTimeHelper } from 'shared';
import moment from 'moment';
import ChallengeState, {
  challengeStateText,
} from '../../shared/Badge/ui/model/ChallengeState';
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
              defaultString="??????/?????? ??????"
              id="Certification-View-??????????????????"
            />
          </span>
          <span>{certiAdminCategoryName}</span>
        </span>
      </div>
      <div>
        <span className="detail design">
          <span>
            <PolyglotText
              defaultString="?????? ??????"
              id="Certification-View-????????????"
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
              defaultString="??? ????????????"
              id="Certification-View-???????????????"
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
              defaultString="?????? Badge"
              id="Certification-View-????????????"
            />
          </span>
        </Label>
      </h3>
      {children}
    </Segment>
  </div>
);

interface BadgeStatusProps {
  // badgeState ??? IssueState ?????? ??????. 2020.09.28 by ?????????
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

  return (
    <div className="status">
      {(badgeState === ChallengeState.WaitForChallenge ||
        badgeState === ChallengeState.Challenging ||
        badgeState === ChallengeState.ReadyForRequest ||
        badgeState === ChallengeState.Requested) && (
        <>
          <Button className="fix bg" onClick={onClickButton}>
            {challengeStateText(badgeState)}
          </Button>
          {badgeState === ChallengeState.Challenging && (
            <>
              <span className="ing">
                <span>
                  <PolyglotText
                    id="Certification-View-?????????"
                    defaultString="?????????"
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

      {/*???????????? ??????, ?????? ??????*/}
      {badgeState === ChallengeState.Issued && (
        <>
          <div className={classNames('big black')}>
            {challengeStateText(badgeState)}
          </div>
          <span className="txt">
            {issueStateTimeFormat} {description}
          </span>
        </>
      )}
    </div>
  );
};
