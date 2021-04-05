import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import myTrainingRoutePaths from 'myTraining/routePaths';
import certificationRoutePaths from 'certification/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { Icon, Image, Popup } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
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
import { MenuControlAuth } from 'shared/model/MenuControlAuth';
import LearningObjectivesContainer from '../PersonalBoard/ui/logic/LearningObjectivesContainer';
import {
  requestLearningObjectives,
  saveLearningObjectives,
} from '../PersonalBoard/service/useLearningObjectives';
import LearningObjectives from '../PersonalBoard/viewModel/LearningObjectives';
import AttendanceModalContainer from '../PersonalBoard/ui/logic/AttendanceModalContainer';
import { Type, AreaType } from 'tracker/model';

interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService;
  skProfileService?: SkProfileService;
  myLearningSummaryService?: MyLearningSummaryService;
  menuControlAuthService?: MenuControlAuthService;
  myTrainingService?: MyTrainingService;
  badgeService?: BadgeService;
}

interface States {
  boardVisible: boolean;
  learningObjectivesOpen: boolean;
  attendanceOpen: boolean;
  companyCode: string;
  activeIndex: any;
  learningObjectives?: LearningObjectives;
}

@inject(
  mobxHelper.injectFrom(
    'shared.actionLogService',
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
    boardVisible: false,
    learningObjectivesOpen: false,
    attendanceOpen: false,
    companyCode: '',
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
    this.getAuth();
    /* eslint-disable react/no-unused-state */
    onLearningObjectivesItem(
      next => this.setState({ learningObjectives: next }),
      'MyLearningSummaryContainer'
    );
  }

  handleOpenBtnClick = (e: any, data: any) => {
    const { index } = data;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  async getAuth() {
    const { skProfileService, menuControlAuthService } = this.props;
    const { skProfile } = skProfileService!;

    if (!skProfile) {
      const profile: SkProfileModel = await skProfileService!.findSkProfile();
      menuControlAuthService!.findMenuControlAuth(profile.member.companyCode);
    }
  }

  init() {
    //
    const { skProfileService, myTrainingService } = this.props;
    skProfileService!.findStudySummary();
    this.fetchLearningSummary();
    this.menuControlAuth();
    myTrainingService!.findLearningCount();
    // const { inprogressCount, completedCount, enrolledCount, retryCount } = myTrainingService!;
  }

  fetchLearningSummary() {
    const {
      myLearningSummaryService,
      myTrainingService,
      badgeService,
    } = this.props;

    /* 메인 페이지에는 해당 년도의 LearningSummary 를 display 함. */
    const year = moment().year();

    // myTrainingService!.findAllTabCount();

    myLearningSummaryService!.findMyLearningSummaryByYear(year);
    myTrainingService!.countMyTrainingsWithStamp();
    myTrainingService!.countMyTrainingsWithStamp(
      [],
      moment([year, 1 - 1, 1])
        .toDate()
        .getTime(),
      moment([year, 12 - 1, 31])
        .toDate()
        .getTime()
    );
    badgeService!.getCountOfBadges();

    const { inprogressCount } = myTrainingService!;
  }

  menuControlAuth() {
    //
    const { skProfileService, menuControlAuthService } = this.props;
    skProfileService!.findSkProfile().then((profile: SkProfileModel) => {
      this.setState({ companyCode: profile.member.companyCode });
      menuControlAuthService!.findMenuControlAuth(profile.member.companyCode);
    });
  }

  getHourMinute(minuteTime: number) {
    //
    let hour = 0;
    let minute = minuteTime;

    if (minuteTime) {
      hour = Math.floor(minuteTime / 60);
      minute = minuteTime % 60;
    }
    return { hour, minute };
  }

  onClickComplete() {
    //
    this.props.history.push(myTrainingRoutePaths.learningCompleted());
  }

  onClickStamp() {
    //
    this.props.history.push(myTrainingRoutePaths.myPageEarnedStampList());
  }

  onClickBadge() {
    //
    this.props.history.push(certificationRoutePaths.badgeEarnedBadgeList());
  }

  onClickLearningSummary(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  // 관심채널로 이동
  onConfirmFavorite() {
    //
    const { location, history } = this.props;
    const { pathname } = location;

    if (pathname.startsWith(`${mainRoutePaths.main()}pages`)) {
      history.replace(mainRoutePaths.main());
    } else if (pathname.startsWith(`${lectureRoutePaths.recommend()}/pages`)) {
      history.replace(lectureRoutePaths.recommend());
    }
  }

  // 1:1 문의하기 이동
  moveToSupportQnA() {
    const { history } = this.props;
    history.push(supportRoutePaths.supportQnANewPost());
  }

  onClickCreateApl(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    // 개인학습 등록 바로 가기
    this.props.history.push('/my-training/apl/create');
  }

  openBoard() {
    this.setState(prevState => {
      return { boardVisible: !prevState.boardVisible };
    });
  }

  openLearningObjectives() {
    saveLearningObjectives();

    this.setState(prevState => {
      return { learningObjectivesOpen: !prevState.learningObjectivesOpen };
    });
  }

  convertProgressValue(value: number) {
    //유효성 체크 - 후 리팩토링..
    if (value === undefined || value === NaN || value === null) {
      return;
    }
    let percent = '';
    if (String(value).length === 1) {
      if (value > 5 && value < 16) {
        percent = '15';
      } else {
        percent = '5';
      }
    } else if (String(value).length === 2) {
      percent = String(value).substr(0, 1) + 5;
    } else if (String(value).length === 3) {
      percent = '100';
    }

    return Number(percent);
  }

  handlePopup() {
    this.setState(prevState => {
      return { attendanceOpen: !prevState.attendanceOpen };
    });
  }

  goToBadge() {
    const { history } = this.props;
    history.push('/certification/badge/EarnedBadgeList/pages/1');
  }

  goToQna() {
    const { history } = this.props;
    history.push('/board/support-qna');
  }

  render() {
    //
    const {
      boardVisible,
      learningObjectivesOpen,
      attendanceOpen,
      companyCode,
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
    const { skProfile, studySummaryFavoriteChannels } = skProfileService!;
    const { member } = skProfile;
    const { myLearningSummary } = myLearningSummaryService!;
    const { myBadgeCount, _challengingCount, _earnedCount } = badgeService!;
    const favoriteChannels = studySummaryFavoriteChannels.map(
      channel =>
        new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );
    /* 총 학습시간 */
    const CURRENT_YEAR = moment().year();
    const { hour, minute } = this.getHourMinute(
      myLearningSummary.displayTotalLearningTime
    );
    const { hour: accrueHour, minute: accrueMinute } = this.getHourMinute(
      myLearningSummary.displayAccrueTotalLearningTime
    );
    const badgeValue = Math.round(
      (_earnedCount / (_challengingCount + _earnedCount)) * 100
    );
    const complateLearningValue = Math.round(
      (myLearningSummary.completeLectureCount /
        (myTrainingService!.personalBoardInprogressCount +
          myLearningSummary.completeLectureCount)) *
        100
    );
    let LearningObjectivesPer = 0;
    LearningObjectivesPer = Math.floor(
      (myLearningSummary.displayTotalLearningTime /
        (learningObjectives!.AnnualLearningObjectives * 60)) *
        100
    );
    if (
      learningObjectives.AnnualLearningObjectives !== 0 &&
      LearningObjectivesPer > 100
    ) {
      LearningObjectivesPer = 100;
    } else if (LearningObjectivesPer === Infinity) {
      LearningObjectivesPer = 0;
    }
    let total: any = null;
    let accrueTotal: any = null;

    const { menuControlAuth } = menuControlAuthService!;
    if (hour < 1 && minute < 1) {
      total = (
        <>
          00
          <em>h</em> <em>00</em>
          <em>m</em>
        </>
      );
    } else if (hour < 1) {
      total = (
        <>
          {minute}
          <em>m</em>
        </>
      );
    } else if (minute < 1) {
      total = (
        <>
          {hour}
          <em>h</em>
        </>
      );
    } else {
      total = (
        <>
          {hour}
          <em>h</em> {minute}
          <em>m</em>
        </>
      );
    }

    if (accrueHour < 1 && accrueMinute < 1) {
      accrueTotal = (
        <>
          <span className="big2">00</span>
          <span className="small2">h</span> <span className="big">00</span>
          <span className="small2">m</span>
        </>
      );
    } else if (accrueHour < 1) {
      accrueTotal = (
        <>
          <span className="big2">{accrueMinute}</span>
          <span className="small2">m</span>
        </>
      );
    } else if (accrueMinute < 1) {
      accrueTotal = (
        <>
          <span className="big2">{accrueHour}</span>
          <span className="small2">h</span>
        </>
      );
    } else {
      accrueTotal = (
        <>
          <span className="big2">{accrueHour}</span>
          <span className="small2">h</span>{' '}
          <span className="big2">{accrueMinute}</span>
          <span className="small2">m</span>
        </>
      );
    }

    const badgeLearningTime = getBadgeLearningTimeItem();
    if (badgeLearningTime !== undefined) {
      setBadgeLearningTimeItem({
        ...badgeLearningTime,
        mylearningTimeHour: accrueHour,
        mylearningTimeMinute: accrueMinute,
      });
    }

    const eventBannerVisible = () => {
      const today = moment().format('YYYY-MM-DD')
      const afterFlag = moment(today).isAfter(
        moment().format('2021-04-04'),
        'day'
      );
      const beforeFlag = moment(today).isBefore(
        moment().format('2021-05-01'),
        'day'
      );

      if(afterFlag && beforeFlag) {
        return true
      } else {
        return false
      }
    };

    const style1 = {
      borderRadius: '0.375rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      border: '1px solid #aaaaaa',
      color: '#4c4c4c',
    };

    const style2 = {
      borderRadius: '0.375rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      border: '1px solid #aaaaaa',
      color: '#4c4c4c',
    };

    const style3 = {
      borderRadius: '0.375rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      border: '1px solid #aaaaaa',
      color: '#4c4c4c',
    };

    return (
      <>
        <HeaderWrapperView>
          <div className="ui profile inline">
            <div className="pic s60">
              <Image
                src={skProfile.photoFilePath || profileImg}
                alt="프로필사진"
              />
            </div>
          </div>
          <div className="personal-header-title">
            <h3>{member.name}님,</h3>
            <DashBoardSentenceContainer />
          </div>
          <div className="main-gauge-box">
            <div className="main-gauge">
              <span className="gauge-badge">Badge</span>
              <div
                className={`gauge-content gauge-bg${
                  badgeValue ? this.convertProgressValue(badgeValue) : 5
                }`}
              >
                <div className="gauge-content-box">
                  <p className="top-num">{_earnedCount}</p>
                  <span className="bot-num">
                    도전중 {Number(badgeService?.challengingCount)}
                  </span>
                </div>
              </div>
            </div>
            <div className="main-gauge">
              <span className="gauge-badge">
                {CURRENT_YEAR + '년 완료학습'}
              </span>
              <Popup
                trigger={
                  <div
                    className={`gauge-content gauge-com${
                      complateLearningValue
                        ? this.convertProgressValue(complateLearningValue)
                        : 5
                    }`}
                  >
                    <div className="gauge-content-box">
                      <p>{myLearningSummary.completeLectureCount}</p>
                      <span>
                        학습중 {myTrainingService?.personalBoardInprogressCount}
                      </span>
                    </div>
                  </div>
                }
                style={style2}
                position="bottom center"
                wide
              >
                <span className="personal_pop_tit">누적 완료학습</span>
                <span>
                  <strong>
                    {myTrainingService?.personalBoardCompletedCount}
                  </strong>
                  개
                </span>
              </Popup>
            </div>
            <div className="main-gauge ">
              <span className="gauge-badge">
                {CURRENT_YEAR + '년 학습시간'}
              </span>
              <Popup
                trigger={
                  <div
                    className={`gauge-content gauge-time${
                      LearningObjectivesPer
                        ? LearningObjectivesPer === 100
                          ? 100
                          : this.convertProgressValue(LearningObjectivesPer)
                        : 5
                    }`}
                  >
                    <div className="gauge-content-box">
                      <p>{total}</p>
                      <span>
                        목표 {learningObjectives!.AnnualLearningObjectives}h
                      </span>
                    </div>
                  </div>
                }
                style={style3}
                position="bottom center"
                wide
              >
                <span className="personal_pop_tit">누적 학습시간</span>
                <span>
                  <strong>{accrueTotal}</strong>
                </span>
              </Popup>
            </div>
          </div>
          <LearningObjectivesContainer
            openLearningObjectives={this.openLearningObjectives}
          />
          {eventBannerVisible() && (
            <div className="main-event-btn">
              <button type="button" onClick={this.handlePopup} />
            </div>
          )}
        </HeaderWrapperView>
        {companyCode && (
          <AdditionalToolsMyLearning
            onClickQnA={this.moveToSupportQnA}
            handleClick={this.handleOpenBtnClick}
            activeIndex={activeIndex}
            companyCode={companyCode}
          >
            <FavoriteChannelChangeModal
              trigger={
                <a>
                  <Icon className="channel24" />
                  <span>관심 채널 설정</span>
                </a>
              }
              favorites={favoriteChannels}
              onConfirmCallback={this.onConfirmFavorite}
            />
            {(menuControlAuth.companyCode === '' ||
              (menuControlAuth.authCode === MenuControlAuth.User &&
                menuControlAuth.useYn === MenuControlAuth.Yes)) && (
              <div onClick={this.onClickCreateApl}>
                <a href="#">
                  <Icon className="add24" />
                  <span>개인학습</span>
                </a>
              </div>
            )}
          </AdditionalToolsMyLearning>
        )}
        <div
          className="main-learning-link sty2"
          data-area={AreaType.MAIN_INFO}
          data-type={Type.CLICK}
        >
          <div className="inner">
            <div className="left">
              <div>
                <FavoriteChannelChangeModal
                  trigger={
                    <a>
                      <Icon className="channel25" />
                      <span
                        data-area={AreaType.MAIN_INFO}
                        data-type={Type.VIEW}
                        data-pathname="관심 채널 설정"
                        data-page="#attention-channel"
                      >
                        관심 채널 설정
                      </span>
                    </a>
                  }
                  favorites={favoriteChannels}
                  onConfirmCallback={this.onConfirmFavorite}
                />
              </div>
              {(menuControlAuth.companyCode === '' ||
                (menuControlAuth.authCode === MenuControlAuth.User &&
                  menuControlAuth.useYn === MenuControlAuth.Yes)) && (
                <div onClick={this.onClickCreateApl}>
                  <a href="#">
                    <Icon className="card-main24" />
                    <span>개인학습</span>
                  </a>
                </div>
              )}
            </div>
            <div className="right">
              <a onClick={this.goToQna} className="contact-us wh">
                <span>1:1 문의하기</span>
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
                message: `목표 설정이 완료됐습니다.`,
              });
            }
            return this.setState({ learningObjectivesOpen: value });
          }}
        />
        {/* 4/5~ 4/30 일까지 노출되도록 수정 */}
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
