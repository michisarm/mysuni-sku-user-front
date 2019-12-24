import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import ProfileView from '../view/title/ProfileView';
import LectureTotalTimeView from '../view/title/LectureTotalTimeView';
import StampInfoView from '../view/title/StampInfoView';
import { SkProfileService } from '../../../profile';

interface Props {
  skProfileService? : SkProfileService
}


interface States{

}

@inject('skProfileService', 'collegeService')
@observer
@reactAutobind
class TitleContainer extends Component<Props, States> {

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
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;

    return (
      <div className="progress-info-wrap">
        <ProfileView skProfile={skProfile}
          onSignOut={this.onSignOut}
          onChangePhoto={this.onChangePhoto}
        />
        <LectureTotalTimeView />
        <StampInfoView />
      </div>
    );
  }
}

export default TitleContainer;
