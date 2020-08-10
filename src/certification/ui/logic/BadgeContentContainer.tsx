import React, {useEffect, useRef, useState} from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon, Label } from 'semantic-ui-react';
import { OverviewField } from 'personalcube';
import { SkProfileService } from 'profile/stores';
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
import BadgeStudentModel from '../model/BadgeStudentModel';
import {BadgeService} from '../../../lecture/stores';
import boardRoutePaths from '../../../board/routePaths';
import BadgeCompModel from '../model/BadgeCompModel';
import BadgeCompData from '../model/BadgeCompData';
import BadgeCourseData from '../model/BadgeCourseData';
import BadgeCubeData from '../model/BadgeCubeData';


export enum ChallengeDescription {
  None = 'none',
  WaitForChallenge = 'Badge획득에 도전 해보세요.',
  Challenging = '',
  ReadyForRequest = 'Badge획득 도전이 완료되었습니다.',
  Requested = '발급 요청',
  Issued = '획득',
  Challenged = '도전시작',
  Canceled = '도전취소',
}

interface Props extends RouteComponentProps {
  badgeService?: BadgeService,
  skProfileService?: SkProfileService,

  badgeId: string,
  badgeDetail: BadgeDetailModel,
}

const BadgeContentContainer: React.FC<Props> = Props => {
  //
  const { badgeService, skProfileService, badgeId, badgeDetail, history } = Props;

  const [cancelModal, setCancelModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [badgeCompList, setBadgeCompList] = useState<BadgeCompData[]>([]);
  const [badgeState, setBadgeState] = useState();

  // 뱃지 수강 정보
  const [studentInfo, setStudentInfo] = useState<BadgeStudentModel>();

  // 학습 카운트 정보
  const [learningCount, setLearningCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);

  useEffect(() => {

    // 구성학습 정보 조회
    findBadgeLearningInfo(badgeId);

  }, []);

  useEffect(() => {

    if (learningCount > 0) {
      // 수강정보 조회
      findBadgeStudent(badgeId);
    }

  }, [badgeId, learningCount]);

  // 뱃지에 대한 수강정보 호출
  const findBadgeStudent = async (badgeId: string) => {
    //
    await badgeService!.findBadgeStudentInfo(badgeId)
      .then((response: BadgeStudentModel | null) => {
        if (response === null) {
          setBadgeState(ChallengeState.WaitForChallenge);
        }
        else {
          setStudentInfo(response);
          // 수강 정보 조합 => Badge 상태
          getBadgeState(
            response.challengeState,
            response.learningCompleted,
            response.issueState
          );
        }
      });
  };

  // 뱃지 구성 학습 리스트 조회하기
  const findBadgeLearningInfo = async (badgeId: string) => {
    //
    const components: BadgeCompModel[] = await badgeService!.findBadgeComposition(badgeId);

    let compList: BadgeCompData[] = [];
    let passCount = 0;
    if (components.length > 0 && components[0] ) {
      components.map((data: BadgeCompModel) => {
        // 학습완료 카운트
        if (data.learningState === 'Passed') {
          passCount++;
        }

        const compData = new BadgeCompData();
        //console.log( data );
        // 공통
        compData.compType = data.serviceType;
        compData.id = data.id;
        compData.patronKeyString = data.patronKey.keyString;
        // 코스정보
        if (data.serviceType === 'COURSE') {
          compData.course = new BadgeCourseData();
          const keyStr = data.patronKey.keyString;
          compData.course.cineroomId = keyStr.substring(keyStr.indexOf('@') + 1);
          compData.course.collegeId = data.category.college.id;
          compData.course.serviceId = data.serviceId;
          compData.course.name = data.name;
          compData.course.coursePlanId = data.coursePlanId;
          compData.course.isOpened = false;
          compData.course.cubeCount = data.lectureCardUsids.length;
          compData.course.learningState = data.learningState;
          compData.course.serviceType = 'Course';
          data.lectureCardUsids.map((id: string) => {
            compData.course!.lectureCardIds = compData.course!.lectureCardIds.concat(id);
          });
        }
        // (학습)카드 정보
        else {
          compData.cube = new BadgeCubeData();
          const keyStr = data.patronKey.keyString;
          compData.cube.cineroomId = keyStr.substring(keyStr.indexOf('@') + 1);
          compData.cube.collegeId = data.category.college.id;
          compData.cube.lectureCardId = data.serviceId;
          compData.cube.name = data.name;
          compData.cube.cubeId = data.cubeId;
          compData.cube.learningCardId = data.learningCardId;
          compData.cube.cubeType = data.cubeType;
          compData.cube.learningTime = data.learningTime; // 학습시간(분)
          compData.cube.sumViewSeconds = data.sumViewSeconds; // 진행율(%)
          compData.cube.learningState = data.learningState;
          compData.cube.serviceType = 'cube';
        }
        compList = compList.concat(compData);
      });
    }
    setBadgeCompList(compList);

    setPassedCount(passCount);
    setLearningCount(components.length);

    // 학습 진행률이 100% 인 경우, 발급요청 상태로 변경
    // learningCompleted를 사용하지 않는 이유: Learning Path의 모든 학습의 완료 시점을 알기 힘듬. 학습하기 -> 학습완료로 변경 시점에 모든 cube, course, badge를 다뒤져야 하는 상황
    // 내일 협의 후 결정
    // 발급 요청 버튼 클릭 시 learningCompleted: true (이수처리) 필요 할 수 있음
    // if ( cnt === badgeLearningInfo.length ) {
    //   setBadgeState(ChallengeState.ReadyForRequest);
    // }
  };

  const getBadgeState = (
    challengeState: string,
    learningCompleted: boolean,
    issueState: string
  ) => {
    //
    if (learningCount < 1) return;

    if (challengeState !== 'Challenged') {
      // 도전 대기 - 최초도전 or 도전취소
      setBadgeState(ChallengeState.WaitForChallenge);
    }
    else {  //if (challengeState === 'Challenged') {
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

        if ( /*badgeDetail.autoIssued && */learningCount > 0 && learningCount === passedCount ) {
          setBadgeState(ChallengeState.ReadyForRequest);
        } else {
          // 진행 중 => 도전취소 버튼 노출
          setBadgeState(ChallengeState.Challenging);
        }
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
    const { name, email, company, department } = skProfileService!.skProfile.member;

    const myStudentInfo = {
      name,
      email,
      company,
      department,
    };

    // 재도전시 badgeStudentId 사용
    const retryBadgeStudentId = ( studentInfo !== undefined ) ? studentInfo.id : null;

    badgeService!.challengeBadge(retryBadgeStudentId, myStudentInfo, badgeId, ChallengeState.Challenged)
      .then( (response) => {
        if ( response ) {
          findBadgeStudent(badgeId);
          //setBadgeState(ChallengeState.Challenging);
        }
      });
  };

  // 도전취소 -> 안내모달
  const onChangeCancleModal = () => {
    setCancelModal(!cancelModal);
  };

  // 도전 취소 하기
  const onClickChallengeCancel = () => {
    //
    if (studentInfo) {
      badgeService!.cancelChallengeBadge(studentInfo.id, ChallengeState.Canceled)
        .then((response) => {
          if ( response ) {
            setBadgeState(ChallengeState.WaitForChallenge);
            findBadgeStudent(badgeId);
          } else {
            reactAlert({title: '도전 취소 실패', message: '도전을 취소하지 못하였습니다.'});
          }
        }).then( () => {
          setCancelModal(!cancelModal);
        });
    }
  };

  // 발급요청
  const onClickRequest = () => {
    //
    if ( studentInfo === undefined ) return;

    const autoIssuedBadge = badgeDetail.autoIssued;
    const missionCompleted = studentInfo.missionCompleted;

    // 수동발급 뱃지 & 추가미션 미완료
    if (!autoIssuedBadge ) {
      if (badgeDetail.additionTermsExist && !missionCompleted ) {
        reactAlert({title: '알림', message: '추가 미션을 완료해주세요.'});
        return;
      }
    }

    badgeService!.requestManualIssued(studentInfo.id, IssueState.Requested)
      .then((response) => {
        if ( response ) {
          if ( autoIssuedBadge ) {
            setSuccessModal(!successModal);
            setBadgeState(IssueState.Issued);
          } else {
            setBadgeState(ChallengeState.Requested);
          }
          findBadgeStudent(badgeId);
        } else {
          reactAlert({title:'요청 실패', message: '뱃지 발급 요청을 실패했습니다.'});
        }
      });

    // if (autoIssuedBadge) {
    //   // 자동발급 요청
    //   onClickRequestAutoIssue();
    // } else {
    //   // 수동발급 요청
    //   onClickRequestManualIssue();
    // }

  };

  // 자동발급
  const onClickRequestAutoIssue = () => {
    //
    const List: any[] = [{ id: studentInfo!.id, learningCompleted: true, issueState: 'Issued'}];

    badgeService!.requestAutoIssued(List).then((response) => {

      // 뱃지 발급 팝업 띄우기
      if ( response ) {
        setSuccessModal(!successModal);
        setBadgeState(IssueState.Issued);
      }
    });
  };

  // 수동발급 요청
  const onClickRequestManualIssue = () => {
    //
    if ( studentInfo ) {
      //
      const missionCompleted = studentInfo.missionCompleted;

      if ( badgeDetail.additionTermsExist && !missionCompleted ) {
        reactAlert({title: '알림', message: '추가 미션을 완료해주세요.'});
        return;
      }

      badgeService!.requestManualIssued(studentInfo.id, IssueState.Requested)
        .then((response) => {
          if ( response ) {
            setBadgeState(ChallengeState.Requested);
          } else {
            reactAlert({title:'요청 실패', message: '뱃지 발급 요청을 실패했습니다.'});
          }
        });
    }
  };

  // 성공 모달 닫기
  const onControlSuccessModal = () => {
    setSuccessModal(!successModal);
  };

  // tag list
  const getTagsList = (tags: string) => {
    //
    let tagList = new Array();
    let tagHtml = '';

    if ( tags.indexOf(',') !== -1 ) {
      tagList = tags.split(',');
    } else {
      tagList.push(tags);
    }

    tagList.map((tag, index) => {
      if ( tag !== '' ) {
        tagHtml += '<span class="ui label tag" id="tag-' + index + '">' + tag + '</span>';
      }
    });

    return tagHtml;
  };

  const onClickSupport = () => {
    // Q&A 작성 화면으로 이동
    history.push( boardRoutePaths.supportQnANewPost() );
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
          designAdminName={
            badgeDetail.designAdmin.designAdminName
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
          learningTotalCount={learningCount}
          learningCompleted={passedCount}
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
                <Button icon className="right btn-blue" onClick={onClickSupport}>
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
              contentHtml="해당 Badge는 학습 이수 외에도 추가 미션이 있습니다.<br/>학습 이수 완료 후, 발급 요청하시면 담당자가 추가 미션에 대해 안내 드릴 예정입니다."
            />
          )}
        </OverviewField.List>

        {/*학습정보*/}
        <OverviewField.List icon className="course-area">
          <OverviewField.Item
            titleIcon="list24"
            title="Learning Path"
            //content="학습정보"
            content={
              <BadgeLectureContainer
                badgeId={badgeId}
                badgeCompList={badgeCompList}
              />}
          />
        </OverviewField.List>

        {/*태그*/}
        <OverviewField.List icon>
          <OverviewField.Item
            titleIcon="tag2"
            title="태그"
            contentHtml={getTagsList(badgeDetail.tags)}
          />
        </OverviewField.List>
      </BadgeOverview>
    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
  'profile.skProfileService',
))(
  withRouter(observer(BadgeContentContainer))
);
