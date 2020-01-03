
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SkProfileModel, SkProfileService } from 'profile';
import { Image } from 'semantic-ui-react';



interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService,
}

interface State {
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@observer
class ProfileContainer extends Component<Props, State> {
  //
  componentDidMount() {
    //
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile();
  }

  render() {
    //
    const { skProfileService } = this.props;

    const { skProfile } = skProfileService as SkProfileService;
    const { member } = skProfile as SkProfileModel;

    return (
      <div className="g-info">
        <button className="ui user image label">
          <span className="name">{member.name}</span>
          <span className="affiliation">{member.company}  {member.department}</span>
          <Image src={member && member.base64Photo || `${process.env.PUBLIC_URL}/images/all/profile-56-px.png`} alt="profile" />
        </button>
      </div>
    );
  }
}

export default withRouter(ProfileContainer);
