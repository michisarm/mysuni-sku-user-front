import React, {useEffect, useState} from 'react';
import {inject} from 'mobx-react';
import moment from 'moment';
import {mobxHelper, reactAlert} from '@nara.platform/accent';
import {RouteComponentProps, withRouter} from 'react-router';
import {Button} from 'semantic-ui-react';
import {ChallengeBadgeStatus} from '../view/ChallengeBoxElementsView';
import BadgeService from '../../present/logic/BadgeService';
import BadgeModel from '../model/MyBadgeModel';
import {Badge} from '../../shared/Badge';
import IssueState from '../../shared/Badge/ui/model/IssueState';
import ChallengeBoxCompanionModal from '../view/ChallengeBadgeCompanionModal';
import IssueStateNameType from '../../shared/Badge/ui/model/IssueStateNameType';
import BadgeStudentModel from '../model/BadgeStudentModel';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';

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
  const [ badgeState, setBadgeState ] = useState();

  // 학습 카운트 정보
  const [badgeLearningCount, setBadgeLearningCount] = useState({
    isCount: 0,
    totalCount: 0
  });

  const [ requestModal, setRequestModal ] = useState(false);
  const [ successModal, setSuccessModal ] = useState(false);


  useEffect(() => {
    //
    // 뱃지 수강정보 조회
    findMyContent(badgeId);

    // 구성학습 정보 조회
    findBadgeLearningInfo(badgeId);

  }, []);

  useEffect(() => {

    // 뱃지 수강정보 조회
    findMyContent(badgeId);

  }, [badgeState]);


  // Badge 수강정보 조회
  const findMyContent = async (badgeId: string) => {
    //
    const badgeStudentInfo: BadgeStudentModel | null = await badgeService!.findBadgeStudentInfo(badgeId);

    if ( badgeStudentInfo !== null ) {

      setBadgeStudentInfo(badgeStudentInfo);

      // 수강 정보 조합 => Badge 상태
      getBadgeState(
        badgeStudentInfo.challengeState,
        badgeStudentInfo.learningCompleted,
        badgeStudentInfo.issueState
      );
    }
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

  const getBadgeState = (
    challengeState: string,
    learningCompleted: boolean,
    issueState: string
  ) => {
    //

    if (challengeState !== 'Challenged') {
      // 도전 대기 - 최초도전 or 도전취소
      setBadgeState(ChallengeState.WaitForChallenge);
    }
    if (challengeState === 'Challenged') {
      if (issueState === IssueState.Issued) {
        // 획득 완료
        setBadgeState(ChallengeState.Issued);
      }
      if (issueState === IssueState.Requested) {
        // 발급요청중
        setBadgeState(ChallengeState.Requested);
      }
      if (
        issueState !== IssueState.Issued &&
        issueState !== IssueState.Requested &&
        learningCompleted
      ) {
        // 발급요청가능
        setBadgeState(ChallengeState.ReadyForRequest);
      }
      if (
        issueState !== IssueState.Issued &&
        issueState !== IssueState.Requested &&
        !learningCompleted
      ) {
        if ( badgeLearningCount.isCount === badgeLearningCount.totalCount ) {
          setBadgeState(ChallengeState.ReadyForRequest);
        } else {
          // 진행 중 => 도전취소 버튼 노출
          setBadgeState(ChallengeState.Challenging);
        }
      }
    }
  };



  // 발급요청
  const onClickRequestBadge = (id: string) => {
    //
    if ( id === undefined || id === null ) return;

    if ( !badge.autoIssued ) {
      if (!studentInfo?.learningCompleted) {
        // 학습 미완료 상태에서 발급요청 버튼 누름
        setRequestModal(!requestModal);
        return;
      }
      if (!studentInfo?.missionCompleted ) {
        reactAlert({title: '알림', message: '추가 미션을 완료해주세요.'});
        return;
      }
    }

    badgeService!.requestManualIssued(studentInfo!.id, IssueState.Requested)
      .then((response) => {
        if ( response ) {
          if ( badge.autoIssued ) {
            setSuccessModal(!successModal);
            setBadgeState(IssueState.Issued);
          } else {
            setBadgeState(ChallengeState.Requested);
          }
        } else {
          reactAlert({title:'요청 실패', message: '뱃지 발급 요청을 실패했습니다.'});
        }
      });

    // if (!badge.autoIssued) {
    //   //
    //   if (badgeLearningCount.isCount < badgeLearningCount.totalCount ) {
    //     setRequestModal(!requestModal);
    //   } else {
    //     // 발급요청 API call
    //
    //     badgeService!.requestManualIssued(id, IssueState.Requested)
    //       .then((response) => {
    //         console.log( response );
    //         if ( response ) {
    //           findMyContent(badgeId);
    //         } else {
    //           reactAlert({title: '발급 요청 실패', message: 'Badge 발급 요청을 실패했습니다.'});
    //         }
    //       });
    //
    //   }
    // }
  };

  const onHandleChangeModal = () => {
    setRequestModal(!requestModal);
  };

  // 성공 모달 닫기
  const onControlSuccessModal = () => {
    setSuccessModal(!successModal);
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
        { badgeState === IssueState.Requested && (
          <span className="status">
            <span className="number">
              <b>{IssueStateNameType.Requested}</b>
            </span>
            <span className="txt mt2">{moment(studentInfo?.issueStateTime).format('YYYY.MM.DD')} 발급 요청</span>
          </span>
        )}

        { (badgeState !== IssueState.Issued && badgeState !== IssueState.Requested) && (
          <>
            {/*수동발급*/}
            { !badge.autoIssued && (
              <ChallengeBoxCompanionModal
                open={requestModal}
                onAction={() => onClickRequestBadge(studentInfo!.id)}
                onClick={onHandleChangeModal}
              />
            )}

            {/*자동발급뱃지이지만 학습이수처리 이상으로 자동발급이 안된 경우*/}
            { badge.autoIssued && (
              <>
                { (badgeLearningCount.isCount === badgeLearningCount.totalCount && !studentInfo?.learningCompleted) && (
                  <>
                    <Button className="fix line" onClick={() => onClickRequestBadge(badge.badgeId)}>발급요청</Button>
                    <span className="txt txt2">자동으로 Badge 발급이 되지 않은 경우, 발급요청 버튼을 클릭해주세요.</span>
                  </>
                )}
              </>
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
  'badgeDetail.badgeDetailService',
))(withRouter(BadgeCompLeft));
