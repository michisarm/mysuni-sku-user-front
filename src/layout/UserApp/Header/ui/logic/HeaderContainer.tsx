
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Context } from '../../../index';
import CategoryContainer from './CategoryContainer';
import HeaderWrapperView from '../view/HeaderWrapperView';
import {
  LogoView, MenuView, SearchBarView,
} from '../view/HeaderElementsView';
import BreadcrumbView from '../view/BreadcrumbView';
import ProfileContainer from './ProfileContainer';


interface Props extends RouteComponentProps {
}

interface State {
  searchValue: string,
  focused: boolean,
}

@reactAutobind
class HeaderContainer extends Component<Props, State> {
  //
  static contextType  = Context;

  supportPath = '/board/support/Notice';

  state = {
    searchValue: '',
    focused: false,
  };


  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.initSearchValue();
    }
  }

  initSearchValue() {
    this.setState({ searchValue: '' });
  }

  onSearch() {
    //
    const { searchValue } = this.state;

    if (searchValue) {
      window.location.pathname = `/search?query=${searchValue}`;
    }
  }

  onChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: e.target.value });
  }

  onClickSearchInput() {
    //
    this.setState({ focused: true });
  }

  onBlurSearchInput() {
    //
    this.setState({ focused: false });
  }

  onClickClearSearch() {
    this.setState({ searchValue: '' });
  }


  render() {
    //
    const { breadcrumb } = this.context;
    const { searchValue, focused } = this.state;

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

          <SearchBarView
            value={searchValue}
            focused={focused}
            onSearch={this.onSearch}
            onBlur={this.onBlurSearchInput}
            onClick={this.onClickSearchInput}
            onChange={this.onChangeSearchInput}
            onClear={this.onClickClearSearch}
          />

          <ProfileContainer />
        </>
      </HeaderWrapperView>
    );
  }
}

export default withRouter(HeaderContainer);
