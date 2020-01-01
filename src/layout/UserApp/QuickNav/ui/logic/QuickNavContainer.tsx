
import React, { Component } from 'react';
import { reactAutobind, WorkSpace, getCookie } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';

//import { tenantInfo } from '@nara.platform/dock';
import SiteMapModalContainer from '../../../QuickNav/ui/logic/SiteMapModalContainer';
import QuickNavWrapperView from '../view/QuickNavWrapperView';
import {
  MenuWrapperView, TopMenuItemView, BottomMenuItemView,
} from '../view/QuickNavElementsView';


interface Props extends RouteComponentProps {
}

interface State {
  active: boolean,
}


@reactAutobind
class QuickNavContainer extends Component<Props, State> {
  //
  //userRoles = tenantInfo.getTenantRoles();

  state = {
    active: false,
  };


  componentDidMount() {
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

  deactive() {
    this.setState({ active: false });
  }

  routeNav(path: string) {
    //
    this.props.history.push(path);
    this.onClickToggle();
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
        onClick={this.onClickToggle}
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
