
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import moment from 'moment';
import { ContentHeader } from 'shared';
import { SkProfileService } from 'profile';
import { MyLearningSummaryService } from 'myTraining';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';

import FavoriteChannelContainer from './FavoriteChannelContainer';
import ContentHeaderLearningSummaryView from '../view/ContentHeaderLearningSummaryView';
import ContentHeaderStampView from '../view/ContentHeaderStampView';


interface Props {
  skProfileService? : SkProfileService
  myLearningSummaryService? : MyLearningSummaryService
}

interface State {
  selectedYear: number
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.myLearningSummaryService'
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

  render() {
    //
    const { yearOptions } = MyPageContentHeaderContainer;
    const { skProfileService, myLearningSummaryService } = this.props;
    const { selectedYear } = this.state;
    const { skProfile } = skProfileService!;
    const { myLearningSummary } = myLearningSummaryService!;

    return (
      <ContentHeader
        bottom={<FavoriteChannelContainer />}
      >
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            image={skProfile.member.photoFilePath || profileImg}
            name={skProfile.member.name}
            company={skProfile.member.company}
            department={skProfile.member.department}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell inner>
          <ContentHeaderLearningSummaryView
            year={selectedYear}
            totalLearningTime={myLearningSummary.totalLearningTime}
            mySuniLearningTime={myLearningSummary.suniLearningTime}
            myCompanyLearningTime={myLearningSummary.myCompanyLearningTime}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell>
          <ContentHeaderStampView
            stampCount={myLearningSummary.acheiveStampCount}
            selectedYear={selectedYear}
            yearOptions={yearOptions}
            onChangeYear={this.onChangeYear}
          />
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default MyPageContentHeaderContainer;