
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  breadcrumbs: React.ReactNode,
  children: React.ReactNode,
  mainNotice: React.ReactNode
}


@reactAutobind
class HeaderWrapperView extends Component<Props> {
  //
  render() {
    //
    const { breadcrumbs, mainNotice, children } = this.props;

    return (
      <section className="header lms">
        {mainNotice}
        <div className="group">
          <div className="cont-inner">
            {children}
          </div>
        </div>

        {breadcrumbs}
      </section>
    );
  }
}

export default HeaderWrapperView;
