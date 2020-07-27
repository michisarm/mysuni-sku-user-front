
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import myTrainingRoutePaths from 'myTraining/routePaths';
import certificationRoutePaths from 'certification/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { Icon, Image } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { SkProfileService } from 'profile/stores';
import { MyLearningSummaryService } from 'myTraining/stores';
import { MyLearningSummaryModal } from 'myTraining';
import { FavoriteChannelChangeModal } from 'shared';
import { HeaderWrapperView, ItemWrapper, HeaderItemView, AdditionalToolsMyLearning } from './MyLearningSummaryElementsView';
import {ChannelModel} from '../../../college/model';
import mainRoutePaths from '../../routePaths';
import lectureRoutePaths from '../../../lecture/routePaths';
import BadgeService from '../../../certification/present/logic/BadgeService';
import IssueState from '../../../certification/shared/Badge/ui/model/IssueState';


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService,
  skProfileService?: SkProfileService,
  myLearningSummaryService?: MyLearningSummaryService,

  badgeService?: BadgeService
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'profile.skProfileService',
  'myTraining.myLearningSummaryService',
  'badge.badgeService'
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
    const { myLearningSummaryService, badgeService } = this.props;
    myLearningSummaryService!.findMyLearningSummary();

    badgeService!.getCountOfBadges();

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
    }
    else if (pathname.startsWith(`${lectureRoutePaths.recommend()}/pages`)) {
      history.replace(lectureRoutePaths.recommend());
    }
  }

  render() {
    //
    const { myLearningSummaryService, skProfileService, badgeService } = this.props;
    const { skProfile, studySummaryFavoriteChannels } = skProfileService!;
    const { member } = skProfile;
    const { myLearningSummary } = myLearningSummaryService!;
    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );
    const { hour, minute } = this.getHourMinute(myLearningSummary.totalLearningTime);
    let total:any = null;

    if (hour < 1 && minute < 1) {
      total = (
        <>
          <span className="big">00</span><span className="small h">h</span> <span className="big">00</span><span className="small m">m</span>
        </>
      );
    }
    else if (hour < 1) {
      total = (
        <>
          <span className="big">{minute}</span><span className="small m">m</span>
        </>
      );
    }
    else if (minute < 1) {
      total = (
        <>
          <span className="big">{hour}</span><span className="small h">h</span>
        </>
      );
    }
    else {
      total = (
        <>
          <span className="big">{hour}</span><span className="small h">h</span> <span className="big">{minute}</span><span className="small m">m</span>
        </>
      );
    }

    return (
      <>
        <HeaderWrapperView>

          <ItemWrapper>
            <div className="ui profile">
              <div className="pic s80">
                <Image src={member.photoFilePath || profileImg} alt="프로필사진"/>
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

          <ItemWrapper onClick={() => this.onClickLearningSummary('완료된 학습')}>
            <HeaderItemView
              label="완료된 학습"
              count={myLearningSummary.completeLectureCount}
              onClick={this.onClickComplete}
            />
          </ItemWrapper>

          <ItemWrapper onClick={() => this.onClickLearningSummary('My Stamp')}>
            <HeaderItemView
              label="My Stamp"
              count={myLearningSummary.acheiveStampCount}
              onClick={this.onClickStamp}
            />
          </ItemWrapper>

          {/*2차 My Badge 추가*/}
          <ItemWrapper onClick={() => this.onClickLearningSummary('My Badge')}>
            <HeaderItemView
              label="My Badge"
              count={badgeService!.earnedCount}
              onClick={this.onClickBadge}
            />
          </ItemWrapper>

        </HeaderWrapperView>

        <AdditionalToolsMyLearning>
          <FavoriteChannelChangeModal
            trigger={(
              <a>
                <Icon className="channel24"/>
                <span>관심 채널 설정</span>
              </a>
            )}
            favorites={favoriteChannels}
            onConfirmCallback={this.onConfirmFavorite}
          />
        </AdditionalToolsMyLearning>
      </>
    );
  }
}

export default withRouter(MyLearningSummaryContainer);
