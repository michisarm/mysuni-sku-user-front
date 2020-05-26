
import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import profileRoutePaths from 'profile/routePaths';
import { SkProfileService } from 'profile/stores';
import Header from '../../Header';
import Footer from '../../Footer';
import QuickNav from '../../QuickNav';


interface Props {
  children: React.ReactNode,
  skProfileService?: SkProfileService
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@observer
class AppLayoutContainer extends Component<Props> {
  //
  componentDidMount() {
    setTimeout(this.findProfile,1000);
  }

  async findProfile() {
    //if (process.env.NODE_ENV !== 'development') {
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile().then(() => {
      const { skProfile } = skProfileService!;

      console.log('skProfile.pisAgreement.signed ::::::::::::: '+skProfile.pisAgreement.signed);
      console.log('!skProfile.pisAgreement.signed ::::::::::::: '+!skProfile.pisAgreement.signed);

      if (!skProfile.pisAgreement.signed) {
        window.location.href = process.env.PUBLIC_URL + profileRoutePaths.personalInfoAgreement();
      }
      else if (!skProfile.studySummaryConfigured) {
        window.location.href = process.env.PUBLIC_URL + profileRoutePaths.favoriteWelcome();
      }
    });
    //}
  }

  render() {
    //
    const { children } = this.props;

    return (
      <>
        <Header />

        {children}

        <QuickNav />
        <Footer />
      </>
    );
  }
}

export default AppLayoutContainer;
