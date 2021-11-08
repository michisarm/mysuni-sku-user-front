import React, { Component, createRef } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { SearchHeaderFieldView } from '../../../../../search/views/SearchHeaderFieldView';
import { search } from '../../../../../search/search.events';
import SearchInfoModel from '../../../../../search/model/SeachInfoModel';

interface Props {
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
  topBanner: React.ReactNode;
  mainNotice: React.ReactNode;
  setSearchInfoValue: (name: string, value: any) => void;
  focused: boolean;
  searchInfo: SearchInfoModel;
}

@reactAutobind
class HeaderWrapperView extends Component<Props> {
  //
  constructor(props: Props) {
    super(props);
  }

  async onSearch(value: string) {
    //
    this.props.setSearchInfoValue('searchValue', value);
    if (!this.props.searchInfo.inAgain) {
      this.props.setSearchInfoValue('recentSearchValue', value);
    }
    await search(value);
  }

  render() {
    //
    const {
      breadcrumbs,
      topBanner,
      mainNotice,
      children,
      setSearchInfoValue,
      focused,
    } = this.props;

    return (
      <>
        {/* {topBanner} */}
        <section className="header main-sty2 lms-main" id="lms-header">
          {mainNotice}
          <div className={focused ? 'group off' : 'group'}>
            <div className="cont-inner">{children}</div>
            <SearchHeaderFieldView
              setSearchValue={setSearchInfoValue}
              onSearch={this.onSearch}
            />
          </div>

          {breadcrumbs}
        </section>
      </>
    );
  }
}

export default HeaderWrapperView;
