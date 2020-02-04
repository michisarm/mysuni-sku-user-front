
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon, Step } from 'semantic-ui-react';
import MySuniIntroModalContainer from './MySuniIntroModalContainer';
import FavoriteContentHeaderDescriptionView from '../view/FavoriteContentHeaderDescriptionView';


interface Props {
  step: number
}

@observer
@reactAutobind
class FavoriteContentHeaderContainer extends Component<Props> {
  //
  render() {
    const { step } = this.props;

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
                <span className="number"><span className="blind">1</span></span>
                <Step.Title>관심분야</Step.Title>
              </Step.Content>
            </Step>
            <Step active={step === 2} completed={step === 3}>
              <Step.Content>
                <span className="number"><span className="blind">2</span></span>
                <Step.Title>직무계획</Step.Title>
              </Step.Content>
            </Step>
            <Step active={step === 3}>
              <Step.Content>
                <span className="number"><span className="blind">3</span></span>
                <Step.Title>학습형태</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </div>

        <div className="title-box">
          <Icon className={`login-sub${step} woman`} />

          <FavoriteContentHeaderDescriptionView step={step} />

          <MySuniIntroModalContainer
            trigger={
              <Button className="intro-sk">mySUNI 소개</Button>
            }
          />
        </div>
      </div>
    );
  }
}

export default FavoriteContentHeaderContainer;
