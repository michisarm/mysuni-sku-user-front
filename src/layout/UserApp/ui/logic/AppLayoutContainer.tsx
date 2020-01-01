
import React, { Component } from 'react';
import { reactAutobind, WorkSpace, getCookie } from '@nara.platform/accent';

import Header from '../../Header';
import Footer from '../../Footer';
import QuickNav from '../../QuickNav';
import ResponsiveWrapper from './ResponsiveWrapper';


interface Props {
  children: React.ReactNode,
}

@reactAutobind
class AppLayoutContainer extends Component<Props> {
  //
  componentDidMount(): void {
    if (process.env.NODE_ENV !== 'development') {
      if (!getCookie('token') || !getCookie('cineroomId') || !getCookie('workspaces')) window.location.href = '/login';
      const cineroomWorkspaces: WorkSpace[] = JSON.parse(getCookie('workspaces')).cineroomWorkspaces;
      const filteredWorkspaces: WorkSpace[] = cineroomWorkspaces.filter(workspace => workspace.id === 'ne1-m2-c31');
      if (!filteredWorkspaces.length) window.location.href = '/mysuni';
    }
  }

  render() {
    //
    const { children } = this.props;

    return (
      <ResponsiveWrapper>
        <Header />
        {children}
        <QuickNav />
        <Footer />
      </ResponsiveWrapper>
    );
  }
}

export default AppLayoutContainer;
