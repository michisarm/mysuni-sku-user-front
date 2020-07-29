import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon, Label } from 'semantic-ui-react';
import { OverviewField } from 'personalcube';
import { Badge } from '../../shared/Badge';
import {
  BadgeContentHeader,
  BadgeInformation,
  BadgeTitle,
  BadgeOverview,
  BadgeStatus,
} from '../view/BadgeContentElementView';
import BadgeLectureContainer from './BadgeLectureContainer';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeDetailModel from '../model/BadgeDetailModel';
import ChallengeCancelModal from './ChallengeCancelModal';
import ChallengeSuccessModal from './ChallengeSuccessModal';
import IssueState from '../../shared/Badge/ui/model/IssueState';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import BadgeLectureContainer2 from './BadgeLectureContainer2';
import BadgeStudentModel from '../model/BadgeStudentModel';
import {BadgeService} from '../../../lecture/stores';


export enum ChallengeDescription {
  WaitForChallenge = 'Badge획득에 도전 해보세요.',
  Challenging = '',
  ReadyForRequest = 'Badge획득 도전이 완료되었습니다.',
  Requested = '발급 요청',
  Issued = '획득',
}

interface Props extends RouteComponentProps {
  badgeService?: BadgeService,

  badgeId: string,
  badgeDetail: BadgeDetailModel,
}

