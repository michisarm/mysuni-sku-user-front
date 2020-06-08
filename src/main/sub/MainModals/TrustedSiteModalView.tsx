
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Link } from 'react-router-dom';
import { Modal, Button, Icon, Checkbox } from 'semantic-ui-react';
import boardRoutePaths from 'board/routePaths';
import ModalState from './model/ModalState';


interface Props {
  modalState: ModalState,
  onClose: () => void,
  onCheckDisable: (e: any, data: any) => void,
}

@reactAutobind
@observer
class TrustedSiteModalView extends Component<Props> {
  PUBLIC_URL = process.env.PUBLIC_URL;
  //
  render() {
    //
    const { modalState, onClose, onCheckDisable } = this.props;
    // 20200527 동영상 학습 시간 줄어든 현상 관련 팝업 안내 
    return (
      <Modal className="w824 base" open={modalState.open}>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap5">
              <div className="system-message">
                <div className="tit">
                  <Icon className="sk-university-login" />
                  <span className="blind">mySUNI</span> IE 속도 관련 조치 방안 안내
                </div>
                <div className="box1">
                  <div>안녕하세요. mySUNI 시스템 개발 담당자입니다.</div>
                  일부 Internet Explorer 사용자 분들 속도 저하 증상 관련,<br />
                  신뢰할 수 있는 사이트에 mySUNI를 추가하는 경우 속도 향상이 확인 되었습니다.<br />
                  이에 조치 방안을 안내 드립니다.
                </div>
                <div className="box2">
                  <div>1. mySUNI 접속 상태에서 IE의 [도구] - [인터넷 옵션] 메뉴 실행</div>
                  <img src={`${this.PUBLIC_URL}/images/modal/trustedSite/image_001_01.png`} width="80%" />
                  <div>2. 인터넷 옵션 창에서 [보안] - [신뢰할 수 있는 사이트] 선택 후 [사이트] 버튼 클릭</div>
                  <img src={`${this.PUBLIC_URL}/images/modal/trustedSite/image_002.png`} width="80%" />
                  <div>3. 추가할 주소에 https://mysuni.sk.com이 입력되어 있음을 확인한 뒤 [추가] 버튼 클릭</div>
                  <img src={`${this.PUBLIC_URL}/images/modal/trustedSite/image_003.png`} width="80%" />
                  <div>4. 신뢰할 수 있는 사이트 목록 하단에 https://mysuni.sk.com이<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;추가 되어 있음을 확인한 뒤 [닫기] 버튼 클릭</div>
                  <img src={`${this.PUBLIC_URL}/images/modal/trustedSite/image_004.png`} width="80%" />
                  <div>5. 인터넷 옵션 창 하단의 [닫기] 버튼 클릭하여 옵션 창 종료</div>
                  <img src={`${this.PUBLIC_URL}/images/modal/trustedSite/image_005.png`} width="80%" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions4">
          <div className="left">
            <Checkbox label="이 창 다시보지 않기" className="base" checked={modalState.disableChecked} onClick={onCheckDisable} />
          </div>
          <div className="right">
            <Button className="close" onClick={onClose}>Close</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default TrustedSiteModalView;
