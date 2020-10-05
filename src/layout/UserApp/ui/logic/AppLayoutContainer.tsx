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
  children: React.ReactNode;
  skProfileService?: SkProfileService;
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
    //////////////////////////////////////////////////////////////
    // 재동의
    function compareDate(signDate: any) {
      let rtn = false;
      const reAgreeDate = new Date('2020-08-30').getTime();
      const agreeDate = new Date(signDate).getTime();
      if (reAgreeDate > agreeDate) {
        rtn = true;
      }
      return rtn;
    }

    const data = await SkProfileApi.instance.findSkProfile();
    const obj = JSON.parse(JSON.stringify(data));

    if (!obj.pisAgreement.signed) {
      window.location.href =
        process.env.PUBLIC_URL + profileRoutePaths.personalInfoAgreement();
    } else if (
      obj.pisAgreement.signed &&
      compareDate(obj.pisAgreement.date)
    ) {
      window.location.href =
        process.env.PUBLIC_URL + profileRoutePaths.guideAgreement();
    } else if (!obj.studySummaryConfigured) {
      window.location.href =
        process.env.PUBLIC_URL + profileRoutePaths.favoriteWelcome();
    } else if (obj.member && (
      (!obj.member.currentJobGroup ||
      !obj.member.currentJobGroup.currentJobGroup ||
      obj.member.currentJobGroup.currentJobGroup.id === ''))){
      window.location.href =
        process.env.PUBLIC_URL + profileRoutePaths.currentjobRe();
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