const BadgeContentContainer: React.FC<Props> = Props => {
  //
  const { badgeService, badgeId, badgeDetail } = Props;

  const [cancelModal, setCancelModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [badgeState, setBadgeState] = useState();
  const [studentInfo, setStudentInfo] = useState<BadgeStudentModel>();


  // 테스트 용
  const [learningCount, plusLearningCount] = useState(0);

  // 학습 카운트 정보
  const LEARNING_TOTAL_COUNT = 9;

  useEffect(() => {
    // 수강정보 조회
    findBadgeStudent(badgeId);

  }, []);

  // 뱃지에 대한 수강정보 호출 (박팀장 확인 필요)
  const findBadgeStudent = async (badgeId: string) => {
    //
    const badgeStudentInfo: BadgeStudentModel | null = await badgeService!.findBadgeStudentInfo(badgeId);

    if (badgeStudentInfo === null) {
      setBadgeState(ChallengeState.WaitForChallenge);
    }
    else {
      setStudentInfo(badgeStudentInfo);
      // 수강 정보 조합 => Badge 상태
      getBadgeState(
        badgeStudentInfo.challengeState,
        badgeStudentInfo.learningCompleted,
        badgeStudentInfo.issueState
      );
    }
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
        // 진행 중 => 도전취소 버튼 노출
        setBadgeState(ChallengeState.Challenging);
      }
    }
  };

  // 상태에 따른 버튼 이벤트
  const getAction = () => {
    switch (badgeState) {
      case ChallengeState.WaitForChallenge:
        onClickChallenge();
        break;
      case ChallengeState.Challenging:
        onChangeCancleModal();
        break;
      case ChallengeState.ReadyForRequest:
        onClickRequest();
        break;
    }
  };

  /* Button Actions */

  // 도전하기 버튼 클릭
  const onClickChallenge = () => {
    //
    console.log( studentInfo );

    // StudentInfo 조회 API 호출

    // if ( badgeStudentInfo.challengeState !== 'Challenged' ) {
    //
    //   // API 호출, 미도전 -> 도전으로 변경
    //   badgeService!.challengeBadge(
    //     badgeStudentInfo.studentInfo, badgeStudentInfo.badgeId, badgeStudentInfo.challengeState
    //   ).then( (response) => {
    //
    //     console.log( response );
    //
    //     // 성공
    //     setBadgeState(ChallengeState.Challenging);
    //
    //   });
    // }
  };

  // 도전취소 -> 안내모달
  const onChangeCancleModal = () => {
    setCancelModal(!cancelModal);
  };

  // 도전 취소 하기
  const onClickChallengeCancel = () => {

    console.log( studentInfo );

    if (studentInfo) {
      badgeService!.cancelChallengeBadge(studentInfo.id)
        .then((response) => {
          console.log(response);
          // 도전 대기 상태
          setBadgeState(ChallengeState.WaitForChallenge);
        }).then(() => {
          // 모달 닫기
          setCancelModal(!cancelModal);
        });
    }
  };

  // 샘플 - 학습하기
  const learningDoIt = () => {
    if (LEARNING_TOTAL_COUNT === learningCount) {
      setBadgeState(ChallengeState.ReadyForRequest);

      // 학습완료 상태 만들기
    } else {
      plusLearningCount(learningCount + 1);
    }
  };

  // 발급요청
  const onClickRequest = () => {
    // API 호출
    // 자동발급 뱃지일 경우 바로 발급
    const autoIssuedBadge = badgeDetail.autoIssued;
    console.log(`자동발급 : ${autoIssuedBadge}`);

    if (autoIssuedBadge) {
      // 뱃지 자동발급 요청
      badgeService!.requestAutoIssued().then(() => {
        // 응답:success
        setSuccessModal(!successModal);
        // 획득완료
        setBadgeState(ChallengeState.Issued);
      });
    } else {
      // 수동뱃지일 경우 추가발급조건 확인
      // const missionCompleted = badgeStudentInfo.missionCompleted;
      //
      // if ( missionCompleted ) {
      //   // 발급요청
      //   setBadgeState(ChallengeState.Requested);
      // }
    }
  };

  // 성공 모달 닫기
  const onControlSuccessModal = () => {
    setSuccessModal(!successModal);
  };

  //
  return (
    <>
      {/*상단*/}
      <BadgeContentHeader>
        {/*뱃지 정보 및 디자인*/}
        <Badge
          badge={badgeDetail}
          badgeStyle={BadgeStyle.Detail}
          badgeSize={BadgeSize.Large}
        />
        {/*뱃지 타이틀*/}
        <BadgeTitle
          college={badgeDetail.mainCategoryName}
          name={badgeDetail.name}
        />
        {/*뱃지 메타정보1*/}
        <BadgeInformation
          certiAdminCategoryName={
            badgeDetail.certiAdminCategory.certiAdminCategoryName
          }
          certiAdminSubCategoryName={
            badgeDetail.certiAdminSubcategory.certiAdminSubcategoryName
          }
          difficultyLevel={badgeDetail.difficultyLevel}
          learningTime={badgeDetail.learningTime}
        />
        {/*뱃지 상태*/}
        <BadgeStatus
          badgeState={badgeState}
          onClickButton={getAction}
          issueStateTime={studentInfo?.issueStateTime}
          description={ChallengeDescription[badgeState as ChallengeState]}
          learningTotalCount={LEARNING_TOTAL_COUNT}
          learningCompleted={learningCount}
          onClickSample={learningDoIt}
        />

        {/*도전 취소 확인 팝업*/}
        <ChallengeCancelModal
          cancelModal={cancelModal}
          onClickCancel={onChangeCancleModal}
          onAction={onClickChallengeCancel}
        />

        {/*자동발급 뱃지 & 뱃지획득 시*/}
        <ChallengeSuccessModal
          badge={badgeDetail}
          successModal={successModal}
          onCloseSuccessModal={onControlSuccessModal}
        />
      </BadgeContentHeader>

      {/*하단 - 그외 메타정보 및 학습 정보 */}
      <BadgeOverview>
        {/*설명 및 획득조건, 자격증명*/}
        <OverviewField.List>
          <OverviewField.Item
            title="인증내용"
            contentHtml={badgeDetail.description}
          />
          <OverviewField.Item
            title="획득 조건"
            content={badgeDetail.obtainTerms}
          />
          <OverviewField.Item
            title="자격증명"
            content={badgeDetail.qualification}
          />
        </OverviewField.List>

        {/*담당자 & 추가발급조건*/}
        <OverviewField.List icon>
          <OverviewField.Item
            titleIcon="host"
            title="담당자"
            content={
              <div className="host-line">
                {badgeDetail.badgeOperator.badgeOperatorName} (
                {badgeDetail.badgeOperator.badgeOperatorCompany})
                <Button icon className="right btn-blue">
                  문의하기
                  <Icon className="arrow-b-16" />
                </Button>
              </div>
            }
          />
          {badgeDetail.additionTermsExist && (
            <OverviewField.Item
              titleIcon="addinfo"
              title="추가 발급 조건"
              content="v0.1 API에 관련 내용 없음. 추가발급 여부만 있음 boolean"
            />
          )}
        </OverviewField.List>

        {/*학습정보*/}
        <OverviewField.List icon>
          <OverviewField.Item
            titleIcon="list24"
            title="Learning Path"
            //content="학습정보"
            // content={<BadgeLectureContainer2 />}
            content={<BadgeLectureContainer badgeId={badgeId} />}
          />
        </OverviewField.List>

        {/*태그*/}
        <OverviewField.List icon>
          <OverviewField.Item
            titleIcon="tag2"
            title="태그"
            content={
              <Label as="span" className="tag">
                {badgeDetail.tags}
              </Label>
            }
          />
        </OverviewField.List>
      </BadgeOverview>
    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(
  withRouter(observer(BadgeContentContainer))
);
