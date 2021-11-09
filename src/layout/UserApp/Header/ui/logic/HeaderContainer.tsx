import React, { Component, createRef, useEffect } from 'react';
import {
  reactAutobind,
  getCookie,
  ReactComponent,
  mobxHelper,
} from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import boardRoutePaths from 'board/routePaths';
import { Context } from '../../../index';
import ProfileContainer from './ProfileContainer';
import HeaderWrapperView from '../view/HeaderWrapperView';
import { LogoView, MenuView, SearchBarView } from '../view/HeaderElementsView';
import BreadcrumbView from '../view/BreadcrumbView';
import MainNotice from '../../../Notice';
import ReactGA from 'react-ga';
import { debounceActionTrack } from 'tracker/present/logic/ActionTrackService';
import { ActionTrackParam } from 'tracker/model/ActionTrackModel';
import { ActionType, Action, Area } from 'tracker/model/ActionType';
import { isExternalInstructor } from '../../../../../shared/helper/findUserRole';
import { TopBannerContainer } from '../../../../../main/sub/Banner/ui/logic/TopBannerContainer';
import SearchService from '../../../../../search/service/SearchService';
import { inject, observer } from 'mobx-react';

interface Props extends RouteComponentProps {}

interface State {}

interface Injected {
  searchService: SearchService;
}

@inject(mobxHelper.injectFrom('shared.searchService'))
@observer
@reactAutobind
class HeaderContainer extends ReactComponent<Props, State, Injected> {
  //
  static contextType = Context;

  headerRef: React.RefObject<any> = createRef();

  supportPath = boardRoutePaths.supportNotice();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      // this.initSearchValue();
    }
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event: any) {
    //
    const { searchService } = this.injected;
    if (!this.headerRef.current?.contains(event.target)) {
      searchService.setFocusedValue(false);
    }
  }

  initSearchValue() {
    //
    const { searchService } = this.injected;
    searchService.setSearchInfoValue('searchValue', '');
    // this.setState({ searchValue: '' });
  }

  onSearch() {
    //
    const { searchService } = this.injected;
    const { searchInfo } = searchService;
    console.log('search============');
    searchService.setSearchInfoValue(
      'recentSearchValue',
      searchInfo.searchValue
    );
    // alert("점검중 입니다.")
    // 개발 시 주석 제거
    if (searchInfo.searchValue) {
      const { history } = this.props;
      history.push(`/search?query=${searchInfo.searchValue}`);
      // window.location.href = encodeURI(`/search?query=${searchValue}`);

      // search track
      debounceActionTrack({
        email:
          (window.sessionStorage.getItem('email') as string) ||
          (window.localStorage.getItem('nara.email') as string) ||
          getCookie('tryingLoginId'),
        path: window.location.pathname,
        search: window.location.search,
        area: Area.SEARCH,
        actionType: ActionType.GENERAL,
        action: Action.SEARCH,
        actionName: '헤더검색::' + searchInfo.searchValue,
      } as ActionTrackParam);

      // react-GA logic
      setTimeout(() => {
        ReactGA.pageview(
          window.location.pathname + window.location.search,
          [],
          'search'
        );
      }, 1000);
    }
  }

  onChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { searchService } = this.injected;
    const { searchInfo } = searchService;
    if (searchInfo.errataValue) {
      // searchService.setSearchInfoValue('errataValue', '');
    }
    searchService.setSearchInfoValue('searchValue', e.target.value);
    // this.setState({ searchValue: e.target.value });
  }

  setSearchInfoValue(name: string, value: any): void {
    //
    const { searchService } = this.injected;
    searchService.setSearchInfoValue(name, value);
    // this.setState({ searchValue: value });
  }

  onClickSearchInput() {
    //
    const { searchService } = this.injected;
    searchService.setFocusedValue(true);
  }

  onBlurSearchInput() {
    //
    const { searchService } = this.injected;
    searchService.setFocusedValue(false);
    // this.setState({ focused: false });
  }

  onClickClearSearch() {
    const { searchService } = this.injected;
    searchService.setSearchInfoValue('searchValue', '');
    // this.setState({ searchValue: '' });
  }

  cleanSessionStorage() {
    sessionStorage.removeItem('lectureOffset');
    sessionStorage.removeItem('communityOffset');
    sessionStorage.removeItem('openCommunityOffset');
    sessionStorage.removeItem('postOffset');
    sessionStorage.removeItem('learningOffset');
    sessionStorage.removeItem('sortName');
    sessionStorage.removeItem('SCROLL_POS');
  }

  onClickMenu(menuName: string) {
    // react-GA logic
    if (menuName === 'mySUNI') {
      setTimeout(() => {
        ReactGA.pageview(
          window.location.pathname + window.location.search,
          [],
          `${menuName} 메인`
        );
      }, 1000);
    } else {
      setTimeout(() => {
        ReactGA.pageview(
          window.location.pathname + window.location.search,
          [],
          `${menuName}`
        );
      }, 1000);
    }
    this.cleanSessionStorage();
  }

  render() {
    //
    const { breadcrumb } = this.context;
    const { searchService } = this.injected;
    const { searchInfo, searchViewFocused } = searchService;

    const isExternal = isExternalInstructor();

    const isSearchPage = this.props.location.pathname === '/search';
    const isSearch =
      this.props.location.search !== null && this.props.location.search !== '';

    return (
      <div ref={this.headerRef}>
        <HeaderWrapperView
          breadcrumbs={
            <BreadcrumbView
              values={breadcrumb.values}
              supportPath={this.supportPath}
            />
          }
          // Notice
          topBanner={<TopBannerContainer />}
          mainNotice={<MainNotice />}
          setSearchInfoValue={this.setSearchInfoValue}
          focused={searchViewFocused}
          searchInfo={searchInfo}
        >
          <>
            <LogoView onClickMenu={this.onClickMenu} />
            <MenuView onClickMenu={this.onClickMenu} />
            <SearchBarView
              searchInfo={searchInfo}
              setSearchValue={this.setSearchInfoValue}
              onSearch={this.onSearch}
              onChange={this.onChangeSearchInput}
              onClear={this.onClickClearSearch}
              onClick={this.onClickSearchInput}
              onBlur={this.onBlurSearchInput}
              isSearch={isSearchPage && isSearch}
            />
            {/* <CategoryMenuContainer /> */}
            <ProfileContainer onClickMenu={this.onClickMenu} />
          </>
        </HeaderWrapperView>
      </div>
    );
  }
}

export default withRouter(HeaderContainer);
