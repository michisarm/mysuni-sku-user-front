
import React, { Component } from 'react';
import { reactAutobind, WorkSpace, getCookie } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import SockJs from 'sockjs-client';

//import { tenantInfo } from '@nara.platform/dock';
import SiteMapModalContainer from '../../../QuickNav/ui/logic/SiteMapModalContainer';
import QuickNavWrapperView from '../view/QuickNavWrapperView';
import {
  MenuWrapperView, TopMenuItemView, BottomMenuItemView,
} from '../view/QuickNavElementsView';
import FeedEventRdo from '../model/FeedEventRdo';

interface Props extends RouteComponentProps {
}

interface State {
  active: boolean,
  feedType: string
}


@reactAutobind
class QuickNavContainer extends Component<Props, State> {
  //
  //userRoles = tenantInfo.getTenantRoles();

  state = {
    active: false,
    feedType: '',
  };

  baseUrl = 'http://pigeon:8092/api/pigeon';
  // baseUrl = 'http://pigeon/api/pigeon';

  // transport = ['xdr-streaming',
  //   'xhr-streaming',
  //   'eventsource',
  //   'iframe-eventsource',
  //   'htmlfile',
  //   'iframe-htmlfile',
  //   'xdr-polling',
  //   'xhr-polling',
  //   'iframe-xhr-polling',
  //   'jsonp-polling'];

  componentDidMount() {
    //
    // const sockjs = new SockJs('http://127.0.0.1:8092/api/pigeon/pigeon', null, { transports: this.transport });
    const sockjs = new SockJs(this.baseUrl + '/pigeon');
    //const sockjs = new SockJs('http://pigeon:8080/api/pigeon/pigeon');

    sockjs.onopen = () => {
      sockjs.send('Attempt to connect socket..');
    };

    sockjs.onmessage = (event: any) => {
      //
      const feedEvent:FeedEventRdo = JSON.parse(event.data);

      const cookieCitizenKey:string = this.genCitizenKey(getCookie('audienceId'));

      if (cookieCitizenKey === feedEvent.citizenId) {
        this.setState( { feedType: feedEvent.feedType } );
      }

      console.log('COOKIE: ' + cookieCitizenKey);
      console.log('CITIZENID: ' + feedEvent.citizenId);
      console.log('FEEDTYPE: ' + feedEvent.feedType);
      //this.setState({feed: true});
    };

    window.addEventListener('click', this.deactive);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.deactive();
    }
    // if (prevState.active !== this.state.active && this.state.active) {
    //   window.addEventListener('click', this.deactive);
    // }
  }

  genCitizenKey(tenantId:string) {
    //
    const splitWholeId:string[] = tenantId.split('@');
    const pavilions:string[] = splitWholeId[0].split('-');
    const cinerooms:string[] = splitWholeId[1].split('-');

    return pavilions[0] + '@' + cinerooms[0] + '-' + cinerooms[1];
  }

  deactive() {
    this.setState({ active: false });
  }

  routeNav(path: string) {
    //
    this.props.history.push(path);
    this.onClickToggle();
  }

  onClickTop() {
    window.scrollTo(0, 0);
  }

  onClickToggle() {
    //
    this.setState((prevState) => ({
      active: !prevState.active,
    }));
  }

  onClickLearning() {
    //
    this.setState( { feedType: '' } );
    this.routeNav('/my-training');
  }

  onClickCommunity() {
    //
    this.setState( { feedType: '' } );
    this.routeNav('/community');
  }

  onClickSupport() {
    //
    this.setState( { feedType: '' } );
    this.routeNav('/board/support/Notice');
  }

  onClickIntroduction() {
    //
  }

  onClickSearch() {

  }

  onClickAdminSite() {
    //
    const adminSiteUrl = process.env.REACT_APP_ADMIN_SITE;

    if (adminSiteUrl) {
      window.location.href = adminSiteUrl;
    }
  }

  onClickInstructor() {
    //
    this.routeNav('/expert/instructor/:instructorId');
  }


  render() {
    //
    const { active } = this.state;
    let roles: string[] = [];
    if (getCookie('workspaces')) {
      const cineroomWorkspaces: WorkSpace[] = JSON.parse(getCookie('workspaces')).cineroomWorkspaces;
      const filteredWorkspaces: WorkSpace[] = cineroomWorkspaces.filter(workspace => workspace.id === 'ne1-m2-c31');
      if (filteredWorkspaces.length) {
        roles = filteredWorkspaces[0].roles;
      }
    }


    return (
      <QuickNavWrapperView
        active={active}
        onTop={this.onClickTop}
        onToggle={this.onClickToggle}
      >
        <MenuWrapperView
          topButtons={
            <>
              <TopMenuItemView iconName="learning32" feedType={this.state.feedType} text="Learning" onClick={this.onClickLearning} />
              <TopMenuItemView iconName="community32" feedType={this.state.feedType} text="Community" onClick={this.onClickCommunity} />
              <TopMenuItemView iconName="support32" feedType={this.state.feedType} text="Support" onClick={this.onClickSupport} />
            </>
          }
          bottomButtons={
            <>
              <BottomMenuItemView iconName="building" text="mySUNI Introduction" onClick={this.onClickIntroduction} />
              <SiteMapModalContainer
                trigger={<BottomMenuItemView iconName="sitemap" text="Site Map" />}
              />

              <BottomMenuItemView iconName="search" text="Search" onClick={this.onClickSearch} />
              <BottomMenuItemView iconName="search" text="Instructor" onClick={this.onClickInstructor} />
              {
                (roles.includes('CompanyManager') || roles.includes('CollegeManager') || roles.includes('SuperManager')) && (
                  <BottomMenuItemView iconName="admin" text="mySUNI Admin Site" onClick={this.onClickAdminSite} />
                )
              }
            </>
          }
        />
      </QuickNavWrapperView>
    );
  }
}

export default withRouter(QuickNavContainer);
