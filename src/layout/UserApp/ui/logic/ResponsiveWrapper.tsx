
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Responsive } from 'semantic-ui-react';


interface ResponsiveWrapperProps {
  children: React.ReactNode,
}

@reactAutobind
class ResponsiveWrapper extends Component<ResponsiveWrapperProps> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <>
        <ResponsiveEnvWrapper responsive={Responsive.onlyComputer}>{children}</ResponsiveEnvWrapper>
        <ResponsiveEnvWrapper responsive={Responsive.onlyTablet}>{children}</ResponsiveEnvWrapper>
        <ResponsiveEnvWrapper responsive={Responsive.onlyMobile}>{children}</ResponsiveEnvWrapper>
      </>
    );
  }
}


interface ResponsiveEnvWrapperProps {
  responsive: any,
  children: React.ReactNode,
}

class ResponsiveEnvWrapper extends Component<ResponsiveEnvWrapperProps> {
  //
  render() {
    //
    const { responsive, children } = this.props;

    return (
      <Responsive {...responsive} as={React.Fragment}>
        {children}
      </Responsive>
    );
  }
}

export default ResponsiveWrapper;
