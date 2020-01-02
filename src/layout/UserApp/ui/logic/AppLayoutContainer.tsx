
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

// import Spinner from '../../../Spinner';
import Header from '../../Header';
import Footer from '../../Footer';
import QuickNav from '../../QuickNav';


interface Props {
  children: React.ReactNode,
}

@reactAutobind
class AppLayoutContainer extends Component<Props> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <>
        <Header />

        {/*<Spinner />*/}
        {children}
        <QuickNav />

        <Footer />
      </>
    );
  }
}

export default AppLayoutContainer;
