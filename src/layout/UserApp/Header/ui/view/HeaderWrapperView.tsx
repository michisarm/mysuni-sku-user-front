import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { SearchHeaderFieldView } from '../../../../../search/views/SearchHeaderFieldView';
import SearchInfoModel from '../../../../../search/model/SeachInfoModel';

interface Props {
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
  topBanner: React.ReactNode;
  mainNotice: React.ReactNode;
  setSearchInfoValue: (name: string, value: any) => void;
  onSearch: (value: string) => void;
  focused: boolean;
  searchInfo: SearchInfoModel;
  autoCompleteValues: string[];
  fixedClass?: string;
}

@reactAutobind
class HeaderWrapperView extends Component<Props> {
  isCommunityPage() {
    let url = window.location.pathname;

    if (process.env.NODE_ENV === 'development') {
      url = `/suni-main${url}`;
    }

    if (url.includes('/suni-main/community/main')) {
      return true;
    }

    return false;
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

  render() {
    //
    const {
      breadcrumbs,
      topBanner,
      mainNotice,
      children,
      setSearchInfoValue,
      onSearch,
      focused,
      searchInfo,
      autoCompleteValues,
    } = this.props;

    const classNames = `header main-sty2 ${this.props.fixedClass || ''}
    `;

    return (
      <>
        {/* {topBanner} */}
        <section className={classNames} id="lms-header">
          {mainNotice}
          <div className={focused ? 'group off' : 'group'}>
            <div className="cont-inner">{children}</div>
            <SearchHeaderFieldView
              setSearchValue={setSearchInfoValue}
              searchInfo={searchInfo}
              onSearch={onSearch}
              autoCompleteValues={autoCompleteValues}
            />
          </div>
          {!(this.isMainAndSearchPage() || this.isCommunityPage()) &&
            breadcrumbs}
        </section>
      </>
    );
  }
}

export default HeaderWrapperView;
