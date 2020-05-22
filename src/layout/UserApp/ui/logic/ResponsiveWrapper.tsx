
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Responsive } from 'semantic-ui-react';


interface ResponsiveWrapperProps {
  children: React.ReactNode,
}

@reactAutobind
class ResponsiveWrapper extends Component<ResponsiveWrapperProps> {

  state = { isMobile : false };
  //
  render() {
    //
    const { children } = this.props;
    const filter = 'win16|win32|win64|mac|macintel';
    if ( filter.indexOf(navigator.platform.toLowerCase()) < 0 ) {
      this.setState({ isMobile : true });
    }

    return (
      <>
        { this.state.isMobile ?
          <>
            <ResponsiveEnvWrapper responsive={Responsive.onlyComputer}>{children}</ResponsiveEnvWrapper>
            <ResponsiveEnvWrapper responsive={Responsive.onlyTablet}>{children}</ResponsiveEnvWrapper>
            <ResponsiveEnvWrapper responsive={Responsive.onlyMobile}>{children}</ResponsiveEnvWrapper>
          </>
          :
          <>
            <ResponsiveEnvWrapper responsive={Responsive.contextType}>{children}</ResponsiveEnvWrapper>
          </>
        }
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
      <Responsive {...responsive}>
        {children}
      </Responsive>
    );
  }
}

export default ResponsiveWrapper;
