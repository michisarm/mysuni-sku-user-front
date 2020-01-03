import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Icon, Modal } from 'semantic-ui-react';


interface Props {
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
}
interface States {
  open : boolean
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class LearningTimeModal extends Component<Props, States> {


  constructor(props:Props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  show() {
    this.setState({
      open: true,
    });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { size } = this.props;
    const { open } = this.state;

    return (
      <Modal size={size} open={open} onClose={this.close} className="base w700">

        <Modal.Header className="res">
          학습 이수 시간
          <span className="sub f12">SK University에서 이수한 학습 시간과 자사에서 인정 받은 학습 시간을 구분하여 확인하실 수 있습니다.</span>
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="completion-time">
              <div className="table-css">
                <div className="row head">
                  <div className="cell v-middle">
                    <Icon className="total-time16" /><span className="blind">total time</span>
                    <span className="text01">20.01.01 ~ 20.06.30</span>
                    <span className="text02">총 학습시간</span>
                  </div>
                  <div className="cell v-middle"><span className="text01">College 별 학습 시간</span>
                  </div>
                </div>
                <div className="row">
                  <div className="cell vtop">
                    <div className="legend">(단위 : 시간)</div>
                    <div className="total"><span>120</span><span
                      className="u"
                    >h
                    </span><span>00</span><span className="u">m</span>
                    </div>
                    <div className="chart">
                      <div className="ui pie w200" data-value="30">
                        <span className="left" />
                        <span className="right" />
                      </div>
                    </div>
                    <ul className="bullet-list1">
                      <li>
                        <span className="name b1">SK University</span>
                        <span className="time">14h 50m</span>
                      </li>
                      <li>
                        <span className="name b2">My company</span><span className="time">35h 30m</span>{/* sum(learningtime) */}
                      </li>
                    </ul>
                  </div>
                  <div className="cell vtop">
                    <ul className="bullet-list2"> {/* College별 learningtime map. hh-mm*/}
                      <li>
                        <span className="name b1">AI</span>
                        <span className="time">00h 00m</span>
                      </li>
                      <li>
                        <span className="name b2">Mgmt</span>
                        <span className="time">03h 35m</span>
                      </li>
                      <li>
                        <span className="name b3">Leadership</span>
                        <span className="time">00h 10m</span>
                      </li>
                      <li>
                        <span className="name b4">혁신디자인</span>
                        <span className="time">01h 28m</span>
                      </li>
                      <li>
                        <span className="name b5">DT</span>
                        <span className="time">08h 45m</span>
                      </li>
                      <li>
                        <span className="name b6">Global</span>
                        <span className="time">00h 00m</span>
                      </li>
                      <li>
                        <span className="name b7">행복</span>
                        <span className="time">00h 00m</span>
                      </li>
                      <li>
                        <span className="name b8">SV</span>
                        <span className="time">00h 00m</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={this.close}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default LearningTimeModal;
