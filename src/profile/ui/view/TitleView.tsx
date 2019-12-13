import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon, Step } from 'semantic-ui-react';
import TitleText from './TitleText';

interface Props{
  step:number
  onSKIntroClick : ()=>void
}

@observer
@reactAutobind
class TitleView extends React.Component<Props> {

  render() {
    const { step,  onSKIntroClick } = this.props;

    return (
      <div>
        <div className="header">
          <div className="logo">
            <Icon className="sk-university-login" />
            <span className="blind">SK university</span>
          </div>
          <Step.Group>
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
          <Icon className="woman" />
          <TitleText step={step} />
          <Button className="intro-sk" onClick={onSKIntroClick}>SK university 소개</Button>
        </div>
      </div>
    );
  }
}

export default TitleView;
