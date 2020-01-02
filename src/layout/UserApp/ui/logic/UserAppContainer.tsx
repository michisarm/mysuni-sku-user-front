
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind, WorkSpace, WorkSpaceList, getCookie } from '@nara.platform/accent';

import AppContext, { BreadcrumbValue } from './AppContext';
import ResponsiveWrapper from './ResponsiveWrapper';


interface Props extends RouteComponentProps {
  children: React.ReactNode,
}

interface State {
  breadcrumbValues: BreadcrumbValue[],
}


@reactAutobind
class UserAppContainer extends Component<Props, State> {
  //
  state = {
    breadcrumbValues: [],
  };

  componentDidMount(): void {
    //
    // this.checkAndRedirectAuth();
    this.setLocalAuth();
  }

  setLocalAuth() {
    //
    if (process.env.NODE_ENV !== 'development') {
      if (!getCookie('token') || !getCookie('cineroomId') || !getCookie('workspaces')) window.location.href = '/login';
      const cineroomWorkspaces: WorkSpace[] = JSON.parse(getCookie('workspaces')).cineroomWorkspaces;
      const filteredWorkspaces: WorkSpace[] = cineroomWorkspaces.filter(workspace => workspace.id === 'ne1-m2-c31');
      if (!filteredWorkspaces.length) window.location.href = '/mysuni';
    }
  }

  checkAndRedirectAuth() {
    //
    const cineroomId = getCookie('cineroomId') || '';
    const workSpaces: WorkSpaceList = JSON.parse(`${getCookie('workspaces')}`);
    const cineroomSpaces = (workSpaces && workSpaces.cineroomWorkspaces || [])
      .filter((space: WorkSpace) => cineroomId && space.id && space.id === cineroomId);

    if (!cineroomSpaces.length) {
      // alert('로그인 필요');
      // window.location.href= window.location.origin + '/login';
    }
  }

  getContext() {
    //
    const { breadcrumbValues } = this.state;

    return {
      breadcrumb: {
        values: breadcrumbValues,
        setBreadcrumb: this.setContextBreadcrumb,
      },
    };
  }

  setContextBreadcrumb(breadcrumbValues: BreadcrumbValue[]) {
    //
    this.setState({ breadcrumbValues });
  }

  render() {
    //
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={this.getContext()}
      >
        <ResponsiveWrapper>
          {children}
        </ResponsiveWrapper>
      </AppContext.Provider>
    );
  }
}

export default withRouter(UserAppContainer);
