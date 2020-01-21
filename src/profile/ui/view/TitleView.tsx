import React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon, Step, Modal } from 'semantic-ui-react';
import TitleText from './TitleText';

interface Props{
  step: number
}

interface State {
  open: boolean
}

@observer
@reactAutobind
class TitleView extends React.Component<Props, State> {
  //
  state = {
    open: false,
  };

  onOpenModal() {
    this.setState({
      open: true,
    });
  }

  onCloseModal() {
    this.setState({
      open: false,
    });
  }

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
          <TitleText step={step} />
          <Modal
            open={this.state.open}
            onOpen={this.onOpenModal}
            onClose={this.onCloseModal}
            className="base w1000"
            trigger={<Button className="intro-sk">mySUNI 소개</Button>}
          >
            <div className="log-intro-pop">
              <div className="popup-bg">
                <img src={`${process.env.PUBLIC_URL}/images/all/lo-07-05-img.png`} alt="mysuni" />
              </div>
              <h2 className="logo">mySUNI</h2>
              <div className="textbox1">mySUNI는 구성원 개인의 자기 성장과 행복 추구를 위해 <br />미래 성장 역량을 강화하는 새로운 학습 플랫폼입니다. </div>
              <div className="textbox2">또한, 학습 조직 구축을 위한 출발점으로<br /> Deep Change와 행복을 위한 선순환 Cycle을 만들어갑니다. </div>
              <div className="actions3">
                <button className="ui button w190 pop d" onClick={this.onCloseModal}>Close</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default TitleView;
