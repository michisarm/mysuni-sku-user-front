import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import ProfileView from '../view/title/ProfileView';
import LectureTotalTimeView from '../view/title/LectureTotalTimeView';
import StampInfoView from '../view/title/StampInfoView';
import FavoriteChannelView from '../view/title/FavoriteChannelView';

@reactAutobind
class TitleContainer extends Component {
  render() {
    return (
      <div className="main-info-area">
        <div className="progress-info-wrap">
          <ProfileView />
          <LectureTotalTimeView />
          <StampInfoView />
        </div>
        <FavoriteChannelView />
      </div>
    );
  }
}

export default TitleContainer;
