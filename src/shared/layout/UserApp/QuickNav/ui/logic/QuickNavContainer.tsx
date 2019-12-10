
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { tenantInfo } from '@nara.platform/dock';
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
  userRoles = tenantInfo.getTenantRoles();

  state = {
    active: false,
  };

  onClickToggle() {
    //
    this.setState((prevState) => ({
      active: !prevState.active,
    }));
  }

  onClickLearning() {

  }

  onClickCommunity() {

  }

  onClickSupport() {

  }

  onClickIntroduction() {
    //
    const { history } = this.props;
    console.log('router props', history);
    history.push('/');
  }

  onClickSiteMap() {

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


  render() {
    //
    const { active } = this.state;

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
              <BottomMenuItemView iconName="building" text="SK University Introduction" onClick={this.onClickIntroduction} />
              <BottomMenuItemView iconName="sitemap" text="Site Map" onClick={this.onClickSiteMap} />
              <BottomMenuItemView iconName="search" text="Search" onClick={this.onClickSearch} />
              { this.userRoles.includes('Admin') && (
                <BottomMenuItemView iconName="admin" text="SK University Admin Site" onClick={this.onClickAdminSite} />
              )}
            </>
          }
        />
      </QuickNavWrapperView>
    );
  }
}

export default withRouter(QuickNavContainer);
