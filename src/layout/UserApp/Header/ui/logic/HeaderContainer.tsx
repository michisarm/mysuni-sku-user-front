import React, { Component, createRef } from 'react';
import { reactAutobind, getCookie } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import boardRoutePaths from 'board/routePaths';
import { Context } from '../../../index';
import CategoryMenuContainer from './CategoryMenuContainer';
import ProfileContainer from './ProfileContainer';
import HeaderWrapperView from '../view/HeaderWrapperView';
import {
  LearningMenuView,
  LogoView,
  MenuView,
  SearchBarView,
} from '../view/HeaderElementsView';
import BreadcrumbView from '../view/BreadcrumbView';
import MainNotice from '../../../Notice';
import ReactGA from 'react-ga';
import { debounceActionTrack } from 'tracker/present/logic/ActionTrackService';
import { ActionTrackParam } from 'tracker/model/ActionTrackModel';
import { ActionType, Action, Area } from 'tracker/model/ActionType';
import { isExternalInstructor } from '../../../../../shared/helper/findUserRole';
import { TopBannerContainer } from '../../../../../main/sub/Banner/ui/logic/TopBannerContainer';
import { SearchHeaderFieldView } from '../../../../../search/views/SearchHeaderFieldView';

interface Props extends RouteComponentProps {}

interface State {
  searchValue: string;
  focused: boolean;
}

@reactAutobind
class HeaderContainer extends Component<Props, State> {
  //
  static contextType = Context;

  headerRef: React.RefObject<any> = createRef();

  supportPath = boardRoutePaths.supportNotice();

  state = {
    searchValue: '',
    focused: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.initSearchValue();
    }
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event: any) {
    if (!this.headerRef.current?.contains(event.target)) {
      this.setState({ focused: false });
    }
  }

  initSearchValue() {
    this.setState({ searchValue: '' });
  }

  onSearch() {
    //
    const { searchValue } = this.state;

    // alert("점검중 입니다.")
    // 개발 시 주석 제거
    if (searchValue) {
      const { history } = this.props;
      history.push(`/search?query=${searchValue}`);
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
        actionName: '헤더검색::' + searchValue,
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
    const { searchValue, focused } = this.state;
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
          open={focused}
        >
          <>
            <LogoView onClickMenu={this.onClickMenu} />
            <MenuView onClickMenu={this.onClickMenu} />
            <SearchBarView
              onSearch={this.onSearch}
              onChange={this.onChangeSearchInput}
              onClear={this.onClickClearSearch}
              onClick={this.onClickSearchInput}
              onBlur={this.onBlurSearchInput}
              isSearch={isSearchPage && isSearch}
            />
            {/* <CategoryMenuContainer /> */}
            {/*!isExternal && (
            <SearchBarView
              value={searchValue}
              focused={focused}
              onSearch={this.onSearch}
              onBlur={this.onBlurSearchInput}
              onClick={this.onClickSearchInput}
              onChange={this.onChangeSearchInput}
              onClear={this.onClickClearSearch}
              getPolyglotText={getPolyglotText}
            />
          )*/}
            <ProfileContainer onClickMenu={this.onClickMenu} />
          </>
        </HeaderWrapperView>
      </div>
    );
  }
}

export default withRouter(HeaderContainer);
