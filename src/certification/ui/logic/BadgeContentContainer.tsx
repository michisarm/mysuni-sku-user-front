import React, {useEffect, useState} from 'react';
import {Button, Icon, Label} from 'semantic-ui-react';
import {OverviewField} from 'personalcube';
import {Badge} from '../../shared/Badge';
import {BadgeContentHeader, BadgeInformation, BadgeTitle, BadgeOverview, BadgeStatus} from '../view/BadgeContentElementView';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeDetailModel from '../model/BadgeDetailModel';
import ChallengeCancelModal from './ChallengeCancelModal';
import ChallengeSuccessModal from './ChallengeSuccessModal';
// import BadgeLectureContainer from './BadgeLectureContainer';
import {studentData01, studentData02, studentData03} from '../../present/apiclient/studentData';
import IssueState from '../../shared/Badge/ui/model/IssueState';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';


export enum ChallengeDescription {
  WaitForChallenge= 'Badge획득에 도전 해보세요.',
  Challenging= '',
  ReadyForRequest= 'Badge획득 도전이 완료되었습니다.',
  Requested= '발급 요청',
  Issued= '획득',
}

interface Props {
  badgeDetail: BadgeDetailModel,
}

const BadgeContentContainer: React.FC<Props> = (Props) => {
  //
  const { badgeDetail } = Props;

  const [ cancelModal, setCancelModal ] = useState(false);
  const [ successModal, setSuccessModal ] = useState(false);

  const [ badgeState, setBadgeState ] = useState();


  useEffect( () => {
    // 페이지 진입 시 상태처리
    getBadgeState( studentData01.challengeState, studentData01.learningCompleted, studentData01.issueState);
  }, []);



  // 상태 정의
  const getBadgeState = (challengeState: string, learningCompleted: boolean, issueState: string) => {
    //
    if ( challengeState !== 'Challenged' ) {
      // 도전 대기 - 최초도전 or 도전취소
      setBadgeState(ChallengeState.WaitForChallenge);
    }

    if ( challengeState === 'Challenged' ) {
      if ( issueState === IssueState.Issued ) {
        // 획득 완료
        setBadgeState(ChallengeState.Issued);
      }
      if ( issueState === IssueState.Requested ) {
        // 발급요청중
        setBadgeState(ChallengeState.Requested);
      }
      if ( (issueState !== IssueState.Issued && issueState !== IssueState.Requested) && learningCompleted ) {
        // 발급요청가능
        setBadgeState(ChallengeState.ReadyForRequest);
      }
      if ( (issueState !== IssueState.Issued && issueState !== IssueState.Requested) && !learningCompleted ) {
        // 진행 중 => 도전취소 버튼 노출
        setBadgeState(ChallengeState.Challenging);
      }
    }
  };

  // 상태에 따른 버튼 이벤트
  const getAction = () => {
    switch( badgeState ) {
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


  /***********************************************************/
  // 도전하기 버튼 클릭
  const onClickChallenge = () => {
    //
    setBadgeState(ChallengeState.Challenging);

    // API 호출

  };

  // 도전취소 -> 안내모달
  const onChangeCancleModal = () => {
    setCancelModal(!cancelModal);
  };

  // 안내모달 - [취소] 클릭
  const onClickChallengeCancel = () => {

    // 도전 대기 상태
    setBadgeState(ChallengeState.WaitForChallenge);

    // API 호출 및 취소 처리

    // 모달 닫기
    setCancelModal(!cancelModal);
  };

  // 발급요청
  const onClickRequest = () => {
    // API 호출
    // 자동발급 뱃지일 경우 바로 발급
    console.log( 'auto Issued : ' + badgeDetail.autoIssued );
    const autoIssuedBadge  = badgeDetail.autoIssued;

    if ( autoIssuedBadge ) {
      // 뱃지 자동발급 요청 /api/badge/students/issue-state

      // 응답:success
      setSuccessModal(!successModal);

      // 획득완료
      setBadgeState(ChallengeState.Issued);


    } else {
      // 수동뱃지일 경우 추가발급조건 확인

      // 추가발급 조건 충족
      // 성공 후 상태 변경
      setBadgeState(ChallengeState.Requested);
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
          certiAdminCategoryName={badgeDetail.certiAdminCategory.certiAdminCategoryName}
          certiAdminSubCategoryName={badgeDetail.certiAdminSubcategory.certiAdminSubcategoryName}
          difficultyLevel={badgeDetail.difficultyLevel}
          learningTime={badgeDetail.learningTime}
        />
        {/*뱃지 상태*/}
        <BadgeStatus
          badgeState={badgeState}
          onClickButton={getAction}
          issueStateTime={studentData01.issueStateTime}
          description={ChallengeDescription[badgeState as ChallengeState]}
        />

        {/*도전 취소 확인 팝업*/}
        <ChallengeCancelModal cancelModal={cancelModal} onClickCancel={onChangeCancleModal} onAction={onClickChallengeCancel}/>

        {/*자동발급 뱃지 & 뱃지획득 시*/}
        <ChallengeSuccessModal badge={badgeDetail} successModal={successModal} onCloseSuccessModal={onControlSuccessModal}/>

      </BadgeContentHeader>



      {/*하단 - 그외 메타정보 및 학습 정보 */}
      <BadgeOverview>

        {/*설명 및 획득조건, 자격증명*/}
        <OverviewField.List>
          <OverviewField.Item
            title="인증내용"
            content={badgeDetail.description}
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
                {badgeDetail.badgeOperator.badgeOperatorName} ({badgeDetail.badgeOperator.badgeOperatorCompany})
                <Button icon className="right btn-blue">
                  문의하기
                  <Icon className="arrow-b-16"/>
                </Button>
              </div>
            }
          />
          { badgeDetail.additionTermsExist && (
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
            content="학습정보"
            // content={<BadgeLectureContainer/>}
          />
        </OverviewField.List>

        {/*태그*/}
        <OverviewField.List icon>
          <OverviewField.Item
            titleIcon="tag2"
            title="태그"
            content={
              badgeDetail.tags.map((tag:string, index:number) => (
                <Label as="span" className="tag" key={`label-tag-${index}`}>{tag}</Label>
              ))
            }
          />
        </OverviewField.List>

      </BadgeOverview>
    </>
  );
};

export default BadgeContentContainer;
