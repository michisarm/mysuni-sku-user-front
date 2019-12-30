
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind, WorkSpace, WorkSpaceList } from '@nara.platform/accent';

import AppContext, { BreadcrumbValue } from './AppContext';
import AppLayoutContainer from './AppLayoutContainer';


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
  }

  checkAndRedirectAuth() {
    //
    const cineroomId = sessionStorage.getItem('cineroomId') || '';
    const workSpaces: WorkSpaceList = JSON.parse(`${sessionStorage.getItem('workspaces')}`);
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
        <AppLayoutContainer>
          {children}
        </AppLayoutContainer>
      </AppContext.Provider>
    );
  }
}

export default withRouter(UserAppContainer);
