
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Modal } from 'semantic-ui-react';


interface Props {
  trigger: React.ReactNode;
}

interface State {
  open: boolean
}

@observer
@reactAutobind
class MySuniIntroModalContainer extends Component<Props, State> {
  //
  state = {
    open: false,
  };

  onOpenModal() {
    //
    this.setState({
      open: true,
    });
  }

  onCloseModal() {
    //
    this.setState({
      open: false,
    });
  }

  render() {
    //
    const { trigger } = this.props;
    const { open } = this.state;

    return (
      <Modal
        className="base w1000"
        trigger={trigger}
        open={open}
        onOpen={this.onOpenModal}
        onClose={this.onCloseModal}
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
    );
  }
}

export default MySuniIntroModalContainer;
