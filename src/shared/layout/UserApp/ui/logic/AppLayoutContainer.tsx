
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import ResponsiveContainer from './ResponsiveContainerUser';


interface Props {
  children: React.ReactNode,
}

@reactAutobind
class AppLayoutContainer extends Component<Props> {

  render() {
    //
    const { children } = this.props;

    return (
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    );
  }
}

export default AppLayoutContainer;
