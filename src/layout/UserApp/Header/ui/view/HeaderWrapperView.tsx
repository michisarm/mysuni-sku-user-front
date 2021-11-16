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
}

@reactAutobind
class HeaderWrapperView extends Component<Props> {
  state = {
    isFixed: false,
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.addEventListener('scroll', this.handleScroll);
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

  isMainAndSearchPage() {
    const url = `${window.location.host}${window.location.pathname}`;

    if (
      url === `${window.location.host}/pages/1` ||
      url === `${window.location.host}/search`
    ) {
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

    const classNames = `header main-sty2 ${
      this.isMainAndSearchPage() && 'lms-main'
    }
    ${this.state.isFixed && 'fixed'}
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
          {!this.isMainAndSearchPage() && breadcrumbs}
        </section>
      </>
    );
  }
}

export default HeaderWrapperView;
