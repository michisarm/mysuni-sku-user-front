
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
  balloonShowClass: string
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@observer
class ProfileContainer extends Component<Props, State> {
  balloonRef: any = React.createRef();

  state = {
    balloonShowClass: ''
  };

  //
  componentDidMount() {
    //
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile();

    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e: MouseEvent) {
    if (this.balloonRef && !this.balloonRef.current.contains(e.target)) {
      this.setState({balloonShowClass: ''});
    }
  }

  onTogglePop() {
    const {balloonShowClass} = this.state;
    this.setState({balloonShowClass: balloonShowClass?'':'show'});
  }

  onLogout() {
    localStorage.clear();
    window.location.href = '/api/checkpoint/sso/logout';
    //window.location.href = 'https://proxy.gdisso.sk.com/nsso-authweb/logoff.do?ssosite=mysuni.sk.com&returnURL=https://mysuni.sk.com';
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService!;
    const { member } = skProfile;
    const { balloonShowClass } = this.state;
    return (
      <div className="g-info">
        <button className="ui user image label" onClick={this.onTogglePop}>
          <span className="name">{member.name}</span>
          <span className="affiliation">{member.company} {member.department}</span>
          <Image src={skProfile.photoFilePath || profileImg} alt="profile" />
        </button>
        <div className={`balloon-pop ${balloonShowClass}`} ref={this.balloonRef}>
          <ul>
            <li>
              <a href="#" onClick={() => this.props.history.push(myTrainingRoutePaths.myPage())}>
                <i aria-hidden="true" className="balloon mypage icon"/><span>My Page</span>
              </a>
            </li>
            <li>
              <button type="button" onClick={this.onLogout}>
                <i aria-hidden="true" className="balloon logout icon"/><span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileContainer);
