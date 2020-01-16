
import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';

import { inject } from 'mobx-react';
import { SkProfileService } from 'profile';
import Header from '../../Header';
import Footer from '../../Footer';
import QuickNav from '../../QuickNav';


interface Props {
  children: React.ReactNode,
  skProfileService?: SkProfileService
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@reactAutobind
class AppLayoutContainer extends Component<Props> {
  //
  componentDidMount() {
    this.findProfile();
  }

  async findProfile() {
    if (process.env.NODE_ENV !== 'development') {
      const { skProfileService } = this.props;
      skProfileService!.findSkProfile().then(() => {
        const { skProfile } = skProfileService!;
        if (!skProfile.pisAgreement.signed) {
          window.location.href = '/login';
        }
      });
      skProfileService!.findStudySummary().then(() => {
        const { studySummary } = skProfileService!;
        if (!studySummary.favoriteLearningType || !studySummary.favoriteLearningType.idNames
        || !studySummary.favoriteLearningType.idNames.length
          || !studySummary.favoriteLearningType.idNames.filter(idName => idName.id !== 'etc').filter(idName => !idName.name).length) {
          window.location.href = '/login';
        }
      });

    }
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
