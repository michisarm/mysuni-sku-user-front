import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

interface Props {
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
  topBanner: React.ReactNode;
  mainNotice: React.ReactNode;
}

@reactAutobind
class HeaderWrapperView extends Component<Props> {
  //
  render() {
    //
    const { breadcrumbs, topBanner, mainNotice, children } = this.props;

    return (
      <>
        {/* {topBanner} */}
        <section className="header main-sty2 lms-main" id="lms-header">
          {mainNotice}
          <div className="group off">
            <div className="cont-inner">{children}</div>
          </div>

          {breadcrumbs}
        </section>
      </>
    );
  }
}

export default HeaderWrapperView;
