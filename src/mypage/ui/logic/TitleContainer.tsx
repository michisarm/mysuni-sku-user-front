import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { MyLearningSummaryService } from 'mytraining';
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
  'skProfileService',
  'myTraining.myLearningSummaryService'
))
@observer
@reactAutobind
class TitleContainer extends Component<Props, States> {
  //
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

  onFavoriteChannelChange() {
    //modal open
  }

  render() {
    const { skProfileService, myLearningSummaryService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;
    const { myLearningSummary } = myLearningSummaryService as MyLearningSummaryService;

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
        />
      </div>
    );
  }
}

export default TitleContainer;
