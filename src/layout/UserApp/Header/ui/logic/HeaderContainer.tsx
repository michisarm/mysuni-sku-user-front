import {
  mobxHelper,
  reactAutobind,
  ReactComponent,
} from '@nara.platform/accent';
import boardRoutePaths from 'board/routePaths';
import { setMenuAuthModel } from 'layout/UserApp/store/MenuAuthStore';
import { TempTopBannerContainer } from 'main/sub/Banner/ui/logic/TempTopBannerContainer';
import { inject, observer } from 'mobx-react';
import React, { createRef } from 'react';
import ReactGA from 'react-ga';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dimmer } from 'semantic-ui-react';
import { isExternalInstructor } from 'shared/helper/findUserRole';
import { findAvailablePageElementsCache } from '../../../../../lecture/shared/api/arrangeApi';
import { getQueryId, search } from '../../../../../search/search.events';
import SearchService from '../../../../../search/service/SearchService';
import { Context } from '../../../index';
import MainNotice from '../../../Notice';
import BreadcrumbView from '../view/BreadcrumbView';
import { LogoView, MenuView, SearchBarView } from '../view/HeaderElementsView';
import HeaderWrapperView from '../view/HeaderWrapperView';
import ProfileContainer from './ProfileContainer';

interface Props extends RouteComponentProps {}

interface State {
  isFixed: boolean;
  isTopBannerOpen: boolean;
}

interface Injected {
  searchService: SearchService;
}

@inject(mobxHelper.injectFrom('shared.searchService'))
@observer
@reactAutobind
class HeaderContainer extends ReactComponent<Props, State, Injected> {
  //
  static contextType = Context;

  state = {
    isFixed: false,
    isTopBannerOpen: true,
  };

  headerRef: React.RefObject<any> = createRef();

  supportPath = boardRoutePaths.supportNotice();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    const isExternal = isExternalInstructor();
    !isExternal && this.avaible(); //api호출을 위해서 3.30
    document.addEventListener('scroll', this.handleScroll);

    const { searchService } = this.injected;
    const { searchInfo } = searchService;

