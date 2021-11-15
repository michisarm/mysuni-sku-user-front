import React, { Component, createRef, MouseEvent } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
import { SkProfileService } from 'profile/stores';
import { MyLearningSummaryService, MyTrainingService } from 'myTraining/stores';
import { BadgeService } from 'lecture/stores';
import { HeaderWrapperView } from './MyLearningSummaryElementsView';
import mainRoutePaths from '../../routePaths';
import lectureRoutePaths from '../../../lecture/routePaths';
import supportRoutePaths from '../../../board/routePaths';
import MenuControlAuthService from '../../../approval/company/present/logic/MenuControlAuthService';
import SkProfileModel from '../../../profile/model/SkProfileModel';
import LearningObjectivesModalContainer from '../PersonalBoard/ui/logic/LearningObjectivesModalContainer';
import {
  getBadgeLearningTimeItem,
  onLearningObjectivesItem,
  setBadgeLearningTimeItem,
} from '../PersonalBoard/store/PersonalBoardStore';
import DashBoardSentenceContainer from 'layout/ContentHeader/sub/DashBoardSentence/ui/logic/DashBoardSentenceContainer';
import LearningObjectivesContainer from '../PersonalBoard/ui/logic/LearningObjectivesContainer';
import {
  requestLearningObjectives,
  saveLearningObjectives,
} from '../PersonalBoard/service/useLearningObjectives';
import LearningObjectives from '../PersonalBoard/viewModel/LearningObjectives';
import AttendanceModalContainer from '../PersonalBoard/ui/logic/AttendanceModalContainer';
import { timeToHourMinute } from '../../../shared/helper/dateTimeHelper';
import { getAttendEventItem } from '../PersonalBoard/store/EventStore';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { InProgressLearning } from './InProgressLearning';
import { PersonalBoardContainer } from '../PersonalBoard/ui/logic/PersonalBoardContainer';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  myLearningSummaryService?: MyLearningSummaryService;
  menuControlAuthService?: MenuControlAuthService;
  myTrainingService?: MyTrainingService;
  badgeService?: BadgeService;
}

interface States {
  learningObjectivesOpen: boolean;
  attendanceOpen: boolean;
  activeIndex: any;
  isPersonalBoardContainerVisible: boolean;
}

@inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myLearningSummaryService',
    'myTraining.myTrainingService',
    'badge.badgeService',
    'approval.menuControlAuthService'
  )
)
@observer
@reactAutobind
class MyLearningSummaryContainer extends Component<Props, States> {
  state = {
    learningObjectivesOpen: false,
    attendanceOpen: false,
    activeIndex: -1,
    isPersonalBoardContainerVisible: false,
  };

