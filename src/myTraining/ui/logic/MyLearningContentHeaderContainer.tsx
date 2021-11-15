import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentHeader } from 'shared';
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
import { MyBadgeRdo } from '../../../certification/model/MyBadgeRdo';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props extends RouteComponentProps<{ tab: string; pageNo: string }> {
  skProfileService?: SkProfileService;
  myLearningSummaryService?: MyLearningSummaryService;
  badgeService?: BadgeService;
}

@inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myLearningSummaryService',
    'badge.badgeService'
  )
)
@observer
@reactAutobind
class MyLearningContentHeaderContainer extends Component<Props> {
  //
  componentDidMount(): void {
    this.init();

    const { badgeService } = this.props;

    const myBadgeRdo: MyBadgeRdo = {
      issued: true,
      offset: 0,
      limit: 20,
    };

    badgeService!.findAllMyBadges(myBadgeRdo);
  }

  async init() {
    //
    const { myLearningSummaryService } = this.props;
    const {
      findMyLearningSummaryByYear,
      findInstructTimeSummary,
      getDisplayCompanyLearningTime,
      getDisplayMySuniLeaningTime,
      getDisplayTotalLearningTime,
    } = myLearningSummaryService!;

    await findMyLearningSummaryByYear();
    await findInstructTimeSummary();
    getDisplayCompanyLearningTime();
    getDisplayMySuniLeaningTime();
    getDisplayTotalLearningTime();
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
    const {
      skProfileService,
      myLearningSummaryService,
      badgeService,
      history,
    } = this.props;
    const { skProfile } = skProfileService!;
    // const { member } = skProfile;
    const { displayTotalLearningTime } = myLearningSummaryService!;
    const myBadgeCount = badgeService!.allBadgeCount.issuedCount;

    return (
      <ContentHeader>
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            myPageActive
            image={skProfile.photoFilePath || profileImg}
            name={parsePolyglotString(skProfile.name)}
            company={parsePolyglotString(skProfile.companyName)}
            department={parsePolyglotString(skProfile.departmentName)}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell inner>
          {displayTotalLearningTime !== 0 && (
            <ContentHeaderTotalTimeItem minute={displayTotalLearningTime} />
          )}
          {displayTotalLearningTime === 0 && (
            <ContentHeader.WaitingItem
              onClickRecommend={() => {
                history.push(lectureRoutePaths.recommend());
              }}
            />
          )}
        </ContentHeader.Cell>
        <ContentHeader.Cell>
          {/* <ContentHeaderStampView
            stampCount={myLearningSummary.acheiveStampCount}
            onClickItem={this.onClickMyStamp}
          /> */}
        </ContentHeader.Cell>
        <ContentHeader.Cell>
          <ContentHeaderBadgeView
            badgeCount={myBadgeCount}
            onClickItem={this.onClickMyBadge}
          />
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default withRouter(MyLearningContentHeaderContainer);
