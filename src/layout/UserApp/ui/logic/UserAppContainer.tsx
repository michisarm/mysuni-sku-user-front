import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';

import AppContext, { BreadcrumbValue } from './AppContext';
import ResponsiveWrapper from './ResponsiveWrapper';

interface Props extends RouteComponentProps {
  children: React.ReactNode;
}

interface State {
  breadcrumbValues: BreadcrumbValue[];
}

@reactAutobind
class UserAppContainer extends Component<Props, State> {
  //
  state = {
    breadcrumbValues: [],
  };

  componentDidMount(): void {
    // set patronID
    ReactGA.set({ userId: patronInfo.getPatronId() });
    ReactGA.pageview(window.location.pathname + window.location.search);

    this.setLocalAuth();

    this.props.history.listen(location => {
      if (location.pathname === '/search') {
        setTimeout(() => {
          ReactGA.pageview(location.pathname, [], 'mySUNI 검색');
        }, 1000);
      } else {
        setTimeout(() => {
          ReactGA.pageview(location.pathname + window.location.search);
        }, 1000);
      }
    });
  }

  setLocalAuth() {
    //
    if (process.env.NODE_ENV !== 'development' && !patronInfo.isLogin()) {
      window.location.href = '/login';
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
      <AppContext.Provider value={this.getContext()}>
        <ResponsiveWrapper>{children}</ResponsiveWrapper>
      </AppContext.Provider>
    );
  }
}

export default withRouter(UserAppContainer);
