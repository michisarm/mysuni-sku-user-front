import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import ProfileView from '../view/title/ProfileView';
import LectureTotalTimeView from '../view/title/LectureTotalTimeView';
import StampInfoView from '../view/title/StampInfoView';
import FavoriteChannelView from '../view/title/FavoriteChannelView';
import { SkProfileModel, StudySummary } from '../../../profile';

interface Props {
  skProfile : SkProfileModel
  studySummary : StudySummary
  onFavoritChannelChange : ()=>void
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

  onFavoriteChannelChange() {
    //modal open
  }

  render() {
    const { skProfile, studySummary } = this.props;

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
        <FavoriteChannelView studySummary={studySummary} onFavoritChannelChange={this.onFavoriteChannelChange} />
      </div>
    );
  }
}

export default TitleContainer;
