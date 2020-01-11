
import React, { Component } from 'react';
import { reactAutobind, mobxHelper, WorkSpace, WorkSpaceList, getCookie } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// import SockJs from 'sockjs-client';

//import { tenantInfo } from '@nara.platform/dock';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { FavoriteChannelChangeModal } from 'shared-component';
import { SkProfileService } from 'profile';
import SiteMapModalContainer from '../../../QuickNav/ui/logic/SiteMapModalContainer';
import QuickNavWrapperView from '../view/QuickNavWrapperView';
import {
  MenuWrapperView, TopMenuItemView, BottomMenuItemView,
} from '../view/QuickNavElementsView';
import { ChannelModel } from '../../../../../college';

// import FeedEventRdo from '../model/FeedEventRdo';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

interface State {
  active: boolean,
  feedType: string
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@observer
class QuickNavContainer extends Component<Props, State> {
  //
  //userRoles = tenantInfo.getTenantRoles();

  state = {
    active: false,
    feedType: '',
  };

  componentDidMount() {
    //
    this.props.skProfileService!.findStudySummary();
    window.addEventListener('click', this.deactive);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.deactive();
    }
  }

  genCitizenKey(workSpaceList:WorkSpaceList) {
    //
    let tenantId = '';

    if (workSpaceList.cineroomWorkspaces !== null && workSpaceList.cineroomWorkspaces) {
      //
      tenantId = workSpaceList.cineroomWorkspaces[0].tenantId;

    } else if (workSpaceList.pavilionWorkspaces !== null && workSpaceList.pavilionWorkspaces) {
      //
      tenantId = workSpaceList.pavilionWorkspaces[0].tenantId;
    }

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
    this.routeNav(myTrainingRoutePaths.learning());
  }

  onClickCommunity() {
    //
    this.setState( { feedType: '' } );
    this.routeNav(myTrainingRoutePaths.community());
  }

  onClickSupport() {
    //
    this.setState( { feedType: '' } );
    this.routeNav('/board/support/Notice');
  }

  onClickIntroduction() {
    //
    this.routeNav('/introduction');
  }

  onClickAdminSite() {
    //
    const adminSiteUrl = process.env.REACT_APP_ADMIN_SITE;

    if (adminSiteUrl) {
      window.open(adminSiteUrl);
    }
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { active } = this.state;
    const { studySummaryFavoriteChannels } = skProfileService!;

    let roles: string[] = [];

    if (getCookie('workspaces')) {
      const cineroomWorkspaces: WorkSpace[] = JSON.parse(getCookie('workspaces')).cineroomWorkspaces;
      const cineroomId: string = getCookie('cineroomId');
      const filteredWorkspaces: WorkSpace[] = cineroomWorkspaces.filter(workspace => workspace.id === cineroomId);
      if (filteredWorkspaces.length) {
        roles = filteredWorkspaces[0].roles;
      }
    }

    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );

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
              <FavoriteChannelChangeModal
                trigger={(
                  <BottomMenuItemView iconName="admin" text="관심 Channel" onClick={this.onClickToggle} />
                )}
                favorites={favoriteChannels}
                onConfirmCallback={() => {}}
              />
              <SiteMapModalContainer
                trigger={<BottomMenuItemView iconName="sitemap" text="Site Map" onClick={this.onClickToggle} />}
              />

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
