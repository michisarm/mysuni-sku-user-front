import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Image, Button, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { SkProfileModel } from 'profile';

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
    const { member } = skProfile as SkProfileModel;

    return (
      <div className="cell">
        <div className="cell-inner">
          <div className="profile">
            <div className="pic">
              <Image src={`${process.env.PUBLIC_URL}/images/all/img-profile-56-px.png`} alt={member.name} htmlFor="image_photo" /> {/* Image src= depot으로 upload되는 폴더의 skProfile.member.base64Photo*/}
            </div>
            <Button icon className="img-icon" onClick={onChangePhoto} id="image_photo"><Icon className="photo-edit" /></Button>
          </div>
          <div className="text-info">
            <div className="name">
              {member.name}
              <Button className="orange-arrow2" onClick={onSignOut}>My Page</Button>
            </div>
            <div className="part">
              <span>{member.company}</span><span>{member.department}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
