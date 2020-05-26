
import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import moment from 'moment';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';
import SkProfileUdo from '../../model/SkProfileUdo';
import PisAgreementModel from '../../model/PisAgreementModel';
import PersonalInfoTermsView from '../view/PersonalInfoTermsView';


interface Props extends RouteComponentProps {
  skProfileService? : SkProfileService
}

@inject(mobxHelper.injectFrom('college.collegeService', 'profile.skProfileService'))
@observer
@reactAutobind
class PersonalInfoAgreementContainer extends Component<Props> {

  state = {
    mySuniChecked: false,
    domesticChecked: false,
    international: false,
  };

  onChangeAllCheck(e: any, checkProps: any) {
    //
    this.setState({
      mySuniChecked: checkProps.checked,
      domesticChecked: checkProps.checked,
      international: checkProps.checked,
    });
  }

  onChangeCheck(e: any, data: any) {
    //
    const { name } = data;

    this.setState({
      [name]: data.checked,
    });
  }

  onCancel() {
    //
    reactAlert({
      title: '알림',
      message: '<b>개인정보 처리방침에 동의하셔야</b><br/> <b>mySUNI 서비스 이용이 가능합니다.</b> <br /> <b>감사합니다.</b>',
    });
  }

  async onConfirm() {
    //
    const skProfileService = this.props.skProfileService!;
    const { history } = this.props;
    const { skProfile } = skProfileService!;
    const { mySuniChecked, domesticChecked, international } = this.state;

    if (!mySuniChecked || !domesticChecked || !international) {
      reactAlert({ title: '알림', message: '개인정보 처리방침을 확인하시고 동의해주세요' });
      return;
    }

    skProfileService.findSkProfile()
      .then(skProfile => {
        if (skProfile.studySummaryConfigured) {
          history.push('/');
        }
        else {
          history.push(routePaths.favoriteWelcome());
        }
      });

    skProfile.pisAgreement.signed = true;
    skProfile.pisAgreement.date = moment().format('YYYY-MM-DD');

    const skProfileUdo = SkProfileUdo.fromPisAgreement(new PisAgreementModel(skProfile.pisAgreement));
    await skProfileService.modifySkProfile(skProfileUdo);
  }

  render() {
    //
    const { mySuniChecked, domesticChecked, international } = this.state;

    return (
      <div className="terms-content">
        <div className="logo">
          <Icon className="sk-university-login" /><span className="blind">SUNI</span>
        </div>

        <h2 className="title1">mySUNI 개인정보 처리방침에 동의해주세요.</h2>

        <div className="join-agree-area">
          <ul>
            <li>
              <Checkbox
                className="base black"
                label="전체동의"
                checked={mySuniChecked && domesticChecked && international}
                onChange={this.onChangeAllCheck}
              />
            </li>
            <li>
              <Checkbox
                className="base"
                label="mySUNI 개인정보 처리방침 동의(필수)"
                name="mySuniChecked"
                checked={mySuniChecked}
                onChange={this.onChangeCheck}
              />
            </li>
            <li>
              <Checkbox
                className="base"
                label="제3자 정보제공에 대한 동의(필수)"
                name="domesticChecked"
                checked={domesticChecked}
                onChange={this.onChangeCheck}
              />
            </li>
            <li>
              <Checkbox
                className="base"
                label="국외 제3자 제공에 대한 동의(필수)"
                name="international"
                checked={international}
                onChange={this.onChangeCheck}
              />
            </li>
          </ul>
        </div>

        <PersonalInfoTermsView />

        <div className="button-area">
          <Button className="fix line" onClick={this.onCancel}>Cancel</Button>
          <Button className="fix bg" onClick={this.onConfirm}>OK</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(PersonalInfoAgreementContainer);
