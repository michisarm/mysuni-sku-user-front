import React, { Component, createRef } from 'react';
import { reactAutobind } from '@nara.platform/accent';

interface Props {
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
  topBanner: React.ReactNode;
  mainNotice: React.ReactNode;
  open: boolean;
}

@reactAutobind
class HeaderWrapperView extends Component<Props> {
  //
  constructor(props: Props) {
    super(props);
  }

  render() {
    //
    const { breadcrumbs, topBanner, mainNotice, children, open } = this.props;

    return (
      <>
        {/* {topBanner} */}
        <section className="header main-sty2 lms-main" id="lms-header">
          {mainNotice}
          <div className={open ? 'group off' : 'group'}>
            <div className="cont-inner">{children}</div>
          </div>

          {breadcrumbs}
        </section>
      </>
    );
  }
}

export default HeaderWrapperView;
