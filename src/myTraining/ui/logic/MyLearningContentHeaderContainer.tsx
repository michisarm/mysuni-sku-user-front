
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentHeader } from 'shared';
import { ActionLogService } from 'shared/stores';
import { SkProfileService } from 'profile/stores';
import { BadgeService } from 'certification/stores';
import lectureRoutePaths from 'lecture/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { ContentHeaderTotalTimeItem } from '../../shared';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';
import ContentHeaderStampView from '../view/ContentHeaderStampView';
import ContentHeaderBadgeView from '../view/ContentHeaderBadgeView';

import BadgeRoutePaths from '../../../certification/routePaths';
import MyTrainingRoutePaths from '../../routePaths';
import BadgeFilterRdoModel from '../../../certification/ui/model/BadgeFilterRdoModel';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  actionLogService?: ActionLogService,
  skProfileService?: SkProfileService,
  myLearningSummaryService?: MyLearningSummaryService,
  badgeService?: BadgeService,
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'profile.skProfileService',
  'myTraining.myLearningSummaryService',
  'badge.badgeService',
))
@observer
@reactAutobind
class MyLearningContentHeaderContainer extends Component<Props> {
  //
  componentDidMount(): void {
    this.init();

    const { badgeService } = this.props;
    badgeService!.findPagingEarnedBadges(BadgeFilterRdoModel.earned('', 'Issued'));
  }

  init() {
    //
    const { myLearningSummaryService } = this.props;

    myLearningSummaryService!.findMyLearningSummary();
  }

  onClickMyBadge() {
    //
    const { history } = this.props;

    history.push(BadgeRoutePaths.badgeEarnedBadgeList());
  }

  onClickMyStamp() {
    //
    const { history } = this.props;

    history.push(MyTrainingRoutePaths.myPageEarnedStampList());
  }

  render() {
    //
    const { actionLogService, skProfileService, myLearningSummaryService, badgeService, history } = this.props;
    const { skProfile } = skProfileService!;
    const { member } = skProfile;
    const { myLearningSummary } = myLearningSummaryService!;
    const myBadgeCount = badgeService!.earnedCount;

    return (
      <ContentHeader>
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            myPageActive
            image={skProfile.photoFilePath || profileImg}
            name={member.name}
            company={member.company}
            department={member.department}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell inner>
          {myLearningSummary.totalLearningTime !== 0 && (
            <ContentHeaderTotalTimeItem
              minute={myLearningSummary.totalLearningTime}
            />
          )}
          {myLearningSummary.totalLearningTime === 0 && (
            <ContentHeader.WaitingItem
              onClick={() => { actionLogService?.registerClickActionLog({ subAction: '추천 학습 과정 보기' }); history.push(lectureRoutePaths.recommend()); }}
            />
          )}
        </ContentHeader.Cell>
        <ContentHeader.Cell>
          <ContentHeaderStampView
            stampCount={myLearningSummary.acheiveStampCount}
            onClickItem={this.onClickMyStamp}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell>
          <ContentHeaderBadgeView
            badgeCount={myBadgeCount}
            selectedYear={0}
            yearOptions={[]}
            onChangeYear={() => { }}
            onClickItem={this.onClickMyBadge}
          />
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default withRouter(MyLearningContentHeaderContainer);
