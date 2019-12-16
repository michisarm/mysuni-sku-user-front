
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  children: React.ReactNode,
}

@reactAutobind
class RightCell extends Component<Props> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <div className="right-area">
        {children}
      </div>
    );
  }
}

export default RightCell;
