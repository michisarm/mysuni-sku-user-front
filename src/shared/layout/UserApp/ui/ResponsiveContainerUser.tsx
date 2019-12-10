
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Responsive } from 'semantic-ui-react';

import Header from '../Header';
import Footer from '../Footer';
import QuickNav from '../QuickNav';


interface WrapperProps {
  children: React.ReactNode,
}

@reactAutobind
class ResponsiveContainerUser extends Component<WrapperProps> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <>
        <DesktopContainer>{children}</DesktopContainer>
        <TabletContainer>{children}</TabletContainer>
        <MobileContainer>{children}</MobileContainer>
      </>
    );
  }
}

// DesktopContainer
class DesktopContainer extends Component<WrapperProps> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Header />
        <section className="content">
          {children}
        </section>
        <QuickNav />
        <Footer />
      </Responsive>
    );
  }
}


// TabletContainer
class TabletContainer extends Component<WrapperProps> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <Responsive {...Responsive.onlyTablet}>
        <Header />
        <section className="content">
          {children}
        </section>
        <QuickNav />
        <Footer />
      </Responsive>
    );
  }
}


// MobileContainer
class MobileContainer extends Component {

  render() {
    const { children } = this.props;

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Header />
        <section className="content">
          {children}
        </section>
        <QuickNav />
        <Footer />
      </Responsive>
    );
  }
}

export default ResponsiveContainerUser;
