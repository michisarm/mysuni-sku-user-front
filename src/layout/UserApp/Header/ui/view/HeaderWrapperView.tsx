
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  breadcrumbs: React.ReactNode,
  children: React.ReactNode,
}


@reactAutobind
class HeaderWrapperView extends Component<Props> {
  //
  render() {
    //
    const { breadcrumbs, children } = this.props;

    return (
      <section className="header">
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
