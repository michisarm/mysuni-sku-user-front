
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import moment from 'moment';
import { ContentHeader } from 'shared';
import { SkProfileService } from 'profile';
import { MyLearningSummaryService } from 'myTraining';
import FavoriteChannelContainer from './FavoriteChannelContainer';
import ProfileView from '../view/title/ProfileView';
import LectureTotalTimeView from '../view/title/LectureTotalTimeView';
import StampInfoView from '../view/title/StampInfoView';


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
  static get yearOptions() {
    //
    const options = [];
    const currentYear = moment().year();

    for (let i = 0; i < 5; i++) {
      const year = currentYear - i;
      const yearText = year.toString();

      if (year >= 2020) {
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
        <ProfileView
          skProfile={skProfile}
        />
        <LectureTotalTimeView
          year={selectedYear}
          totalLearningTime={myLearningSummary.totalLearningTime}
          suniLearningTime={myLearningSummary.suniLearningTime}
          myCompanyLearningTime={myLearningSummary.myCompanyLearningTime}
        />
        <StampInfoView
          stampCount={myLearningSummary.acheiveStampCount}
          year={selectedYear}
          years={yearOptions}
          onChangeYear={this.onChangeYear}
        />
      </ContentHeader>
    );
  }
}

export default MyPageContentHeaderContainer;
