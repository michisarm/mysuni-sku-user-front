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

  const [ studentInfo, setBadgeStudentInfo ] = useState<BadgeStudentModel | null>();

  // 학습 카운트 정보
  const [badgeLearningCount, setBadgeLearningCount] = useState({
    isCount: 0,
    totalCount: 0
  });

  const [ requestModal, setRequestModal ] = useState(false);


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
  const onClickRequestBadge = (id: string) => {
    //
    if (!badge.autoIssued) {
      //
      if (badgeLearningCount.isCount < badgeLearningCount.totalCount ) {
        setRequestModal(!requestModal);
      } else {
        // 발급요청 API call

        badgeService!.requestManualIssued(id, IssueState.Requested)
          .then((response) => {
            console.log( response );
            if ( response ) {
              findMyContent(badgeId);
            } else {
              reactAlert({title: '발급 요청 실패', message: 'Badge 발급 요청을 실패했습니다.'});
            }
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
            <span className="txt mt2">2020.07.30</span>
          </span>
        )}

        { (badge.issueState !== IssueState.Issued && badge.issueState !== IssueState.Requested) && (
          <>
            {/*수동발급*/}
            { !badge.autoIssued && (
              <ChallengeBoxCompanionModal
                open={requestModal}
                onAction={() => onClickRequestBadge(studentInfo!.id)}
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

export default  inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(BadgeCompLeft));
