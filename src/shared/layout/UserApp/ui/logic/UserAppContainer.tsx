
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import AppLayoutContainer from './AppLayoutContainer';


interface Props {
  children: React.ReactNode,
}

@reactAutobind
class UserAppContainer extends Component<Props> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <AppLayoutContainer>
        {children}
      </AppLayoutContainer>
    );
  }
}

export default UserAppContainer;
