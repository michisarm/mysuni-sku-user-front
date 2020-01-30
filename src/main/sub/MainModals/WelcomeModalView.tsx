
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Modal, Button, Icon, Checkbox } from 'semantic-ui-react';
import ModalState from './model/ModalState';


interface Props {
  modalState: ModalState,
  onClose: () => void,
  onCheckDisable: (e: any, data: any) => void,
}

@reactAutobind
@observer
class WelcomeModalView extends Component<Props> {
  //
  render() {
    //
    const { modalState, onClose, onCheckDisable } = this.props;

    return (
      <Modal className="w824 base" open={modalState.open}>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap4">
              <div className="welcome-message">
                <div className="tit">
                  <Icon className="sk-university-login" />
                  <span className="blind">mySUNI</span> Welcome Message
                </div>
                안녕하세요? SK 구성원 여러분!<br />
                변화된 SK, 그리고 우리의 행복을 위해,<br />
                스스로 학습하고 성장하는 場, <span>‘써니’(mySUNI)</span>가 드디어 문을 열었습니다!<br /><br />
                이 곳 <span>‘써니’</span>는 구성원 여러분이 주인이 되는 공간입니다.<br />
                여러분이 행복한 미래를 스스로 개척 하시는 데 도움이 될 다양한 학습 과정들을 마련했습니다.<br /><br />
                디지털 혁신을 이해하고 자신의 사업에서 활용할 수 있도록 <span>AI</span>와 <span>DT</span> 과정들을 준비했으며, <br />
                고객의 입장에서 생각하고 일하는 방식을 혁신하도록 <br />
                <span>혁신디자인</span>, <span>Management</span>, <span>Leadership</span> 및 <span>Global</span> 과정들을 마련하였습니다.<br />
                아울러, 우리가 지향하는 궁극적 가치인 사회적 가치와 행복을 체화하실 수 있도록,<br />
                <span>SV</span>와 <span>행복</span> 과정들을 준비하였습니다.<br /><br />
                <span>‘써니’</span>를 통해, 스스로를 성장시키고, 이를 업무에 활용하며, 다른 사람과 공유할 때,<br />
                막연하게만 보였던 SK의 Deep Change와 삶에서의 행복이 이루어질 것이라 확신하며,<br />
                <span>‘써니’</span>를 즐겁게 탐험하시고, 성취하는 기쁨을 누리시길 기원합니다!<br />
                <span>‘써니’</span>는 구성원 여러분 모두의 성장을 응원합니다~!!
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions4">
          <div className="left">
            <Checkbox label="다시 보지 않기" className="base" checked={modalState.disableChecked} onClick={onCheckDisable} />
          </div>
          <div className="right">
            <Button className="close" onClick={onClose}>Close</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default WelcomeModalView;
