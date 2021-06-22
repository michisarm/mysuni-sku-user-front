import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button, Checkbox, Radio } from 'semantic-ui-react';
import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';
import { PisAgreementSdo } from '../../model/PisAgreementSdo';
import { registerPisAgreement } from '../../present/apiclient/SkProfileApi';
import {
  isExternalInstructor,
  isExternalUser,
} from '../../../shared/helper/findUserRole';
import { MySuniServiceTermView } from '../view/MySuniServiceTermView';
import { ContentTermView } from '../view/ContentTermView';
import { PersonalInfoTermView } from '../view/PersonalInfoTermView';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class PersonalInfoAgreementContainer extends Component<Props> {
  state = {
    mySuniChecked: false,
    domesticChecked: false,
    international: false,
    initCheckOne: false,
    initCheckTwo: false,
    initCheckThr: false,
  };

  onChangeAllCheck(e: any, checkProps: any) {
    //
    this.setState({
      initCheckOne: true,
      initCheckTwo: true,
      initCheckThr: true,
      mySuniChecked: true,
      domesticChecked: true,
      international: true,
    });
  }

  onChangeCheck(e: any, data: any) {
    // const { name } = data;
    // this.setState({
    //   [name]: data.checked,
    // });
    if (e === 'mySuniChecked') {
      this.setState({ initCheckOne: true });
    }
    if (e === 'domesticChecked') {
      this.setState({ initCheckTwo: true });
    }
    if (e === 'international') {
      this.setState({ initCheckThr: true });
    }

    this.setState({
      [e]: data,
    });
  }

  onConfirm() {
    //
    const skProfileService = this.props.skProfileService!;
    const { history } = this.props;
    const { skProfile, reAgree } = skProfileService!;
    const { mySuniChecked, domesticChecked, international } = this.state;
    const externalUser = isExternalUser();
    const externalInstructor = isExternalInstructor();

    if (!mySuniChecked || !international) {
      reactAlert({
        title: '알림',
        message: '개인정보 처리방침을 확인하시고 동의해주세요',
      });
      return;
    }

    const pisAgreementSdo: PisAgreementSdo = {
      agreementFormId: '20210622-1',
      serviceId: 'SUNI',
      optionalAgreements: [domesticChecked],
    };

    registerPisAgreement(pisAgreementSdo).then((result) => {
      if (result === undefined) {
        return;
      }

      if (externalUser) {
        history.push(routePaths.favoriteCollege());
        return;
      }

      if (externalInstructor) {
        history.push('/suni-instructor');
        return;
      }

      if (reAgree) {
        history.push(routePaths.currentJob());
      } else if (skProfile.studySummaryConfigured) {
        history.push('/');
      } else {
        history.push(routePaths.favoriteWelcome());
      }
    });

    // skProfile.pisAgreement.signed = true;
    // skProfile.pisAgreement.date = moment().format('YYYY-MM-DD');

    // const skProfileUdo = SkProfileUdo.fromPisAgreement(
    //   new PisAgreementModel(skProfile.pisAgreement)
    // );

    // // 수정 api 처리될때까지 조회하면 안된다...... ㅡㅡ;
    // skProfileService.modifySkProfile(skProfileUdo).then(() =>
    //   skProfileService.findSkProfile().then(skProfile => {
    //     // 재동의 : studySummaryConfigured === true 이면 홈으로 이동하는 로직이 있음.
    //     //         재동의는 무조건 현직무, 관심직무 다시 선택하게.
    //     if (reAgree) {
    //       history.push(routePaths.currentJob());
    //     } else if (skProfile.studySummaryConfigured) {
    //       history.push('/');
    //     } else {
    //       history.push(routePaths.favoriteWelcome());
    //     }
    //   })
    // );
  }

  render() {
    //
    const {
      initCheckOne,
      initCheckTwo,
      initCheckThr,
      mySuniChecked,
      domesticChecked,
      international,
    } = this.state;
    return (
      <div className="terms-content" style={{ paddingTop: '40px' }}>
        <div className="join-agree-area">
          <ul>
            <li style={{ display: 'none' }}>
              <Checkbox
                className="base black"
                label="전체동의"
                checked={mySuniChecked && domesticChecked && international}
                onChange={this.onChangeAllCheck}
              />
            </li>
            <li>
              <span className="agree-dot" />
              <span className="agree-cont" style={{ width: 969 }}>
                <b style={{ color: '#db1111' }}>[필수]</b> 홈페이지 회원가입 및
                관리 및 mySUNI 콘텐츠/서비스 제공
              </span>
              <Radio
                name="mySuniChecked"
                label="동의"
                className="base"
                checked={initCheckOne && mySuniChecked}
                onChange={() => this.onChangeCheck('mySuniChecked', true)}
                style={{ width: '100px' }}
              />
              <Radio
                name="mySuniChecked"
                label="미동의"
                className="base"
                checked={initCheckOne && !mySuniChecked}
                onChange={() => this.onChangeCheck('mySuniChecked', false)}
                style={{ width: '100px' }}
              />
            </li>
            <MySuniServiceTermView />
            <li style={{ marginTop: 20 }}>
              <span className="agree-dot" />
              <span className="agree-cont" style={{ width: 969 }}>
                [선택] 개인 맞춤형 특화 컨텐츠 제공
              </span>
              <Radio
                name="domesticChecked"
                label="동의"
                className="base"
                checked={initCheckTwo && domesticChecked}
                onChange={() => this.onChangeCheck('domesticChecked', true)}
                style={{ width: '100px' }}
              />
              <Radio
                name="domesticChecked"
                label="미동의"
                className="base"
                checked={initCheckTwo && !domesticChecked}
                onChange={() => this.onChangeCheck('domesticChecked', false)}
                style={{ width: '100px' }}
              />
            </li>
            <ContentTermView />
            <li style={{ marginTop: 20 }}>
              <span className="agree-dot" />
              <span className="agree-cont" style={{ width: 969 }}>
                <b style={{ color: '#db1111' }}>[필수]</b> 개인정보 처리방침
              </span>
              <Radio
                name="international"
                label="동의"
                className="base"
                checked={initCheckThr && international}
                onChange={() => this.onChangeCheck('international', true)}
                style={{ width: '100px' }}
              />
              <Radio
                name="international"
                label="미동의"
                className="base"
                checked={initCheckThr && !international}
                onChange={() => this.onChangeCheck('international', false)}
                style={{ width: '100px' }}
              />
            </li>
            <PersonalInfoTermView />
          </ul>
        </div>
        <div className="button-area">
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
