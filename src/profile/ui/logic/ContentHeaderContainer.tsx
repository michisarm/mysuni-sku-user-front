import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { Button, Icon, Step } from 'semantic-ui-react';
import MySuniIntroModalContainer from './MySuniIntroModalContainer';
import ContentHeaderDescriptionView from '../view/ContentHeaderDescriptionView';
import SkProfileService from '../../present/logic/SkProfileService';

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
    const { reAgree } = skProfileService!;

    return (
      <div>
        <div className="header">
          <div className="logo">
            <Icon className="sk-university-login" />
            <span className="blind">my suni</span>
          </div>

          <Step.Group className="number-step">
            <Step active={step === 1} completed={step !== 1}>
              <Step.Content>
                <span className="number">
                  <span className="blind">1</span>
                </span>
                <Step.Title>안내</Step.Title>
              </Step.Content>
            </Step>
            <Step active={step === 2} completed={step > 2}>
              <Step.Content>
                <span className="number">
                  <span className="blind">2</span>
                </span>
                <Step.Title>개인정보동의</Step.Title>
              </Step.Content>
            </Step>
            <Step active={step === 3} completed={step > 3}>
              <Step.Content>
                <span className="number">
                  <span className="blind">3</span>
                </span>
                <Step.Title>현 직무</Step.Title>
              </Step.Content>
            </Step>
            <Step active={step === 4} completed={step > 4}>
              <Step.Content>
                <span className="number">
                  <span className="blind">4</span>
                </span>
                <Step.Title>관심 직무</Step.Title>
              </Step.Content>
            </Step>
            <Step active={step === 5} completed={step > 5}>
              <Step.Content>
                <span className="number">
                  <span className="blind">5</span>
                </span>
                <Step.Title>관심 분야</Step.Title>
              </Step.Content>
            </Step>
            <Step active={step === 6}>
              <Step.Content>
                <span className="number">
                  <span className="blind">6</span>
                </span>
                <Step.Title>학습방식</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </div>

        <div className="title-box">
          <Icon className={`login-sub${step} woman`} />

          <ContentHeaderDescriptionView step={step} />

          {/* <MySuniIntroModalContainer
            trigger={<Button className="intro-sk">mySUNI 소개</Button>}
          /> */}
        </div>
      </div>
    );
  }
}

export default ContentHeaderContainer;
