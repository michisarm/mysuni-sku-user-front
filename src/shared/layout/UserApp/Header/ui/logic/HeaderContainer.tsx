
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import HeaderWrapperView from '../view/HeaderWrapperView';
import {
  LogoView, MenuView, SearchBarView, ProfileView, BreadcrumbsView,
} from '../view/HeaderElementsView';


@reactAutobind
class HeaderContainer extends Component {
  //
  handleItemClick(data: any) {
    switch (data) {
      case 'learning':
        window.location.href = `${process.env.PUBLIC_URL}/expert/instructor`;
        break;
    }
  }

  render() {
    //
    return (
      <HeaderWrapperView
        breadcrumbs={(
          <BreadcrumbsView />
        )}
      >
        <>
          <LogoView />
          <MenuView
            handleItemClick = {this.handleItemClick}
          />
          <SearchBarView />
          <ProfileView />
        </>
      </HeaderWrapperView>
    );
  }
}

export default HeaderContainer;
