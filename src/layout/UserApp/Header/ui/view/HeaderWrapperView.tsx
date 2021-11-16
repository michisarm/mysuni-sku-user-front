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
  //
  constructor(props: Props) {
    super(props);
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

    return (
      <>
        {/* {topBanner} */}
        <section className="header main-sty2 lms-main" id="lms-header">
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

          {breadcrumbs}
        </section>
      </>
    );
  }
}

export default HeaderWrapperView;
