import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { BadgeService } from '../../../lecture/stores';
import BadgeSummaryView from '../view/BadgeSummaryView';
import BadgeChallengeContainer from './BadgeChallengeContainer';


interface BadgeSummaryContainerProps {
  badgeService?: BadgeService;
}

function BadgeSummaryContainer({
  badgeService,
}: BadgeSummaryContainerProps) {
  const { badge } = badgeService!;

  return (
    <div className="badge-header">
      <div className="inner">
        {
          badge !== undefined && (
            <>
              <BadgeSummaryView badge={badge}/>
            </>
          )
        }
        <BadgeChallengeContainer />
      </div>
    </div>
  );
}

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
  ))(observer(BadgeSummaryContainer));





  
  
  //   // 학습 진행률이 100% 인 경우, 발급요청 상태로 변경
  //   // learningCompleted를 사용하지 않는 이유: Learning Path의 모든 학습의 완료 시점을 알기 힘듬. 학습하기 -> 학습완료로 변경 시점에 모든 cube, course, badge를 다뒤져야 하는 상황
  //   // 내일 협의 후 결정
  //   // 발급 요청 버튼 클릭 시 learningCompleted: true (이수처리) 필요 할 수 있음
  //   // if ( cnt === badgeLearningInfo.length ) {
  //   //   setBadgeState(ChallengeState.ReadyForRequest);
  //   // }


  // const onClickChallengeButton = () => {
  //   if(badge === undefined) {
  //     return;
  //   }

  //   if (badge.forSelectedMember) {
  //     reactAlert({
  //       title: '',
  //       message:
  //         '별도 공지되는 신청 과정을 통해 운영하는 뱃지입니다.<p>해당 자격증을 이미 취득하셨거나, 취득 예정인 분은 <p>담당자에게 연락 주시기 바랍니다.',
  //     });
  //   } else {
  //     switch (challengeState) {
  //       case ChallengeState.WaitForChallenge:
  //         reactAlert({
  //           title: '',
  //           message: `‘${badge.name}’ Badge 도전이 시작되었습니다.<p>‘도전 중 Badge’ 탭을 통해 Learning Path에 따라 학습해주세요.<p>뱃지 도전관련 문의는 담당자에게 연락 부탁드립니다.`,
  //         });
  //         challengeBadge();
  //         break;
  //       case ChallengeState.Challenging:
  //         openCancelModal();
  //         break;
  //       case ChallengeState.ReadyForRequest:
  //         requestIssue();
  //         break;
  //       case ChallengeState.Requested:
  //         // cancelRequestIssue();
  //         break;
  //     }
  //   }
  // };

  // const challengeBadge = async () => {
  //   const response = await badgeService!.challengeBadge(params.badgeId);

  //   if(response) {
  //     badgeStudentService!.findBadgeStudent(params.badgeId);
  //   }
  // };

  // const openCancelModal = () => {
  //   setCancelModal(true);
  // };

  

  // const requestIssue = async () => {
  //   if(badge === undefined) {
  //     return;
  //   }

  //   if(badge.issueAutomatically) {
  //     setSuccessModal(true);
  //     return;
  //   }

  //   const response = await badgeService!.requestIssue(badge.id);

  //   if(response) {
  //     badgeStudentService!.findBadgeStudent(badge.id);
  //   } else {
  //     reactAlert({
  //       title: '요청 실패',
  //       message: '뱃지 발급 요청을 실패했습니다.',
  //     });
  //   }


  //   // 수동발급 뱃지 & 추가미션 미완료
  //   // if (!autoIssuedBadge ) {
  //   //   if (badgeDetail.additionTermsExist && !missionCompleted ) {
  //   //     reactAlert({title: '알림', message: '추가 미션을 완료해주세요.'});
  //   //     return;
  //   //   }
  //   // }
  // };


    // badgeService!
    //   .requestManualIssued(studentInfo.id, IssueState.Requested)
    //   .then(response => {
    //     if (response) {
    //       if (autoIssuedBadge) {
    //         setSuccessModal(!successModal);
    //         setChallengeState(ChallengeState.Issued);
    //       } else {
    //         setChallengeState(ChallengeState.Requested);
    //       }
    //       badgeStudentService!.findBadgeStudent(params.badgeId);
    //     } else {
    //       reactAlert({
    //         title: '요청 실패',
    //         message: '뱃지 발급 요청을 실패했습니다.',
    //       });
    //     }
    //   });

    // // if (autoIssuedBadge) {
    // //   // 자동발급 요청
    // //   onClickRequestAutoIssue();
    // // } else {
    // //   // 수동발급 요청
    // //   onClickRequestManualIssue();
    // // }




  // 발급요청 취소
  // const cancelRequestIssue = () => {
  //   // manager-front Certification관리 - 학습자관리 - 일괄취소 참조해서 작업해
  //   if (studentInfo === undefined) return;
  //   function cancelIssue() {
  //     badgeService!.cancelManualIssued(studentInfo!.id).then(res => {
  //       if (res) {
  //         setChallengeState(ChallengeState.Issued);
  //         badgeStudentService!.findBadgeStudent(params.badgeId);
  //       } else {
  //         reactAlert({
  //           title: '요청취소 실패',
  //           message: '뱃지 발급 요청취소를 실패했습니다.',
  //         });
  //       }
  //     });
  //   }
  //   reactConfirm({
  //     title: '',
  //     message: '뱃지발급 요청을 취소하시겠습니까?',
  //     onOk: () => cancelIssue(),
  //   });
  // };

  // // 자동발급
  // const onClickRequestAutoIssue = () => {
  //   //
  //   const List: any[] = [
  //     { id: studentInfo!.id, learningCompleted: true, issueState: 'Issued' },
  //   ];

  //   badgeService!.requestAutoIssued(List).then(response => {
  //     // 뱃지 발급 팝업 띄우기
  //     if (response) {
  //       setSuccessModal(!successModal);
  //       setChallengeState(ChallengeState.Issued);
  //     }
  //   });
  // };

  // // 수동발급 요청
  // const onClickRequestManualIssue = () => {
  //   //
  //   if (studentInfo && badge) {
  //     //
  //     const missionCompleted = studentInfo.missionCompleted;

  //     if (badge.acquisitionRequirements && !missionCompleted) {
  //       reactAlert({ title: '알림', message: '추가 미션을 완료해주세요.' });
  //       return;
  //     }

  //     badgeService!
  //       .requestManualIssued(studentInfo.id, IssueState.Requested)
  //       .then(response => {
  //         if (response) {
  //           setChallengeState(ChallengeState.Requested);
  //         } else {
  //           reactAlert({
  //             title: '요청 실패',
  //             message: '뱃지 발급 요청을 실패했습니다.',
  //           });
  //         }
  //       });
  //   }
  // };
