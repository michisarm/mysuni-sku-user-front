import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentHeader } from 'shared';
import { SkProfileModel } from 'profile';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';


interface Props {
  skProfile : SkProfileModel
}

@observer
@reactAutobind
class ProfileView extends Component<Props> {
  render() {

    const { skProfile } = this.props;
    const { member } = skProfile;

    return (
      <ContentHeader.Cell inner>
        <ContentHeader.ProfileItem
          image={member && member.base64Photo || profileImg}
          name={member.name}
          company={member.company}
          department={member.department}
          imageEditable
        />
      </ContentHeader.Cell>
    );
  }
}

export default ProfileView;
