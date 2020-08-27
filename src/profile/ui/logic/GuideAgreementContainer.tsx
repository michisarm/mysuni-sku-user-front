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
import GuideAgreementView from '../view/GuideAgreementView';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
}

@inject(
  mobxHelper.injectFrom('college.collegeService', 'profile.skProfileService')
)
@observer
@reactAutobind
class GuideAgreementContainer extends Component<Props> {
  onCancel() {
    reactAlert({
      title: '알림',
      message:
        '<b>개인정보 처리방침에 동의하셔야</b><br/> <b>mySUNI 서비스 이용이 가능합니다.</b> <br /> <b>감사합니다.</b>',
    });
  }

  onConfirm() {
    const { history } = this.props;
    history.push(routePaths.personalInfoAgreement());
  }

  render() {
    const skProfileService = this.props.skProfileService!;
    const { reAgree } = skProfileService!;

    return (
      <div className="interest-content">
        <GuideAgreementView />

        <div className="button-area">
          {/* <Button className="fix line" onClick={this.onCancel}>
            Cancel
          </Button> */}
          <Button className="fix bg" onClick={this.onConfirm}>
            다음
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(GuideAgreementContainer);
