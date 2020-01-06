
import React, { Component } from 'react';
import { reactAutobind, mobxHelper, WorkSpace, getCookie } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

//import { tenantInfo } from '@nara.platform/dock';
import { FavoriteChannelChangeModal } from 'shared-component';
import { SkProfileService } from 'profile';
import SiteMapModalContainer from '../../../QuickNav/ui/logic/SiteMapModalContainer';
import QuickNavWrapperView from '../view/QuickNavWrapperView';
import {
  MenuWrapperView, TopMenuItemView, BottomMenuItemView,
} from '../view/QuickNavElementsView';
import { ChannelModel } from '../../../../../college';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

interface State {
  active: boolean,
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@observer
class QuickNavContainer extends Component<Props, State> {
  //
  //userRoles = tenantInfo.getTenantRoles();

  state = {
    active: false,
  };


  componentDidMount() {
    window.addEventListener('click', this.deactive);
    this.props.skProfileService!.findStudySummary();
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
    this.routeNav('/my-training');
  }

  onClickCommunity() {
    //
    this.routeNav('/community');
  }

  onClickSupport() {
    //
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
      window.location.href = adminSiteUrl;
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
      const filteredWorkspaces: WorkSpace[] = cineroomWorkspaces.filter(workspace => workspace.id === 'ne1-m2-c31');
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
              <TopMenuItemView iconName="learning32" text="Learning" onClick={this.onClickLearning} />
              <TopMenuItemView iconName="community32" text="Community" onClick={this.onClickCommunity} />
              <TopMenuItemView iconName="support32" text="Support" onClick={this.onClickSupport} />
            </>
          }
          bottomButtons={
            <>
              <BottomMenuItemView iconName="building" text="mySUNI Introduction" onClick={this.onClickIntroduction} />
              <SiteMapModalContainer
                trigger={<BottomMenuItemView iconName="sitemap" text="Site Map" onClick={this.onClickToggle} />}
              />
              <FavoriteChannelChangeModal
                trigger={(
                  <BottomMenuItemView iconName="admin" text="관심 Channel" onClick={this.onClickToggle} />
                )}
                favorites={favoriteChannels}
                onConfirmCallback={() => {}}
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
