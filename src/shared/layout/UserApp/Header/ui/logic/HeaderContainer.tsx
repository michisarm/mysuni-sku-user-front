
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


  handleItemClick(data: any) {
  /* handleItemClick(data: any) {
    switch (data) {
      case 'learning':
        window.location.href = `${process.env.PUBLIC_URL}/expert/instructor`;
        break;
      case 'create':
        window.location.href = `${process.env.PUBLIC_URL}/cube/create`;
        break;
    }
  }*/

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
          <MenuView
            handleItemClick = {this.handleItemClick}
          />
          <CategoryContainer />
          <MenuView />
          <SearchBarView />
          <ProfileView />
        </>
      </HeaderWrapperView>
    );
  }
}

export default HeaderContainer;
