
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { SkProfileService } from 'profile/stores';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { Image } from 'semantic-ui-react';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';


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
    const { skProfile } = skProfileService!;
    const { member } = skProfile;

    return (
      <div className="g-info">
        <button className="ui user image label" onClick={() => this.props.history.push(myTrainingRoutePaths.myPage())}>
          <span className="name">{member.name}</span>
          <span className="affiliation">{member.company} {member.department}</span>
          <Image src={skProfile.photoFilePath || profileImg} alt="profile" />
        </button>
      </div>
    );
  }
}

export default withRouter(ProfileContainer);
