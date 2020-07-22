
import React, {Fragment, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Badge} from '../../shared/Badge';
import {ChallengeBadgeStatus} from '../view/ChallengeBoxElementsView';
import ChallengeBoxCompanionModal from '../view/ChallengeBadgeCompanionModal';
import BadgeModel from '../model/MyBadgeModel';
import BadgeCompRight from './BadgeCompRight';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import IssueState from '../../shared/Badge/ui/model/IssueState';

interface Props extends RouteComponentProps {
  badges: any,
  badgeStyle: string,
  badgeSize: string,
}

const ChallengeBoxContainer: React.FC<Props> = (Props) => {
  //
  const { badges, badgeStyle, badgeSize } = Props;

  const [ requestModal, setRequestModal ] = useState(false);


  // 발급요청
  const onClickRequestBadge = (learningCompleted: boolean) => {
    //
    if ( !learningCompleted ) {
      setRequestModal(!requestModal);
    } else {
      //
      // 추가발급조건 확인 -> missionCompleted 관련 데이터가 없음

    }
  };

  const onHandleChangeModal = () => {
    setRequestModal(!requestModal);
  };

  // 도전중, 발급요청중인 뱃지 목록
  return (
    <div className="challenge-wrap">

      {badges.map( (badge: BadgeModel, index: number) => (
        <Fragment key={`challenge-badge-${index}`}>
          <div className="challenge-badge">
            <div className="left-area">

              {/*Badge ui*/}
              <Badge
                badge={badge}
                badgeStyle={badgeStyle}
                badgeSize={badgeSize}
              />

              {/*Status info*/}
              <ChallengeBadgeStatus>

                { badge.issueState === IssueState.Requested && (
                  <span className="status">
                    <span className="number">
                      <b>발급 요청중</b>
                    </span>
                    <span className="txt mt2">발급요청일표시 발급 요청</span>
                  </span>
                )}

                { (badge.issueState !== IssueState.Issued && badge.issueState !== IssueState.Requested) && (
                  <>
                    {/*수동발급*/}
                    { !badge.autoIssued && (
                      <ChallengeBoxCompanionModal
                        open={requestModal}
                        onAction={() => onClickRequestBadge(badge.learningCompleted)}
                        onClick={onHandleChangeModal}
                      />
                    )}

                    <span className="number">
                      <span className="ing-txt">진행중</span>
                      <span><b>3</b>/11</span>
                    </span>

                    {/*자동발급*/}
                    { badge.autoIssued && (
                      <span className="txt">
                        Badge 도전 학습 모두 완료 시<br/>자동으로 Badge가 발급됩니다.
                      </span>
                    )}
                  </>
                )}
              </ChallengeBadgeStatus>
            </div>

            {/*도전중 뱃지별 학습리스트*/}
            <BadgeCompRight badge={badge} />

          </div>
          <hr className="dividing"/>
        </Fragment>
      ))}

    </div>

  );
};

export default withRouter(ChallengeBoxContainer);
