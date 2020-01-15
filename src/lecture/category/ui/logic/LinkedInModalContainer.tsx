
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import moment from 'moment';
import { Button, Checkbox, Image, Modal } from 'semantic-ui-react';


interface Props {
  enabled: boolean
}

interface State {
  open : boolean
  noMoreSee: boolean
  noMoreSeeChecked: boolean
}

@reactAutobind
class LinkedInModal extends Component<Props, State> {
  //
  PUBLIC_URL = process.env.PUBLIC_URL;

  LOCAL_STORAGE_KEY = 'mySUNI.noDaySeeLinkedIn';

  state = {
    open: true,
    noMoreSee: false,
    noMoreSeeChecked: false,
  };

  componentDidMount(): void {
    this.initFromStorage();
  }

  initFromStorage() {
    //
    const noMoreSee = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);

    if (noMoreSee) {
      const dateNumber = JSON.parse(noMoreSee);
      const noMoreSeeDate = moment(dateNumber).add(1, 'day');
      const now = moment();

      if (now.isBefore(noMoreSeeDate)) {
        this.setState({ noMoreSee: true });
        return;
      }
    }

    this.setState({ open: true });
  }

  onOpen() {
    //
    this.setState({ open: true });
  }

  onClose() {
    //
    const noMoreSeeChecked = this.state.noMoreSeeChecked;
    const now = moment();

    if (noMoreSeeChecked) {
      window.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(now.valueOf()));
    }
    this.setState({ open: false });
  }

  onCheckNoMoreSee() {
    this.setState((state) => ({
      noMoreSeeChecked: !state.noMoreSeeChecked,
    }));
  }

  render() {
    //
    const { enabled } = this.props;
    const { noMoreSee, noMoreSeeChecked, open } = this.state;

    if (noMoreSee || !enabled) {
      return null;
    }

    return (
      <Modal open={open} className="w1000 base linkedin">
        <Modal.Header>
          LinkedIn 최초 접속 시 학습 방법 안내
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap2">
              <div className="linkedin-cont">
                <ul className="txt-box">
                  <li>
                    <div className="text1">
                      1. Linkedin 과정을 처음 학습하는 경우, 아래와 같이 기존에 개인이 보유하고 있는
                      ‘Linkedin 계정’과 연동하여 사용할 것인지를 확인하는 화면이 보여집니다.
                    </div>
                  </li>
                  <li>
                    <div className="text1">
                      2. 기존에 개인이 보유하고 있는 계정과 연결하지 않고 &#39;mySUNI 계정&#39;과 &#39;기존
                      Linkedin 계정&#39;을 연결하여 학습하고 싶을 경우,
                    </div>
                    <div className="text2">
                      <span className="bold">아래 표시된</span> <span className="red bold">①</span>번, <span className="red bold">②</span>번을 순서대로 클릭하시면,
                      <span className="bold">‘mySUNI’ 계정과 동기화</span>가 완료됩니다.
                    </div>
                    <div className="text2">
                      <span className="red">최초 연결 이후에는 학습할 때 마다 별도 로그인 할 필요가 없습니다.</span>
                    </div>
                  </li>
                  <li>
                    <div className="text1">
                      3. 개인 Linkedin 계정과 연결하여 학습하고 싶은 경우, 개인이 보유한 Linkedin
                      계정의 ID/PW를 입력하셔야 하며,
                    </div>
                    <div className="text2">
                      아래 표시된 <span className="red bold">③</span>번을 클릭 후
                      LinkedIn 개인 계정을 입력하시면 연동이 완료 됩니다.
                    </div>
                    <div className="text2">
                      LinkedIn 과정을 <span className="red">학습할 때 마다 개인 계정을 입력</span>하면, 학습이력이 <span className="red">LinkedIn profile에 통합 관리</span>됩니다.
                    </div>
                  </li>
                </ul>
                <div className="img-box">
                  <ul>
                    <li>
                      <Image src={`${this.PUBLIC_URL}/images/all/popup-img-linkedin-01.png`} alt="" />
                      <div>상세화면에서 [학습하기] 버튼 클릭</div>
                      <i className="arrow-popup-linkedin icon"><span className="blind">next</span></i>
                    </li>
                    <li>
                      <Image src={`${this.PUBLIC_URL}/images/all/popup-img-linkedin-02.png`} alt="" />
                      <div>개인 계정과의 연동을 확인하는 팝업</div>
                      <i className="arrow-popup-linkedin icon"><span className="blind">next</span></i>
                    </li>
                    <li>
                      <Image src={`${this.PUBLIC_URL}/images/all/popup-img-linkedin-03.png`} alt="" />
                      <div>재 확인하는 팝업</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions4">
          <div className="left">
            <Checkbox label="오늘 하루 보지 않기" className="base" checked={noMoreSeeChecked} onClick={this.onCheckNoMoreSee} />
          </div>
          <div className="right">
            <Button className="close" onClick={this.onClose}>Close</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default LinkedInModal;
