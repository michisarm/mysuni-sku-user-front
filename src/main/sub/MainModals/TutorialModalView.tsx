
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Modal, Checkbox, Image } from 'semantic-ui-react';
import ModalState from './model/ModalState';


interface Props {
  modalState: ModalState,
  onClose: () => void,
  onCheckDisable: (e: any, data: any) => void,
}

interface State {
  step: number
  hasPrev: boolean
  hasNext: boolean
}

@reactAutobind
@observer
class TutorialModalView extends Component<Props, State> {
  //
  PUBLIC_URL = process.env.PUBLIC_URL;

  steps = [
    <Image src={`${this.PUBLIC_URL}/images/all/img-info-01.png`} alt="swiper1" />,
    <Image src={`${this.PUBLIC_URL}/images/all/img-info-02.png`} alt="swiper2" />,
    <Image src={`${this.PUBLIC_URL}/images/all/img-info-03.png`} alt="swiper3" />,
    <Image src={`${this.PUBLIC_URL}/images/all/img-info-04.png`} alt="swiper4" />,
  ];

  state = {
    step: 0,
    hasPrev: false,
    hasNext: false,
  };

  componentDidMount(): void {
    //
    this.init();
  }

  init() {
    //
    const { steps } = this;

    if (steps.length > 0) {
      this.setState({ hasNext: true });
    }
  }

  onClickPrev() {
    //
    this.setState((state) => ({
      step: state.hasPrev ? state.step - 1 : state.step,
      hasPrev: state.step - 1 > 0,
      hasNext: true,
    }));
  }

  onClickNext() {
    //
    this.setState((state) => ({
      step: state.hasNext ? state.step + 1 : state.step,
      hasPrev: true,
      hasNext: state.step + 1 < this.steps.length - 1,
    }));
  }

  render() {
    //
    const { modalState, onCheckDisable, onClose } = this.props;
    const { step, hasPrev, hasNext }  = this.state;
    const { steps } = this;

    return (
      <Modal className="base w1000 tutorials" open={modalState.open}>
        <Modal.Header>
          mySUNI의 간단한 사용 방법을 알려드릴게요.
          <span className="counter">(<span className="now">{step + 1}</span> / <span className="max">{steps.length}</span>)</span>
          <div className="right-btn">
            <Checkbox label="다시 보지 않기" className="base" checked={modalState.disableChecked} onClick={onCheckDisable} />
            <Button className="close" onClick={onClose}>Close</Button>
          </div>
        </Modal.Header>
        <Modal.Content>
          <div className="tutorials-wrap swiper-section type3">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {steps[step]}
              </div>
              <Button className="swiper-button-next" disabled={!hasNext} onClick={this.onClickNext} />
              <Button className="swiper-button-prev" disabled={!hasPrev} onClick={this.onClickPrev} />
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

export default TutorialModalView;
