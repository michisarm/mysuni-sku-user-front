import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import defaultProfileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { Button, Icon } from 'semantic-ui-react';
import { SkProfileService } from 'profile/stores';
import { MyLearningSummaryService, MyTrainingService } from 'myTraining/stores';
import { BadgeService } from 'lecture/stores';
import {
  HeaderWrapperView,
  AdditionalToolsMyLearning,
} from './MyLearningSummaryElementsView';
import { ChannelModel } from '../../../college/model';
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
import { FavoriteChannelChangeModal } from 'shared';
import LearningObjectivesContainer from '../PersonalBoard/ui/logic/LearningObjectivesContainer';
import {
  requestLearningObjectives,
  saveLearningObjectives,
} from '../PersonalBoard/service/useLearningObjectives';
import LearningObjectives from '../PersonalBoard/viewModel/LearningObjectives';
import AttendanceModalContainer from '../PersonalBoard/ui/logic/AttendanceModalContainer';
import { timeToHourMinute } from '../../../shared/helper/dateTimeHelper';
import LearningTimeSummaryView from './LearningTimeSummaryView';
import BadgeLearningSummaryView from './BadgeLearningSummaryView';
import LearningCompleteSummaryView from './LearningCompleteSummaryView';
import { Action, Area } from 'tracker/model';
import Image from '../../../shared/components/Image';
import { getAttendEventItem } from '../PersonalBoard/store/EventStore';
import { requestAttendEvent } from '../PersonalBoard/service/getAttendEvent';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

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
  learningObjectives?: LearningObjectives;
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
    learningObjectives: {
      AnnualLearningObjectives: 0,
      WeekAttendanceGoal: 0,
      DailyLearningTimeHour: 0,
      DailyLearningTimeMinute: 0,
    },
  };

  componentDidMount(): void {
    this.init();
    requestAttendEvent();
    onLearningObjectivesItem(
      (next) => this.setState({ learningObjectives: next }),
      'MyLearningSummaryContainer'
    );
  }

  handleOpenBtnClick = (e: any, data: any) => {
    const { index } = data;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  init() {
    const { skProfileService, myTrainingService } = this.props;
    skProfileService!.findStudySummary();
    this.requestMyLearningSummary();
    this.requestMenuAuth();
    myTrainingService!.findLearningCount();
  }

  requestMyLearningSummary() {
    const { myLearningSummaryService, badgeService } = this.props;
    const currentYear = moment().year();

    myLearningSummaryService!.findMyLearningSummaryByYear(currentYear);
    myLearningSummaryService!.findLectureTimeSummary();
    badgeService!.findAllBadgeCount();
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

  render() {
    const {
      learningObjectivesOpen,
      attendanceOpen,
      activeIndex,
      learningObjectives,
    } = this.state;
    const {
      myLearningSummaryService,
      skProfileService,
      myTrainingService,
      badgeService,
      menuControlAuthService,
    } = this.props;
    const { skProfile, additionalUserInfo } = skProfileService!;
    const { menuControlAuth } = menuControlAuthService!;
    const { myLearningSummary, lectureTimeSummary } = myLearningSummaryService!;
    const { personalBoardInprogressCount, personalBoardCompletedCount } =
      myTrainingService!;
    const {
      allBadgeCount: { issuedCount, challengingCount },
    } = badgeService!;
    const favoriteChannels = additionalUserInfo.favoriteChannelIds;

    const sumOfCurrentYearLectureTime =
      (lectureTimeSummary && lectureTimeSummary.sumOfCurrentYearLectureTime) ||
      0;
    const totalLectureTime =
      (lectureTimeSummary && lectureTimeSummary.totalLectureTime) || 0;

    const totalLearningTime =
      myLearningSummary.suniLearningTime +
      myLearningSummary.myCompanyLearningTime +
      myLearningSummary.aplAllowTime +
      sumOfCurrentYearLectureTime;
    const totalAccruedLearningTime =
      myLearningSummary.totalSuniLearningTime +
      myLearningSummary.totalMyCompanyLearningTime +
      myLearningSummary.totalAplAllowTime +
      totalLectureTime;

    const { hour: accruedHour, minute: accruedMinute } = timeToHourMinute(
      totalAccruedLearningTime
    );

    const badgeLearningTime = getBadgeLearningTimeItem();
    if (badgeLearningTime !== undefined) {
      setBadgeLearningTimeItem({
        ...badgeLearningTime,
        mylearningTimeHour: accruedHour,
        mylearningTimeMinute: accruedMinute,
      });
    }

    const attendEventItem = getAttendEventItem();

    return (
      <>
        <HeaderWrapperView>
          <div className="ui profile inline">
            <div className="pic s60">
              <Image
                src={skProfile.photoFilePath || defaultProfileImg}
                alt="프로필사진"
              />
            </div>
          </div>
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
          <div className="main-gauge-box">
            <BadgeLearningSummaryView
              challengingCount={challengingCount}
              issuedCount={issuedCount}
            />
            <LearningCompleteSummaryView
              completeLectureCount={myLearningSummary.completeLectureCount}
              personalBoardInprogressCount={personalBoardInprogressCount}
              personalBoardCompletedCount={personalBoardCompletedCount}
            />
            <LearningTimeSummaryView
              totalLearningTime={totalLearningTime}
              totalAccrueLearningTime={totalAccruedLearningTime}
              learningObjectives={learningObjectives}
            />
          </div>
          <LearningObjectivesContainer
            openLearningObjectives={this.openLearningObjectives}
          />
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
          <AdditionalToolsMyLearning
            onClickQnA={this.moveToSupportQnA}
            handleClick={this.handleOpenBtnClick}
            activeIndex={activeIndex}
            companyCode={skProfile.companyCode}
          >
            <FavoriteChannelChangeModal
              trigger={
                <a>
                  <Icon className="channel24" />
                  <span>
                    <PolyglotText
                      defaultString="관심 채널 설정"
                      id="home-PersonalBoard-관심채널"
                    />
                  </span>
                </a>
              }
              favorites={favoriteChannels}
              onConfirmCallback={this.onConfirmFavorite}
            />
            {menuControlAuth.useApl === true && (
              <div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    this.onClickCreateApl();
                  }}
                >
                  <Icon className="add24" />
                  <span>
                    <PolyglotText
                      defaultString="개인학습"
                      id="home-PersonalBoard-개인학습"
                    />
                  </span>
                </a>
              </div>
            )}
          </AdditionalToolsMyLearning>
        )}
        <div className="main-learning-link sty2" data-area={Area.MAIN_INFO}>
          <div className="inner">
            <div className="left">
              <div>
                <FavoriteChannelChangeModal
                  trigger={
                    <a>
                      <Icon className="channel25" />
                      <span
                        data-area={Area.MAIN_INFO}
                        data-action={Action.VIEW}
                        data-action-name="관심 채널 설정 PV"
                        data-pathname="관심 채널 설정"
                        data-page="#attention-channel"
                      >
                        <PolyglotText
                          defaultString="관심 채널 설정"
                          id="home-PersonalBoard-관심채널2"
                        />
                      </span>
                    </a>
                  }
                  favorites={favoriteChannels}
                  onConfirmCallback={this.onConfirmFavorite}
                />
              </div>
              {menuControlAuth.useApl === true && (
                <div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.onClickCreateApl();
                    }}
                  >
                    <Icon className="card-main24" />
                    <span>
                      <PolyglotText
                        defaultString="개인학습"
                        id="home-PersonalBoard-개인학습2"
                      />
                    </span>
                  </a>
                </div>
              )}
            </div>
            <div className="right">
              <a onClick={this.moveToSupportQnA} className="contact-us wh">
                <span>
                  <PolyglotText
                    defaultString="1:1 문의하기"
                    id="home-PersonalBoard-1대1"
                  />
                </span>
                <Icon className="arrow-w-16" />
              </a>
            </div>
          </div>
        </div>
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
        <AttendanceModalContainer
          open={attendanceOpen}
          setOpen={(value, type?) => {
            return this.setState({ attendanceOpen: value });
          }}
        />
      </>
    );
  }
}

export default withRouter(MyLearningSummaryContainer);
