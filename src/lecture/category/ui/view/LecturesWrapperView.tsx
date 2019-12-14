
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  header: React.ReactNode,
  children: React.ReactNode,
}

@reactAutobind
class LecturesWrapperView extends Component<Props> {
  //
  render() {
    //
    const {
      header, children,
    } = this.props;

    return (
      <div className="cont-wrap">
        <div className="section-top">
          {header}
        </div>

        <div className="section">
          {children}
        </div>
      </div>
    );
  }
}

export default LecturesWrapperView;
