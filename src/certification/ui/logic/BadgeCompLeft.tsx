import React, {useEffect, useState} from 'react';
import {inject} from 'mobx-react';
import moment from 'moment';
import {mobxHelper, reactAlert} from '@nara.platform/accent';
import {RouteComponentProps, withRouter} from 'react-router';
import {Button} from 'semantic-ui-react';
import {ChallengeBadgeStatus} from '../view/ChallengeBoxElementsView';
import BadgeService from '../../present/logic/BadgeService';
import MyBadgeModel from '../model/MyBadgeModel';
import {Badge} from '../../shared/Badge';
import IssueState from '../../shared/Badge/ui/model/IssueState';
import ChallengeBoxCompanionModal from '../view/ChallengeBadgeCompanionModal';
import IssueStateNameType from '../../shared/Badge/ui/model/IssueStateNameType';
import BadgeStudentModel from '../model/BadgeStudentModel';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import ChallengeSuccessModal from './ChallengeSuccessModal';
import CertificationRoutePaths from '../../routePaths';


interface Props extends RouteComponentProps {
  badgeService?: BadgeService,

  badge: MyBadgeModel,
  badgeStyle: string,
  badgeSize: string,

  learningCount: number,
  passedCount: number,
  passedAll: boolean,
  // onIssuedBadgeRefresh: () => void,
}

const BadgeCompLeft: React.FC<Props> = (Props) => {
  //
  const { badgeService, badge, badgeStyle, badgeSize, learningCount, passedCount, passedAll, history } = Props;
  const { badgeId } = badge;

  const [ studentInfo, setBadgeStudentInfo ] = useState<BadgeStudentModel | null>();
  const [ badgeState, setBadgeState ] = useState();

  const [ requestModal, setRequestModal ] = useState(false);
  const [ successModal, setSuccessModal ] = useState(false);


  useEffect(() => {
    //
    // 뱃지 수강정보 조회
    getBadgeStudentInfo(badgeId);
  }, []);

  // Badge 수강정보 조회
  const getBadgeStudentInfo = async (badgeId: string) => {
    //
    const badgeStudentInfo: BadgeStudentModel | null = await badgeService!.findBadgeStudentInfo(badgeId);

    if ( badgeStudentInfo !== null ) {

      setBadgeStudentInfo(badgeStudentInfo);

      // 먼저 수강 정보로 Badge 상태 설정
      getBadgeState(
        badgeStudentInfo.challengeState,
        badgeStudentInfo.learningCompleted,
        badgeStudentInfo.issueState
      );
    }
  };

  const getBadgeState = (challengeState: string, learningCompleted: boolean, issueState: string) => {
    //
    if (challengeState === 'Challenged') {
      // 발급 완료
      if (issueState === IssueState.Issued) {
        setBadgeState(ChallengeState.Issued);
      }
      // 발급 요청 중
      else if (issueState === IssueState.Requested) {
        setBadgeState(ChallengeState.Requested);
      }
      // 발급 요청
      else if (learningCompleted) {
        setBadgeState(ChallengeState.ReadyForRequest);
      }
      // 일단 진행 중
      else {
        setBadgeState(passedAll ?
          // 진행 중이지만 모든 학습이 완료되었다고 판단될 경우 발급 요청
          ChallengeState.ReadyForRequest :
          // 진행 중 => 도전취소 버튼 노출
          ChallengeState.Challenging);
      }
    }
    else {
      // 도전 대기 - 최초도전 or 도전취소
      setBadgeState(ChallengeState.WaitForChallenge);
    }
  };

  // 발급요청
  const onClickRequestBadge = (id: string) => {
    //
    if ( id === undefined || id === null ) return;

    if ( !badge.autoIssued ) {
      if ( !badge.learningCompleted ) {
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
            // success popup
            setSuccessModal(!successModal);

          } else {
            setBadgeState(ChallengeState.Requested);
          }
          //getBadgeStudentInfo(badge.badgeId);
        }
        else {
          reactAlert({title:'요청 실패', message: '뱃지 발급 요청을 실패했습니다.'});
        }
      });
  };

  const onHandleChangeModal = () => {
    setRequestModal(!requestModal);
  };

  // 성공 모달 닫기
  const onControlSuccessModal = () => {
    setSuccessModal(!successModal);
    setBadgeState(IssueState.Issued);
    //getBadgeStudentInfo(badge.badgeId);

    // 발급 완료 후, 획득 뱃지 목록으로 이동(임시)
    history.push(CertificationRoutePaths.badgeEarnedBadgeList());

    //onIssuedBadgeRefresh();
    //setBadgeState(IssueState.Issued);
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
            { badge.autoIssued ? (
              // 자동발급뱃지이지만 학습이수처리 이상으로 자동발급이 안된 경우
              (!studentInfo?.learningCompleted && passedAll) && (
                <>
                  <Button className="fix line" onClick={() => onClickRequestBadge(badge.badgeId)}>발급요청</Button>
                  <span className="txt txt2">자동으로 Badge 발급이 되지 않은 경우, 발급요청 버튼을 클릭해주세요.</span>
                </>
              ))
              :
              <ChallengeBoxCompanionModal
                open={requestModal}
                onAction={() => onClickRequestBadge(studentInfo!.id)}
                onClick={onHandleChangeModal}
              />
            }
            <span className="number">
              <span className="ing-txt">진행중</span>
              <span><b>{passedCount}</b>/{learningCount}</span>
            </span>
            {/*자동발급*/}
            { badge.autoIssued && (
              <span className="txt">
                Badge 도전 학습 모두 완료 시<br/>자동으로 Badge가 발급됩니다.
              </span>
            )}

            {/*자동발급 완료 팝업*/}
            <ChallengeSuccessModal
              badge={badgeService!.badgeDetailInfo}
              successModal={successModal}
              onCloseSuccessModal={onControlSuccessModal}
            />
          </>
        )}
      </ChallengeBadgeStatus>

    </div>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(BadgeCompLeft));
