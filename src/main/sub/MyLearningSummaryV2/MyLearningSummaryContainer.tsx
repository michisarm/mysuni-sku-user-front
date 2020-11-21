
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import myTrainingRoutePaths from 'myTraining/routePaths';
import certificationRoutePaths from 'certification/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { Icon, Image } from 'semantic-ui-react';
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


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService,
  skProfileService?: SkProfileService,
  myLearningSummaryService?: MyLearningSummaryService,
  menuControlAuthService?: MenuControlAuthService;
  myTrainingService?: MyTrainingService;
  badgeService?: BadgeService;

  // badgeService?: BadgeService
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
class MyLearningSummaryContainer extends Component<Props> {
  //
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
  }

  fetchLearningSummary() {
    const { myLearningSummaryService, myTrainingService, badgeService } = this.props;

    /* 메인 페이지에는 해당 년도의 LearningSummary 를 display 함. */
    const year = moment().year();

    myLearningSummaryService!.findMyLearningSummaryByYear(year);
    myTrainingService!.countMyTrainingsWithStamp();
    badgeService!.getCountOfBadges();
  }

  menuControlAuth() {
    //
    const { skProfileService, menuControlAuthService } = this.props;
    skProfileService!.findSkProfile()
      .then((profile: SkProfileModel) => menuControlAuthService!.findMenuControlAuth(profile.member.companyCode))
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

  render() {
    //
    const { myLearningSummaryService, skProfileService, myTrainingService, badgeService, menuControlAuthService } = this.props;
    const { skProfile, studySummaryFavoriteChannels } = skProfileService!;
    const { member } = skProfile;
    const { myLearningSummary } = myLearningSummaryService!;
    const { myStampCount } = myTrainingService!;
    const { earnedCount: myBadgeCount } = badgeService!;
    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );
    /* 총 학습시간 */
    const { hour, minute } = this.getHourMinute(myLearningSummary.displayTotalLearningTime);
    let total: any = null;

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

    return (
      <>
        <HeaderWrapperView>
          <ItemWrapper>
            <div className="ui profile">
              <div className="pic s80">
                <Image
                  src={skProfile.photoFilePath || profileImg}
                  alt="프로필사진"
                />
              </div>
            </div>
            <div className="user">
              <div className="hello">안녕하세요</div>
              <div className="user-name">
                <strong className="ellipsis">{member.name}</strong>
                <span>님</span>
              </div>
            </div>
          </ItemWrapper>

          <ItemWrapper>
            <div className="title">총 학습시간</div>
            <MyLearningSummaryModal
              trigger={(
                <a>
                  {total}
                </a>
              )}
            />
          </ItemWrapper>

          <ItemWrapper
            onClick={() => this.onClickLearningSummary('완료된 학습')}
          >
            <HeaderItemView
              label="완료된 학습"
              count={myLearningSummary.completeLectureCount}
              onClick={this.onClickComplete}
            />
          </ItemWrapper>

          <ItemWrapper onClick={() => this.onClickLearningSummary('My Stamp')}>
            <HeaderItemView
              label="My Stamp"
              count={myStampCount}
              onClick={this.onClickStamp}
            />
          </ItemWrapper>

          {/*2차 My Badge 추가*/}
          <ItemWrapper onClick={() => this.onClickLearningSummary('My Badge')}>
            <HeaderItemView
              label="My Badge"
              count={myBadgeCount}
              onClick={this.onClickBadge}
            />
          </ItemWrapper>
        </HeaderWrapperView>

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
      </>
    );
  }
}

export default withRouter(MyLearningSummaryContainer);
