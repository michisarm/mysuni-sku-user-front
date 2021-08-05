import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { Icon } from 'semantic-ui-react';
import ContentHeaderDescriptionView from '../view/ContentHeaderDescriptionView';
import SkProfileService from '../../present/logic/SkProfileService';
import { ProfileSelectStepView } from '../view/ProfileSelectStepView';

interface Props {
  step: number;
  skProfileService?: SkProfileService;
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class ContentHeaderContainer extends Component<Props> {
  //
  render() {
    const { step } = this.props;
    const skProfileService = this.props.skProfileService!;
    const { skProfile } = skProfileService!;

    return (
      <div>
        <div className="header">
          <div className="logo">
            <Icon className="sk-university-login" />
            <span className="blind">my suni</span>
          </div>
          {/* 김민준 */}
          {/* {skProfile.studySummaryConfigured === false && (
            <ProfileSelectStepView step={step} />
          )} */}
        </div>
        <div className="title-box">
          <Icon className={`login-sub${step === 6 ? 3 : step} woman`} />
          <ContentHeaderDescriptionView step={step} />
        </div>
      </div>
    );
  }
}

export default ContentHeaderContainer;
