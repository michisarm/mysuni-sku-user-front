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
  skProfileService?: SkProfileService;
}

@inject(
  mobxHelper.injectFrom('college.collegeService', 'profile.skProfileService')
)
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
      message:
        '<b>개인정보 처리방침에 동의하셔야</b><br/> <b>mySUNI 서비스 이용이 가능합니다.</b> <br /> <b>감사합니다.</b>',
    });
  }

  onConfirm() {
    //
    const skProfileService = this.props.skProfileService!;
    const { history } = this.props;
    const { skProfile, reAgree } = skProfileService!;
    const { mySuniChecked, domesticChecked, international } = this.state;

    if (!mySuniChecked || !domesticChecked || !international) {
      reactAlert({
        title: '알림',
        message: '개인정보 처리방침을 확인하시고 동의해주세요',
      });
      return;
    }

    skProfile.pisAgreement.signed = true;
    skProfile.pisAgreement.date = moment().format('YYYY-MM-DD');

    const skProfileUdo = SkProfileUdo.fromPisAgreement(
      new PisAgreementModel(skProfile.pisAgreement)
    );

    // 수정 api 처리될때까지 조회하면 안된다...... ㅡㅡ;
    skProfileService.modifySkProfile(skProfileUdo).then(() =>
      skProfileService.findSkProfile().then(skProfile => {
        // 재동의 : studySummaryConfigured === true 이면 홈으로 이동하는 로직이 있음.
        //         재동의는 무조건 현직무, 관심직무 다시 선택하게.
        if (reAgree) {
          history.push(routePaths.currentJob());
        } else if (skProfile.studySummaryConfigured) {
          history.push('/');
        } else {
          history.push(routePaths.favoriteWelcome());
        }
      })
    );
  }

  render() {
    //
    const { mySuniChecked, domesticChecked, international } = this.state;
    return (
      <div className="terms-content" style={{ paddingTop: '40px' }}>
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
          {/* <Button className="fix line" onClick={this.onCancel}>
              Cancel
            </Button> */}
          <div className="error">
            개인정보 제공 동의를 하지 않으시면 mySUNI 서비스를 이용 하실 수
            없습니다.
          </div>
          <Button className="fix bg" onClick={this.onConfirm}>
            다음
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(PersonalInfoAgreementContainer);
