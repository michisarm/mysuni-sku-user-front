
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import profileImage from 'style/images/all/profile-56-px.png';


interface Props {
}

@reactAutobind
class ContentHeaderProfile extends Component<Props> {
  //
  render() {
    //
    return (
      <div className="cell-inner">
        <div className="profile">
          <div className="pic">
            <img src={profileImage} alt="Profile" />
          </div>
        </div>
        <div className="text-info">
          <div className="name">
            김유니
            <button className="ui orange-arrow2 button">My page</button>
          </div>
          <div className="part">
            <span>SK C&C</span>
            <span>플랫폼 개발 1팀</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentHeaderProfile;
