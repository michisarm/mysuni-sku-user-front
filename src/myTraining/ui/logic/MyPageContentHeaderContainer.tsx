
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import {RouteComponentProps, withRouter} from 'react-router';

import moment from 'moment';
import { ContentHeader } from 'shared';
import { SkProfileService } from 'profile/stores';
import { MyLearningSummaryService } from 'myTraining/stores';
import { BadgeService } from 'certification/stores';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';

import FavoriteChannelContainer from './FavoriteChannelContainer';
import ContentHeaderLearningSummaryView from '../view/ContentHeaderLearningSummaryView';
import ContentHeaderStampView from '../view/ContentHeaderStampView';
import ContentHeaderBadgeView from '../view/ContentHeaderBadgeView';

import BadgeRoutePaths from '../../../certification/routePaths';
import MyTrainingRoutePaths from '../../routePaths';


interface Props extends RouteComponentProps {
  skProfileService? : SkProfileService
  myLearningSummaryService? : MyLearningSummaryService,
  badgeService? : BadgeService,
}

interface State {
  selectedYear: number
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.myLearningSummaryService',
  'badge.badgeService',
))
@observer
@reactAutobind
class MyPageContentHeaderContainer extends Component<Props, State> {
  //
  static START_YEAR = 2020;

  static get yearOptions() {
    //
    const options = [];
    const currentYear = moment().year();

    for (let i = 0; i < 5; i++) {
      const year = currentYear - i;
      const yearText = year.toString();

      if (year >= MyPageContentHeaderContainer.START_YEAR) {
        options.push({ key: yearText, text: yearText, value: year });
      }
    }
    return options;
  }

  state = {
    selectedYear: moment().year(),
  };


  componentDidMount(): void {
    //
    this.init();
  }

  init() {
    //
    const { myLearningSummaryService } = this.props;
    myLearningSummaryService!.findMyLearningSummary();
  }

  onChangeYear(selectedYear: number) {
    //
    const { myLearningSummaryService } = this.props;

    myLearningSummaryService!.findMyLearningSummaryYear(selectedYear);
    this.setState({ selectedYear });
  }

  onClickMyBadge() {
    //
    const { history } = this.props;

    history.push( BadgeRoutePaths.badgeEarnedBadgeList() );
  }

  onClickMyStamp() {
    //
    const { history } = this.props;

    history.push( MyTrainingRoutePaths.myPageEarnedStampList() );
  }


  render() {
    //
    const { yearOptions } = MyPageContentHeaderContainer;
    const { skProfileService, myLearningSummaryService, badgeService } = this.props;
    const { selectedYear } = this.state;
    const { skProfile } = skProfileService!;
    const { myLearningSummary } = myLearningSummaryService!;
    const myBadgeCount = badgeService!.earnedCount;

    return (
      <ContentHeader
        bottom={<FavoriteChannelContainer />}
      >
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            image={skProfile.photoFilePath || profileImg}
            name={skProfile.member.name}
            company={skProfile.member.company}
            department={skProfile.member.department}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell inner>
          <ContentHeaderLearningSummaryView
            year={selectedYear}
            totalLearningTime={myLearningSummary.totalLearningTime}
            mySuniLearningTime={myLearningSummary.suniLearningTime-myLearningSummary.myCompanyInSuniLearningTime}
            myCompanyLearningTime={myLearningSummary.myCompanyLearningTime+myLearningSummary.myCompanyInSuniLearningTime}
          />
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
            selectedYear={selectedYear}
            yearOptions={yearOptions}
            onChangeYear={this.onChangeYear}
            onClickItem={this.onClickMyBadge}
          />
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default withRouter(MyPageContentHeaderContainer);
