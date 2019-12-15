import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import ProfileView from '../view/title/ProfileView';
import LectureTotalTimeView from '../view/title/LectureTotalTimeView';
import StampInfoView from '../view/title/StampInfoView';
import FavoriteChannelView from '../view/title/FavoriteChannelView';
import { SkProfileModel } from '../../../profile';

interface Props {
  skProfile : SkProfileModel
}


interface States{

}

@observer
@reactAutobind
class TitleContainer extends Component<Props, States> {

  onChangePhoto() {
    //depot으로 이미지 변경구현
  }

  onSignOut() {
    //logout session 소멸
  }

  render() {
    const { skProfile } = this.props;

    return (
      <div className="main-info-area">
        <div className="progress-info-wrap">
          <ProfileView skProfile={skProfile}
            onSignOut={this.onSignOut}
            onChangePhoto={this.onChangePhoto}
          />
          <LectureTotalTimeView />
          <StampInfoView />
        </div>
        <FavoriteChannelView skProfile={skProfile} />
      </div>
    );
  }
}

export default TitleContainer;