  personalBoardContainer = createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.init();
    requestLearningObjectives();
    window.addEventListener('click', this.hidePersonalBoardContainer);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hidePersonalBoardContainer);
  }

  handleOpenBtnClick = (e: any, data: any) => {
    const { index } = data;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  hidePersonalBoardContainer(event: any) {
    if (this.state.isPersonalBoardContainerVisible === false) {
      return;
    }
    if (this.personalBoardContainer.current !== null) {
      if (!this.personalBoardContainer.current.contains(event.target)) {
        this.setState({ isPersonalBoardContainerVisible: false });
      }
    }
  }

  init() {
    this.requestMyLearningSummary();
    this.requestMenuAuth();
  }

  requestMyLearningSummary() {
    const { myLearningSummaryService } = this.props;
    myLearningSummaryService!.findLectureTimeSummary();
    myLearningSummaryService!.findInstructTimeSummary();
    // badgeService!.findAllBadgeCount();
  }

  async requestMenuAuth() {
    const { skProfileService, menuControlAuthService } = this.props;
    const foundProfile: SkProfileModel =
      await skProfileService!.findSkProfile();
    if (foundProfile) {
      menuControlAuthService!.findMenuControlAuth();
    }
  }

  onConfirmFavorite() {
    const { location, history } = this.props;
    const { pathname } = location;

    if (pathname.startsWith(`${mainRoutePaths.main()}pages`)) {
      history.replace(mainRoutePaths.main());
    } else if (pathname.startsWith(`${lectureRoutePaths.recommend()}/pages`)) {
      history.replace(lectureRoutePaths.recommend());
    }
  }

  moveToSupportQnA() {
    const { history } = this.props;
    history.push(supportRoutePaths.supportQnANewPost());
  }

  onClickCreateApl() {
    this.props.history.push('/my-training/apl/create');
  }

  openLearningObjectives() {
    saveLearningObjectives();

    this.setState((prevState) => {
      return { learningObjectivesOpen: !prevState.learningObjectivesOpen };
    });
  }

  handlePopup() {
    this.setState((prevState) => {
      return { attendanceOpen: !prevState.attendanceOpen };
    });
  }

  goToBadge() {
    const { history } = this.props;
    history.push('/certification/badge/EarnedBadgeList/pages/1');
  }

  showPersonalBoardContainer(event: MouseEvent<HTMLButtonElement>) {
    this.setState({ isPersonalBoardContainerVisible: true });
    event.stopPropagation();
  }

  render() {
    const {
      learningObjectivesOpen,
      attendanceOpen,
      isPersonalBoardContainerVisible,
    } = this.state;
    const { myLearningSummaryService, skProfileService } = this.props;
    const { skProfile } = skProfileService!;
    const { myLearningSummary, lectureTimeSummary } = myLearningSummaryService!;

    const totalLectureTime =
      (lectureTimeSummary && lectureTimeSummary.totalLectureTime) || 0;

    // 21-11-12 김민준 learning page 개선
    // const totalAccruedLearningTime =
    //   myLearningSummary.totalSuniLearningTime +
    //   myLearningSummary.totalMyCompanyLearningTime +
    //   myLearningSummary.totalAplAllowTime +
    //   totalLectureTime;

    // const { hour: accruedHour, minute: accruedMinute } = timeToHourMinute(
    //   totalAccruedLearningTime
    // );

    // const badgeLearningTime = getBadgeLearningTimeItem();
    // if (badgeLearningTime !== undefined) {
    //   setBadgeLearningTimeItem({
    //     ...badgeLearningTime,
    //     mylearningTimeHour: accruedHour,
    //     mylearningTimeMinute: accruedMinute,
    //   });
    // }

    const attendEventItem = getAttendEventItem();
    return (
      <>
        <HeaderWrapperView>
          <div className="main_left">
            <div className="personal-header-title">
              <h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      '{profileViewName} 님',
                      'home-Summary-님',
                      { profileViewName: skProfile.profileViewName }
                    ),
                  }}
                />
              </h3>
              <DashBoardSentenceContainer />
            </div>
            <LearningObjectivesContainer
              openLearningObjectives={this.openLearningObjectives}
            />
            <LearningObjectivesModalContainer
              open={learningObjectivesOpen}
              setOpen={(value, type?) => {
                if (type === undefined || type !== 'save') {
                  requestLearningObjectives();
                } else {
                  reactAlert({
                    title: '',
                    // message: `목표 설정이 완료됐습니다.`,
                    message: getPolyglotText(
                      '목표 설정이 완료됐습니다.',
                      'home-PersonalBoard-complete'
                    ),
                  });
                }
                return this.setState({ learningObjectivesOpen: value });
              }}
            />
            <div className="personal-info-go">
              <button
                className="ui icon button info-std"
                onClick={this.showPersonalBoardContainer}
              >
                <i aria-hidden="true" className="icon std" />
                <PolyglotText
                  id="main-personal"
                  defaultString="나의 학습현황 보기"
                />
              </button>
            </div>
          </div>
          <div className="main_right">
            <div className="main-std-media">
              <InProgressLearning />
            </div>
          </div>
          {attendEventItem?.useYn === true && (
            <div className="main-event-btn2">
              <Button type="button" onClick={this.handlePopup}>
                <img
                  style={{ width: '100%' }}
                  src="https://image.mysuni.sk.com/suni-asset/public/static/media/BNR_Summer_Event.gif"
                  alt="다시 돌아온 출석이벤트"
                />
              </Button>
            </div>
          )}
        </HeaderWrapperView>

        {skProfile.companyCode && (
          <div ref={this.personalBoardContainer}>
            <PersonalBoardContainer
              companyCode={skProfile.companyCode}
              isVisible={isPersonalBoardContainerVisible}
              close={() =>
                this.setState({ isPersonalBoardContainerVisible: false })
              }
            />
          </div>
        )}

        <AttendanceModalContainer
          open={attendanceOpen}
          setOpen={(value) => {
            return this.setState({ attendanceOpen: value });
          }}
        />
      </>
    );
  }
}

export default withRouter(MyLearningSummaryContainer);
