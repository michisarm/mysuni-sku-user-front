import React, {useEffect, useState} from 'react';
import {inject} from 'mobx-react';
import {mobxHelper, reactAlert} from '@nara.platform/accent';
import {RouteComponentProps, withRouter} from 'react-router';
import {ChallengeBadgeStatus} from '../view/ChallengeBoxElementsView';
import BadgeService from '../../present/logic/BadgeService';
import BadgeModel from '../model/MyBadgeModel';
import BadgeCompModel from '../model/BadgeCompModel';
import {Badge} from '../../shared/Badge';
import IssueState from '../../shared/Badge/ui/model/IssueState';
import ChallengeBoxCompanionModal from '../view/ChallengeBadgeCompanionModal';
import IssueStateNameType from '../../shared/Badge/ui/model/IssueStateNameType';
import BadgeStudentModel from '../model/BadgeStudentModel';


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

  const [ studentInfo, setBadgeStudentInfo ] = useState();

  // 학습 카운트 정보
  const [badgeLearningCount, setBadgeLearningCount] = useState({
    isCount: 0,
    totalCount: 0
  });

  const [ requestModal, setRequestModal ] = useState(false);


  const [ compList, setCompList ] = useState<BadgeCompModel[]>([]);

  const domainPath = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server'?
    window.location.protocol + '//' + window.location.host : 'http://ma.mysuni.sk.com';


  useEffect(() => {
    //
    findMyContent(badgeId);
  }, []);

  useEffect(() => {

    // 구성학습 정보 조회
    findBadgeLearningInfo(badgeId);

  }, []);


  // Badge 수강정보 조회
  const findMyContent = async (badgeId: string) => {
    //
    const badgeStudentInfo = await badgeService!.findBadgeStudentInfo(badgeId);
    console.log( badgeStudentInfo );

    setBadgeStudentInfo(badgeStudentInfo);

  };

  // 구성학습 카운트 조회
  const findBadgeLearningInfo = async (badgeId: string) => {
    //
    const badgeLearningInfo = await badgeService!.findBadgeComposition(badgeId);

    let cnt = 0;
    badgeLearningInfo.map((item, index) => {
      if ( item.learningState === 'Passed' ) { cnt++; }
    });

    setBadgeLearningCount({
      isCount: cnt,
      totalCount: badgeLearningInfo.length,
    });
  };


  // 발급요청
  const onClickRequestBadge = (learningCompleted: boolean) => {
    //
    if (!badge.autoIssued) {

      // learningCompleted가 변경되는 시점 확인 필요
      if (badgeLearningCount.isCount < badgeLearningCount.totalCount ) {
        setRequestModal(!requestModal);
      } else {
        // 발급요청 API call

        console.log( studentInfo );

        badgeService!.requestManualIssued(studentInfo.id, IssueState.Requested)
          .then((response) => {
            console.log( response );
          });

      }
    }
  };

  const onHandleChangeModal = () => {
    setRequestModal(!requestModal);
  };

  return (
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
              <b>{IssueStateNameType.Requested}</b>
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
              <span><b>{badgeLearningCount.isCount}</b>/{badgeLearningCount.totalCount}</span>
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
