import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { MyLearningSummaryService } from 'mypage/index';
import { SkProfileService } from 'profile';
import { mobxHelper } from 'shared';
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
      years.push(Number(currentYear) - i);
    }

    return (
      <div className="progress-info-wrap">
        <ProfileView skProfile={skProfile}
          onSignOut={this.onSignOut}
          onChangePhoto={this.onChangePhoto}
        />
        <LectureTotalTimeView
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
