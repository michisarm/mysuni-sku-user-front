
import React, { Component } from 'react';
import { reactAutobind, WorkSpace } from '@nara.platform/accent';
import ResponsiveContainer from './ResponsiveContainerUser';


interface Props {
  children: React.ReactNode,
}

@reactAutobind
class AppLayoutContainer extends Component<Props> {
  //
  componentDidMount(): void {
    if (process.env.NODE_ENV !== 'development') {
      if (!sessionStorage.token || !sessionStorage.cineroomId || !sessionStorage.workspaces) window.location.href = '/login';
      const cineroomWorkspaces: WorkSpace[] = JSON.parse(sessionStorage.workspaces).cineroomWorkspaces;
      const filteredWorkspaces: WorkSpace[] = cineroomWorkspaces.filter(workspace => workspace.id === 'ne1-m2-c31');
      if (!filteredWorkspaces.length) window.location.href = '/mysuni';
    }
  }

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
