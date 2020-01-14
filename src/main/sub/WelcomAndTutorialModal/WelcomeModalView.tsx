
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Checkbox, Modal } from 'semantic-ui-react';


interface Props {
  open: boolean,
  noMoreSeeChecked: boolean,
  onClose: () => void,
  onClickNoMoreSee: () => void,
}

@reactAutobind
@observer
class WelcomeModalView extends Component<Props> {
  //
  render() {
    //
    const { open, noMoreSeeChecked, onClose, onClickNoMoreSee } = this.props;

    return (
      <Modal open={open} className="w700 base">
        <Modal.Header>
          mySUNI Welcome Message
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap2">
              <div className="welcome-message">
                안녕하세요? SK 구성원 여러분!<br />
                변화된 SK, 그리고 우리의 행복을 위해, <br />
                스스로 학습하고 성장하는 場, <span>‘써니’(mySUNI)</span>가 드디어 문을 열었습니다!<br />
                이 곳 <span>‘써니’</span>는 구성원 여러분이 주인이 되는 공간입니다.<br />
                여러분이 행복한 미래를 스스로 개척하시는 데 도움이 될 다양한 학습 과정들을 마련했습니다.<br />
                디지털 혁신을 이해하고 자신의 사업에서 활용할 수 있도록 <span className="chip1">AI</span>와 <span className="chip2">DT</span> 과정들을 준비했으며,<br />
                고객의 입장에서 생각하고 일하는 방식을 혁신하도록 <span className="chip3">혁신디자인</span>, <span className="chip4">Management</span>,<br />
                <span className="chip5">Leadership</span> 및 <span className="chip6">Global</span> 과정들을 마련하였습니다.<br />
                아울러, 우리가 지향하는 궁극적 가치인 사회적 가치와 행복을 체화하실 수 있도록,<br />
                <span className="chip7">SV</span>와 <span className="chip8">행복</span> 과정들을 준비하였습니다.<br />
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
            <Checkbox label="오늘 하루 보지 않기" className="base" checked={noMoreSeeChecked} onClick={onClickNoMoreSee} />
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