    // search 페이지의 헤더일 경우 최초 접근시 검색 입력 필드에 값 셋팅
    const isSearchPage = this.props.location.pathname.startsWith('/search');
    const isSearch =
      this.props.location.search !== null && this.props.location.search !== '';
    if (isSearchPage && isSearch && searchInfo.searchValue === '') {
      searchService.setSearchInfoValue('searchValue', getQueryId());
    }
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      // this.initSearchValue();
    }
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('scroll', this.handleScroll);
  }

  isMainAndSearchPage() {
    let url = window.location.pathname;

    if (process.env.NODE_ENV === 'development') {
      url = `/suni-main${url}`;
    }

    if (url === '/suni-main/pages/1' || url.includes('/suni-main/search')) {
      return true;
    }

    return false;
  }

  handleScroll = () => {
    if (!this.isMainAndSearchPage()) {
      return;
    }

    if (window.pageYOffset > 0) {
      this.setState({ isFixed: true });
    } else {
      this.setState({ isFixed: false });
    }
  };

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
  }

  onSearch() {
    //
    const { searchService } = this.injected;
    const { searchInfo } = searchService;
    // searchService.setSearchInfoValue(
    //   'recentSearchValue',
    //   searchInfo.searchValue
    // );
    // alert("점검중 입니다.")
    // 개발 시 주석 제거
    if (searchInfo.searchValue) {
      const { history } = this.props;
      if (!searchInfo.inAgain) {
        history.push(`/search?query=${searchInfo.searchValue}`);
        // window.location.href = encodeURI(`/search?query=${searchValue}`);
      } else {
        search(searchInfo.searchValue); // 결과내 재검색은 이미 /search 페이지에 들어와 있는 상태
      }

      setTimeout(() => {
        ReactGA.pageview(
          window.location.pathname + window.location.search,
          [],
          'search'
        );
      }, 1000);
    }
    searchService.setFocusedValue(false);
  }

  async onChangeSearchInput(value: string) {
    const { searchService } = this.injected;
    searchService.setSearchInfoValue('searchValue', value);
  }

  async findAutoCompleteValues(value: string) {
    //
    const { searchService } = this.injected;
    await searchService.findAutoCompleteValues(value);
  }

  setSearchInfoValue(name: string, value: any): void {
    //
    const { searchService } = this.injected;
    searchService.setSearchInfoValue(name, value);
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
  }

  onClickClearSearch() {
    const { searchService } = this.injected;
    searchService.setSearchInfoValue('searchValue', '');
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

  communityBreadCrumb() {
    if (this.props.location.pathname.includes('suni-community')) {
      return null;
    }
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

  async onSearchValue(value: string) {
    //
    const { searchService } = this.injected;
    const { searchInfo } = searchService;

    searchService.setSearchInfoValue('searchValue', value);
    if (!searchInfo.inAgain) {
      searchService.setSearchInfoValue('recentSearchValue', value);
    }
    await search(value);
    searchService.setFocusedValue(false);
  }

  closeSearch() {
    const { searchService } = this.injected;
    searchService.setFocusedValue(false);
  }

  async avaible() {
    const response = await findAvailablePageElementsCache();

    if (response) {
      setMenuAuthModel(response);
    }
  }

  onClickCloseTopBanner() {
    //
    this.setState({ isTopBannerOpen: false });
  }

  render() {
    //
    const { breadcrumb } = this.context;
    const { searchService } = this.injected;
    const { searchInfo, searchViewFocused, autoCompleteValues } = searchService;
    const { isTopBannerOpen } = this.state;

    const isSearchPage = this.props.location.pathname.startsWith('/search');
    const isSearch =
      this.props.location.search !== null && this.props.location.search !== '';

    const fixedClass: string =
      this.isMainAndSearchPage() && this.state.isFixed ? 'fixed' : '';

    return (
      // fixed: margin-bottom-80
      <div
        ref={this.headerRef}
        className={`${this.state.isFixed ? 'margin-bottom-80' : ''}`}
      >
        <HeaderWrapperView
          breadcrumbs={
            <BreadcrumbView
              values={breadcrumb.values}
              supportPath={this.supportPath}
            />
          }
          topBanner={
            (this.isMainAndSearchPage() && (
              <TempTopBannerContainer
                isTopBannerOpen={isTopBannerOpen}
                onClickCloseBanner={this.onClickCloseTopBanner}
              />
            )) ||
            null
          }
          // topBanner={<TopBannerContainer />}
          mainNotice={<MainNotice />}
          setSearchInfoValue={this.setSearchInfoValue}
          onSearch={this.onSearchValue}
          focused={searchViewFocused}
          searchInfo={searchInfo}
          autoCompleteValues={autoCompleteValues}
          fixedClass={fixedClass}
        >
          <>
            <LogoView onClickMenu={this.onClickMenu} />
            <MenuView onClickMenu={this.onClickMenu} />
            <SearchBarView
              searchInfo={searchInfo}
              setSearchValue={this.setSearchInfoValue}
              onSearch={this.onSearch}
              onChange={this.onChangeSearchInput}
              findAutoCompleteValues={this.findAutoCompleteValues}
              onClear={this.onClickClearSearch}
              onClick={this.onClickSearchInput}
              onBlur={this.onBlurSearchInput}
              isSearch={isSearchPage && isSearch}
              closeSearch={this.closeSearch}
            />
            <ProfileContainer onClickMenu={this.onClickMenu} />
          </>
        </HeaderWrapperView>
        <Dimmer
          className="dimm_zidx"
          active={searchViewFocused}
          page
          onClick={this.closeSearch}
        />
      </div>
    );
  }
}

export default withRouter(HeaderContainer);
