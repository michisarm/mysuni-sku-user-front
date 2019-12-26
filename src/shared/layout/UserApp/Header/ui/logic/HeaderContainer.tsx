
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Context } from '../../..';
import CategoryContainer from '../../../../../../mypage/ui/logic/CategoryContainer';
import HeaderWrapperView from '../view/HeaderWrapperView';
import {
  LogoView, MenuView, SearchBarView, ProfileView,
} from '../view/HeaderElementsView';
import BreadcrumbView from '../view/BreadcrumbView';


@reactAutobind
class HeaderContainer extends Component {
  //
  static contextType  = Context;

  supportPath = '/board/support/Notice';


  render() {
    //
    const { breadcrumb } = this.context;

    return (
      <HeaderWrapperView
        breadcrumbs={(
          <BreadcrumbView
            values={breadcrumb.values}
            supportPath={this.supportPath}
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
