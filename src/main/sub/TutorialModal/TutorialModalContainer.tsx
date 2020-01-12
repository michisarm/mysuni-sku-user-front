
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import Swiper from 'react-id-swiper';
import { Button, Modal, Checkbox, Image } from 'semantic-ui-react';


interface State {
  open: boolean
  noMoreSee: boolean
  noMoreSeeCheck: boolean
  step: number
}

@reactAutobind
@observer
class TutorialModal extends Component<{}, State> {
  //
  state = {
    open: false,
    noMoreSee: false,
    noMoreSeeCheck: false,
    step: 1,
  };

  PUBLIC_URL = process.env.PUBLIC_URL;

  LOCAL_STORAGE_KEY = 'mySUNI.noMoreSeeTutorial';

  swiperProps = {
    className: 'swiper-wrapper',
    effect: 'fade',
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    shouldComponentUpdate: true,
    renderNextButton: this.renderNext,
    renderPrevButton: this.renderPrev,
  };

  swiper?: any = undefined;


  componentDidMount(): void {
    //
    const noMoreSee = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);

    if (noMoreSee) {
      this.setState({ noMoreSee: true });
    }
    else {
      this.setState({ open: true });
    }
  }

  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    //
    const { noMoreSeeCheck } = this.state;

    if (noMoreSeeCheck) {
      window.localStorage.setItem(this.LOCAL_STORAGE_KEY, 'true');
    }

    this.setState({ open: false });
  }

  onClickNoMoreSee() {
    this.setState((state) => ({ noMoreSeeCheck: !state.noMoreSeeCheck }));
  }

  onClickNext() {
    this.setState((state) => ({
      step: state.step < 4 ? state.step + 1 : state.step,
    }));
  }

  onClickPrev() {
    console.log('prev');
  }

  renderNext() {
    return <div className="swiper-button-next" onClick={this.onClickNext} />;
  }

  renderPrev() {
    return <div className="swiper-button-prev" onClick={this.onClickPrev} />;
  }

  render() {
    //
    const { open, step, noMoreSee, noMoreSeeCheck } = this.state;
    const { swiperProps } = this;

    if (noMoreSee) {
      return null;
    }

    return (
      <Modal className="base w1000 tutorials" open={open} onClose={this.onClose}>
        <Modal.Header>
          mySUNI의 간단한 사용 방법을 알려드릴게요.
          <span className="counter">(<span className="now">{step}</span> / <span className="max">4</span>)</span>
          <div className="right-btn">
            <Checkbox label="더 이상 보지 않기" className="base" checked={noMoreSeeCheck} onClick={this.onClickNoMoreSee} />
            <Button className="close" onClick={this.onClose}>Close</Button>
          </div>
        </Modal.Header>
        <Modal.Content>
          <div className="tutorials-wrap swiper-section type3">
            <div className="swiper-container">
              <Swiper {...swiperProps}>
                <div className="swiper-slide">
                  <Image src={`${this.PUBLIC_URL}/images/all/img-info-01.png`} alt="tutorial1" />
                </div>
                <div className="swiper-slide">
                  <Image src={`${this.PUBLIC_URL}/images/all/img-info-02.png`} alt="tutorial2" />
                </div>
                <div className="swiper-slide">
                  <Image src={`${this.PUBLIC_URL}/images/all/img-info-03.png`} alt="tutorial3" />
                </div>
                <div className="swiper-slide">
                  <Image src={`${this.PUBLIC_URL}/images/all/img-info-04.png`} alt="tutorial4" />
                </div>
              </Swiper>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

export default TutorialModal;
