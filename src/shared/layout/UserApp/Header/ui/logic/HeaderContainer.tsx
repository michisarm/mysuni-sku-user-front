
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Context } from '../../..';
import CategoryContainer from './CategoryContainer';
import HeaderWrapperView from '../view/HeaderWrapperView';
import {
  LogoView, MenuView, SearchBarView, ProfileView,
} from '../view/HeaderElementsView';
import BreadcrumbView from '../view/BreadcrumbView';


@reactAutobind
class HeaderContainer extends Component {
  //
  static contextType  = Context;

  render() {
    //
    const { breadcrumb } = this.context;

    return (
      <HeaderWrapperView
        breadcrumbs={(
          <BreadcrumbView
            values={breadcrumb.values}
          />
        )}
      >
        <>
          <LogoView />
          <MenuView />
          <CategoryContainer />
          <SearchBarView />
          <ProfileView />
        </>
      </HeaderWrapperView>
    );
  }
}

export default HeaderContainer;
