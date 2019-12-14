import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import HeaderWrapperView from '../view/HeaderWrapperView';
import { BreadcrumbsView, LogoView, MenuView, ProfileView, SearchBarView } from '../view/HeaderElementsView';


@reactAutobind
class HeaderContainer extends Component {
  //
  handleItemClick(data: any) {
    console.log(data);
    switch (data) {
      case 'learning':
        window.location.href = `${process.env.PUBLIC_URL}/expert/instructor`;
        break;
      case 'create':
        window.location.href = `${process.env.PUBLIC_URL}/cube/create`;
        break;

      case 'community':
        window.location.href = `${process.env.PUBLIC_URL}/board/support/notice`;
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
            handleItemClick={this.handleItemClick}
          />
          <SearchBarView />
          <ProfileView />
        </>
      </HeaderWrapperView>
    );
  }
}

export default HeaderContainer;
