import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { MyLearningSummaryService } from 'myTraining/index';
import { SkProfileService } from 'profile';
import ProfileView from '../view/title/ProfileView';
import LectureTotalTimeView from '../view/title/LectureTotalTimeView';
import StampInfoView from '../view/title/StampInfoView';



interface Props {
  skProfileService? : SkProfileService
  myLearningSummaryService? : MyLearningSummaryService
}


interface States{
  year: number
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.myLearningSummaryService'
))
@observer
@reactAutobind
class TitleContainer extends Component<Props, States> {
  //
  state = {
    year: Number(new Date().getFullYear()),
  };

  componentDidMount(): void {
    this.init();
  }

  init() {
    const { myLearningSummaryService } = this.props;
    myLearningSummaryService!.findMyLearningSummary();
  }

  onChangePhoto() {
    //depot으로 이미지 변경구현
  }

  onSignOut() {
    //logout session 소멸
  }

  onChangeYear(year: number) {
    const { myLearningSummaryService } = this.props;
    myLearningSummaryService!.findMyLearningSummaryYear(year);
    this.setState({ year });
  }

  render() {
    const { skProfileService, myLearningSummaryService } = this.props;
    const { year } = this.state;
    const { skProfile } = skProfileService as SkProfileService;
    const { myLearningSummary } = myLearningSummaryService as MyLearningSummaryService;

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      const year = Number(currentYear) - i;

      //TODO:: 우선 2020이후로만
      if (year >= 2020) {
        years.push({ key: `${year}`, text: `${year}`, value: year });
      }
    }

    return (
      <div className="progress-info-wrap">
        <ProfileView
          skProfile={skProfile}
        />
        <LectureTotalTimeView
          year={year}
          totalLearningTime={myLearningSummary.totalLearningTime}
          suniLearningTime={myLearningSummary.suniLearningTime}
          myCompanyLearningTime={myLearningSummary.myCompanyLearningTime}
        />
        <StampInfoView
          stampCount={myLearningSummary.acheiveStampCount}
          year={year}
          years={years}
          onChangeYear={this.onChangeYear}
        />
      </div>
    );
  }
}

export default TitleContainer;
