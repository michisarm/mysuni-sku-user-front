import React, {useEffect, useState} from 'react';
import {inject} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {RouteComponentProps, withRouter} from 'react-router';
import {ChallengeBadgeStatus} from '../view/ChallengeBoxElementsView';
import BadgeService from '../../present/logic/BadgeService';
import BadgeModel from '../model/MyBadgeModel';
import BadgeCompModel from '../model/BadgeCompModel';
import {Badge} from '../../shared/Badge';
import IssueState from '../../shared/Badge/ui/model/IssueState';
import ChallengeBoxCompanionModal from '../view/ChallengeBadgeCompanionModal';


interface Props extends RouteComponentProps {
  badgeService?: BadgeService,

  badge: BadgeModel,
  badgeStyle: string,
  badgeSize: string,
}

const BadgeCompLeft: React.FC<Props> = (Props) => {
  //
  const { badgeService, badge, badgeStyle, badgeSize } = Props;
  const { badgeId } = badge;

  const [ compList, setCompList ] = useState<BadgeCompModel[]>([]);

  const domainPath = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server'?
    window.location.protocol + '//' + window.location.host : 'http://ma.mysuni.sk.com';


  useEffect(() => {
    //
    findMyContent(badgeId);
  }, []);

  const findMyContent = async (badgeId: string) => {
    //
    const list = await badgeService!.findBadgeStudentInfo(badgeId);
  };


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

  // const getBadgeState = (challengeState: string, learningCompleted: string, issueState: string) => {
  //
  //
  // };




  return (
    <div className="left-area">
      {/*Badge ui*/}
      <Badge
        badge={badge}
        badgeStyle={badgeStyle}
        badgeSize={badgeSize}
      />
      {badge.badgeId}

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
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(BadgeCompLeft));
