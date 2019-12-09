
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import HeaderWrapperView from '../view/HeaderWrapperView';
import {
  LogoView, MenuView, SearchBarView, ProfileView, BreadcrumbsView,
} from '../view/HeaderElementsView';


@reactAutobind
class HeaderContainer extends Component {
  //
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
          <MenuView />
          <SearchBarView />
          <ProfileView />
        </>
      </HeaderWrapperView>
    );
  }
}

export default HeaderContainer;
