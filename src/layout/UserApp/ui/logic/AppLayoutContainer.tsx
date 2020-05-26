
import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import profileRoutePaths from 'profile/routePaths';
import { SkProfileService } from 'profile/stores';
import Header from '../../Header';
import Footer from '../../Footer';
import QuickNav from '../../QuickNav';
import SkProfileApi from '../../../../profile/present/apiclient/SkProfileApi';
import SkProfileModel from '../../../../profile/model/SkProfileModel';
import {AnswerProgress} from '../../../../survey/answer/model/AnswerProgress';


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
    //setTimeout(this.findProfile,1000);
  }

  async findProfile() {
    //if (process.env.NODE_ENV !== 'development') {
    const { skProfileService } = this.props;

    // skProfileService?.clearSkProfile();

    const data = await SkProfileApi.instance.findSkProfile();
    console.log('data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ',JSON.stringify(data));
    const obj = JSON.parse(JSON.stringify(data));
    console.log('obj >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ',obj);

    if (!obj.pisAgreement.signed) {
      window.location.href = process.env.PUBLIC_URL + profileRoutePaths.personalInfoAgreement();
    }
    else if (!obj.studySummaryConfigured) {
      window.location.href = process.env.PUBLIC_URL + profileRoutePaths.favoriteWelcome();
    }

    // skProfileService!.findSkProfile().then(() => {
    //   const { skProfile } = skProfileService!;
    //
    //   if (!skProfile.pisAgreement.signed) {
    //     window.location.href = process.env.PUBLIC_URL + profileRoutePaths.personalInfoAgreement();
    //   }
    //   else if (!skProfile.studySummaryConfigured) {
    //     window.location.href = process.env.PUBLIC_URL + profileRoutePaths.favoriteWelcome();
    //   }
    // });
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
