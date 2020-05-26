
import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import profileRoutePaths from 'profile/routePaths';
import { SkProfileService } from 'profile/stores';
import Header from '../../Header';
import Footer from '../../Footer';
import QuickNav from '../../QuickNav';
import SkProfileApi from '../../../../profile/present/apiclient/SkProfileApi';


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
    this.findProfile();
  }

  async findProfile() {
    if (process.env.NODE_ENV !== 'development') {
      const data = await SkProfileApi.instance.findSkProfile();
      const obj = JSON.parse(JSON.stringify(data));

      if (!obj.pisAgreement.signed) {
        window.location.href = process.env.PUBLIC_URL + profileRoutePaths.personalInfoAgreement();
      }
      else if (!obj.studySummaryConfigured) {
        window.location.href = process.env.PUBLIC_URL + profileRoutePaths.favoriteWelcome();
      }
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
