import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { SkProfileService } from 'profile/stores';
import { NotieService } from 'notie/stores';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { Image } from 'semantic-ui-react';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import HeaderAlarmView from '../view/HeaderAlarmView';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  notieService?: NotieService;
}

interface State {
  balloonShowClass: string;
}

@inject(mobxHelper.injectFrom('profile.skProfileService','notie.notieService'))
@reactAutobind
@observer
class ProfileContainer extends Component<Props, State> {
  profileButtonRef: any = React.createRef();

  state = {
    balloonShowClass: '',
  };

  //
  componentDidMount() {
    //
    const { skProfileService, notieService } = this.props;

    skProfileService!.findSkProfile();

    notieService!.findAllMyNotieMentions();

    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e: MouseEvent) {
    if (
      this.profileButtonRef &&
      !this.profileButtonRef.current.contains(e.target)
    ) {
      setTimeout(() => this.setState({ balloonShowClass: '' }), 500);
    }
  }

  onTogglePop() {
    const { balloonShowClass } = this.state;
    this.setState({ balloonShowClass: balloonShowClass ? '' : 'show' });
  }

  onLogout() {
    localStorage.clear();

    // localStorage.removeItem('nara.cineroomId');
    // localStorage.removeItem('nara.workspaces');
    // localStorage.removeItem('nara.token');
    // localStorage.removeItem('nara.displayName');
    // localStorage.removeItem('nara.companyCode');
    // localStorage.removeItem('nara.email');

    sessionStorage.clear();
    window.location.href = '/api/checkpoint/sso/logout';
    //window.location.href = 'https://proxy.gdisso.sk.com/nsso-authweb/logoff.do?ssosite=mysuni.sk.com&returnURL=https://mysuni.sk.com';
  }

  routeToAlarmBackLink(backLink:string) {
    this.props.history.push(backLink);
  }

  render() {
    //
    // const { skProfileService } = this.props;
    const { skProfile } = SkProfileService.instance;
    const { myNotieMentions } = NotieService.instance;
    const { member } = skProfile;
    const { balloonShowClass } = this.state;
    return (
      <div className="g-info">
        <button
          className="ui user image label"
          onClick={this.onTogglePop}
          ref={this.profileButtonRef}
        >
          <span className="name">{member.name}</span>
          <span className="affiliation">
            {member.company} {member.department}
          </span>
          <Image src={skProfile.photoFilePath || profileImg} alt="profile" />
        </button>
        <div className={`balloon-pop ${balloonShowClass}`}>
          <ul>
            <li>
              <a
                href="#"
                onClick={() =>
                  this.props.history.push(myTrainingRoutePaths.myPage())
                }
              >
                <i aria-hidden="true" className="balloon mypage icon" />
                <span>My Page</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => this.props.history.push('/community/my-profile')}
              >
                <i
                  aria-hidden="true"
                  className="balloon community-profile icon"
                />
                <span>Community Profile</span>
              </a>
            </li>
            <li>
              <button type="button" onClick={this.onLogout}>
                <i aria-hidden="true" className="balloon logout icon" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>

        <HeaderAlarmView
          myNotieMentions={myNotieMentions}
          routeToAlarmBackLink={this.routeToAlarmBackLink}
        />
      </div>
    );
  }
}

export default withRouter(ProfileContainer);
