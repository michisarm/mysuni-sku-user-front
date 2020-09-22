
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ActionLogService } from 'shared/stores';
import boardRoutePaths from 'board/routePaths';
import { Context } from '../../../index';
import CategoryMenuContainer from './CategoryMenuContainer';
import ProfileContainer from './ProfileContainer';
import HeaderWrapperView from '../view/HeaderWrapperView';
import {
  LogoView, MenuView, SearchBarView,
} from '../view/HeaderElementsView';
import BreadcrumbView from '../view/BreadcrumbView';
import MainNotice from '../../../Notice';


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService,
}

interface State {
  searchValue: string,
  focused: boolean,
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
))
@reactAutobind
class HeaderContainer extends Component<Props, State> {
  //
  static contextType  = Context;

  supportPath = boardRoutePaths.supportNotice();

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
    const { actionLogService } = this.props;
    const { searchValue } = this.state;

    if (searchValue) {
      actionLogService?.registerClickActionLog({ subAction: 'search', subContext: searchValue, isEmpty: true });

      window.location.href = encodeURI(`/search?query=${searchValue}`);
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

  onClickMenu(menuName: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: menuName });
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
        // Notice
        mainNotice={(
          <MainNotice/>
        )}
      >
        <>
          <LogoView onClickMenu={this.onClickMenu} />
          <MenuView onClickMenu={this.onClickMenu} />
          <CategoryMenuContainer />

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
