
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import myTrainingRoutePaths from 'myTraining/routePaths';
import certificationRoutePaths from 'certification/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { Button, Icon, Image, Popup } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { SkProfileService } from 'profile/stores';
// import { BadgeService } from 'certification/stores';
import { MyLearningSummaryService, MyTrainingService } from 'myTraining/stores';
import { BadgeService } from 'lecture/stores';
import { MyLearningSummaryModal } from 'myTraining';
import { FavoriteChannelChangeModal } from 'shared';
import { HeaderWrapperView, ItemWrapper, HeaderItemView, AdditionalToolsMyLearning } from './MyLearningSummaryElementsView';
import { ChannelModel } from '../../../college/model';
import mainRoutePaths from '../../routePaths';
import lectureRoutePaths from '../../../lecture/routePaths';
import supportRoutePaths from '../../../board/routePaths';
import { MenuControlAuth } from '../../../shared/model/MenuControlAuth';
import MenuControlAuthService from '../../../approval/company/present/logic/MenuControlAuthService';
import SkProfileModel from "../../../profile/model/SkProfileModel";
import PersonalBoardContainer from '../PersonalBoard/ui/logic/PersonalBoardContainer';
import LearningObjectivesModal from '../PersonalBoard/ui/view/LearningObjectivesModal';
import LearningObjectivesModalContainer from '../PersonalBoard/ui/logic/LearningObjectivesModalContainer';
import { getBadgeLearningTimeItem, getLearningObjectivesItem, setBadgeLearningTimeItem } from '../PersonalBoard/store/PersonalBoardStore';
import DashBoardSentenceContainer from 'layout/ContentHeader/sub/DashBoardSentence/ui/logic/DashBoardSentenceContainer';


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService,
  skProfileService?: SkProfileService,
  myLearningSummaryService?: MyLearningSummaryService,
  menuControlAuthService?: MenuControlAuthService;
  myTrainingService?: MyTrainingService;
  badgeService?: BadgeService;
  // badgeService?: BadgeService
}

interface States {
  boardVisible: boolean;
  learningObjectivesOpen: boolean;
  companyCode: string;
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'profile.skProfileService',
  'myTraining.myLearningSummaryService',
  'myTraining.myTrainingService',
  'badge.badgeService',
  'approval.menuControlAuthService',
  // 'badge.badgeService'
))
@observer
@reactAutobind
class MyLearningSummaryContainer extends Component<Props, States> {

  state = {
    boardVisible: false,
    learningObjectivesOpen: false,
    companyCode: ''
  }
  
  componentDidMount(): void {
    //
    this.init();
  }

  init() {
    //
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
    this.fetchLearningSummary();
    this.menuControlAuth();
    // this.props.boardVisible = false;
  }

  fetchLearningSummary() {
    const { myLearningSummaryService, myTrainingService, badgeService } = this.props;

    /* 메인 페이지에는 해당 년도의 LearningSummary 를 display 함. */
    const year = moment().year();

    myLearningSummaryService!.findMyLearningSummaryByYear(year);
    myTrainingService!.countMyTrainingsWithStamp();
    myTrainingService!.countMyTrainingsWithStamp([],moment([year,1-1,1]).toDate().getTime(),moment([year,12-1,31]).toDate().getTime());
    badgeService!.getCountOfBadges();
    myLearningSummaryService!.findMyLearningSummary();
    myLearningSummaryService!.findTotalMyLearningSummaryDash();
  }

