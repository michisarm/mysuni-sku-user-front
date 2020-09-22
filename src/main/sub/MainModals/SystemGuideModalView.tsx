
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
class SystemGuideModalView extends Component<Props> {
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
                  <span className="blind">mySUNI</span> 작업공지
                </div>
                <div className="box1">
                  <div>아래와 같이 mySUNI 시스템/서버 작업이 진행되오니 참고 하시기 바랍니다.</div>
                </div>
                <div className="box2">
                  <div>· 작업 내용</div>
                  <ul>
                    <li>- Main화면 구조 변경</li>
                    <li>- Course 학습 상세화면 변경</li>
                    <li>- Certification 메뉴 신설</li>
                  </ul>
                  <div>· 작업 일시</div>
                  <ul>
                    <li>- 8월 31일 월요일 19:00 ~ 22:00</li>
                    <li>(작업 시간 동안 서비스 사용 불가)</li>
                  </ul>
                  <div>· 기타 문의</div>
                  <ul>
                    <li>- mySUNI 개발/운영 파트 (hum@sk.com, 010-5317-0158)</li>
                  </ul>
                </div>
                <div className="box3">
                  <div>
                    감사합니다.<br />
                  </div>
                </div>
                {/* <div className="help-desk">
                  ※ 학습 시간 관련 이슈가 있으실 경우,<br />Helpdesk <span>(02-6323-9002)</span>를 통해 연락 주시기 바랍니다.<br />
                  개별 조사 후 조치해 드리도록 하겠습니다.
                </div> */}
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

export default SystemGuideModalView;
