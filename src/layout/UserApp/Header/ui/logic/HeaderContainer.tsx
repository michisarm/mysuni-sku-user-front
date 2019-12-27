
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Context } from '../../../index';
import CategoryContainer from './CategoryContainer';
import HeaderWrapperView from '../view/HeaderWrapperView';
import {
  LogoView, MenuView, SearchBarView,
} from '../view/HeaderElementsView';
import BreadcrumbView from '../view/BreadcrumbView';
import ProfileContainer from './ProfileContainer';


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
          <ProfileContainer />
        </>
      </HeaderWrapperView>
    );
  }
}

export default HeaderContainer;
