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
    } else if (obj.pisAgreement.signed && compareDate(obj.pisAgreement.date)) {
      window.location.href =
        process.env.PUBLIC_URL + profileRoutePaths.guideAgreement();
    } else if (!obj.studySummaryConfigured) {
      window.location.href =
        process.env.PUBLIC_URL + profileRoutePaths.favoriteWelcome();
      // skprofile.member_json.currentJobGroup
      // skprofile.member_json.favoriteJobGroup
      // 위 두개를 interface 하면서 날려버리네.. 직업군 거의 다 받은상태여서 아래로직 우선 막고 page 안넘어가게 함. and DB복원
      // } else if (obj.member && (
      //   (!obj.member.currentJobGroup ||
      //   !obj.member.currentJobGroup.currentJobGroup ||
      //   obj.member.currentJobGroup.currentJobGroup.id === ''))){
      //   window.location.href =
      //     process.env.PUBLIC_URL + profileRoutePaths.currentjobRe();
      // } else if (obj.member && (
      //   (!obj.member.favoriteJobGroup ||
      //   !obj.member.favoriteJobGroup.favoriteJobGroup ||
      //   obj.member.favoriteJobGroup.favoriteJobGroup.id === ''))){
      //   window.location.href =
      //     process.env.PUBLIC_URL + profileRoutePaths.favoriteJobRe();
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
