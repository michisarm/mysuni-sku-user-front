import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Image, Button, Icon } from 'semantic-ui-react';

@reactAutobind
class ProfileView extends Component {
  render() {
    return (
      <div className="cell">
        <div className="cell-inner">
          <div className="profile">
            <div className="pic">
              <Image src="/images/all/profile-56-px.png" alt="프로필사진 임시이미지" />
            </div>
            <Button icon className="img-icon"><Icon className="photo-edit" /></Button>
          </div>
          <div className="text-info">
            <div className="name">
              김유니
              <Button className="orange-arrow2">Sign out</Button>
            </div>
            <div className="part">
              <span>SK C&C</span><span>플랫폼 개발 1팀</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