  menuControlAuth() {
    //
    const { skProfileService, menuControlAuthService } = this.props;
    skProfileService!.findSkProfile()
      .then((profile: SkProfileModel) => {
        this.setState({companyCode: profile.member.companyCode})
        menuControlAuthService!.findMenuControlAuth(profile.member.companyCode)
      })
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

  onClickCreateApl() {
    // 개인학습 등록 바로 가기
    this.props.history.push('/my-training/apl/create');
  }

  openBoard () {
    this.setState(prevState => {
      return (
        ({ boardVisible: !prevState.boardVisible})
      )
    })
  }

  // this.setState({'learningObjectivesOpen':value})
  openLearningObjectives () {
    this.setState(prevState => {
      return (
        ({ learningObjectivesOpen: !prevState.learningObjectivesOpen})
      )
    })
  }

  render() {
    //
    const { boardVisible, learningObjectivesOpen, companyCode } = this.state;
    const { myLearningSummaryService, skProfileService, myTrainingService, badgeService, menuControlAuthService } = this.props;
    const { skProfile, studySummaryFavoriteChannels } = skProfileService!;
    const { member } = skProfile;
    const { myLearningSummary, totalMyLearningSummaryDash } = myLearningSummaryService!;
    const { myStampCount, thisYearMyStampCount } = myTrainingService!;
    const { earnedCount: myBadgeCount } = badgeService!;
    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );
    /* 총 학습시간 */
    const CURRENT_YEAR = moment().year();
    const { hour, minute } = this.getHourMinute(myLearningSummary.displayTotalLearningTime);
    const { hour:accrueHour, minute:accrueMinute } = this.getHourMinute(myLearningSummary.displayAccrueTotalLearningTime);
    let total: any = null;
    let accrueTotal: any = null;

    const { menuControlAuth } = menuControlAuthService!;
    if (hour < 1 && minute < 1) {
      total = (
        <>
          <span className="big">00</span>
          <span className="small h">h</span> <span className="big">00</span>
          <span className="small m">m</span>
        </>
      );
    } else if (hour < 1) {
      total = (
        <>
          <span className="big">{minute}</span>
          <span className="small m">m</span>
        </>
      );
    } else if (minute < 1) {
      total = (
        <>
          <span className="big">{hour}</span>
          <span className="small h">h</span>
        </>
      );
    } else {
      total = (
        <>
          <span className="big">{hour}</span>
          <span className="small h">h</span>{' '}
          <span className="big">{minute}</span>
          <span className="small m">m</span>
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

    const badgeLearningTime = getBadgeLearningTimeItem()
    if(badgeLearningTime !== undefined) {
      setBadgeLearningTimeItem({ ...badgeLearningTime, mylearningTimeHour: accrueHour, mylearningTimeMinute: accrueMinute})
    }

    const style1 = {
      borderRadius: "0.375rem",
      textAlign: "center",
      fontSize: "0.875rem",
      border: "1px solid #aaaaaa",
      color: "#4c4c4c",
    };

    const style2 = {
      borderRadius: "0.375rem",
      textAlign: "center",
      fontSize: "0.875rem",
      border: "1px solid #aaaaaa",
      color: "#4c4c4c",
    };

    const style3 = {
      borderRadius: "0.375rem",
      textAlign: "center",
      fontSize: "0.875rem",
      border: "1px solid #aaaaaa",
      color: "#4c4c4c",
    };
    

    return (
      <>
        <HeaderWrapperView>
          {/* <ItemWrapper> */}
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
                <DashBoardSentenceContainer/>
                {/* <Button onClick={this.openBoard}>openBoard</Button>
                <Button onClick={this.openLearningObjectives}>목표 설정</Button> */}
            </div>
          {/* </ItemWrapper> */}
          <div className="main-gauge-box">

            <div className="main-gauge">
              <span className="gauge-badge">Badge</span>
              <Popup
                trigger={
                  <div className="gauge-content gauge-bg55">
                    <div className="gauge-content-box">
                      <p className="top-num">9</p>
                      <span className="bot-num">23</span>
                    </div>
                  </div>
                }
                style={style1}
                position="bottom center"
                wide
              >
                <span className="personal_pop_tit">
                  도전중 Badge
                </span>
                <span>
                  <strong>23</strong>개
                </span>
              </Popup>
            </div>

            <div className="main-gauge">
              <span className="gauge-badge">2021년 완료학습</span>
              <Popup
                trigger={
                  <div className="gauge-content gauge-com35">
                    <div className="gauge-content-box">
                      <p>228</p>
                      <span>340</span>
                    </div>
                  </div>
                }
                style={style2}
                position="bottom center"
                wide
              >
                <span className="personal_pop_tit">
                  누적 완료학습
                </span>
                <span>
                  <strong>340</strong>개
                </span>
              </Popup>
            </div>

            <div className="main-gauge ">
              <span className="gauge-badge">2021년 학습시간</span>
              <Popup
                trigger={
                  <div className="gauge-content gauge-time75">
                    <div className="gauge-content-box">
                      {/* <p>63 58'</p>
                      <span>209 30'</span> */}
                    </div>
                  </div>
                }
                style={style3}
                position="bottom center"
                wide
              >
                <span className="personal_pop_tit">
                  누적 학습시간
                </span>
                <span>
                  <strong>209</strong>h
                  <strong className="personal_pop_sub">30</strong>m
                </span>
              </Popup>
            </div>
          </div>

          {/* <ItemWrapper>
            <div className="title">{CURRENT_YEAR}년 학습시간</div>
            <MyLearningSummaryModal
              trigger={(
                <a>
                  {total}
                </a>
              )}
            />
            <a className="main_sub_all">
              &#40;누적
              {accrueTotal}
              &#41;
            </a>
          </ItemWrapper>

          <ItemWrapper
            onClick={() => this.onClickLearningSummary('완료된 학습')}
          >
            <HeaderItemView
              label={CURRENT_YEAR + "년 완료학습"}
              count={myLearningSummary.completeLectureCount}
              onClick={this.onClickComplete}
            />
            <a className="main_sub_all">
              &#40;누적
              <span className="big2">{myLearningSummary.totalCompleteLectureCount}</span>
              <span className="small2 h">개</span>
              &#41;
            </a>
          </ItemWrapper>

          <ItemWrapper onClick={() => this.onClickLearningSummary('My Stamp')}>
            <HeaderItemView
              label="My Stamp"
              count={myStampCount}
              onClick={this.onClickStamp}
            />
          </ItemWrapper>

          <ItemWrapper onClick={() => this.onClickLearningSummary('My Badge')}>
            <HeaderItemView
              label="My Badge"
              count={myBadgeCount}
              onClick={this.onClickBadge}
            />
          </ItemWrapper> */}
        </HeaderWrapperView>

      {/* 퍼스널보드 컴포넌트 생성 */}
      { boardVisible && companyCode && (
        <PersonalBoardContainer companyCode={companyCode}/>
      )}

        <AdditionalToolsMyLearning onClickQnA={this.moveToSupportQnA}>
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
          { (menuControlAuth.companyCode === '' || ( menuControlAuth.authCode === MenuControlAuth.User
            && menuControlAuth.useYn === MenuControlAuth.Yes))
          &&(
          <div onClick={this.onClickCreateApl} >
            <a href="#"><Icon className="add24"/><span>개인학습</span></a>
          </div>
          )
          }
        </AdditionalToolsMyLearning>
        <LearningObjectivesModalContainer
          open={learningObjectivesOpen}
          setOpen={(value)=> {
            return this.setState({'learningObjectivesOpen':value})
          }} 
        />
      </>
    );
  }
}

export default withRouter(MyLearningSummaryContainer);
