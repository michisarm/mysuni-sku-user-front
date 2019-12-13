
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import AppContext, { BreadcrumbValue } from './AppContext';
import AppLayoutContainer from './AppLayoutContainer';


interface Props {
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

export default UserAppContainer;
