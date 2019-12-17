
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  children: React.ReactNode,
}

@reactAutobind
class Wrapper extends Component<Props> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <div className="contents overview">
        {children}
      </div>
    );
  }
}

export default Wrapper;
