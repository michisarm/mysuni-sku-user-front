import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Image, Button, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { SkProfileModel } from '../../../../profile';

interface Props {
  skProfile : SkProfileModel
  onSignOut : ()=>void
  onChangePhoto : ()=>void
}

@observer
@reactAutobind
class ProfileView extends Component<Props> {
  render() {

    const { skProfile, onSignOut, onChangePhoto } = this.props;

    return (
      <div className="cell">
        <div className="cell-inner">
          <div className="profile">
            <div className="pic">
              <Image src="/images/all/profile-56-px.png" alt={skProfile.member.name} htmlFor="image_photo" /> {/* Image src= depot으로 upload되는 폴더의 skProfile.member.base64Photo*/}
            </div>
            <Button icon className="img-icon" onClick={onChangePhoto} id="image_photo"><Icon className="photo-edit" /></Button>
          </div>
          <div className="text-info">
            <div className="name">
              김지우{skProfile.member.name}
              <Button className="orange-arrow2" onClick={onSignOut}>My Page</Button>
            </div>
            <div className="part">
              <span>SK C&C{skProfile.member.team.company.name}</span><span>플랫폼 개발 1팀{skProfile.member.team.team.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
