
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import AppLayout from './AppLayout';


interface Props {
  children: React.ReactNode,
}

@reactAutobind
class UserApp extends Component<Props> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <AppLayout>
        {children}
      </AppLayout>
    );
  }
}

export default UserApp;
