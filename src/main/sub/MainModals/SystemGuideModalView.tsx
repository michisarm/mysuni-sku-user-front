
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
                  <span className="blind">(재공지) mySUNI</span> 시스템 안내
                </div>
                <div className="box1">
                  <div>안녕하세요. mySUNI 시스템 개발 담당자입니다.</div>
                  먼저 기 공지한 내역 중 학습 컨텐츠의 학습 이수시간 반영 정상화 관련
                  모든 경우에 대해 깔끔하게 처리를 하지 못하여
                  일부 구성원들 여러분들의 총 학습시간 정보가 잘못 반영된 점에 대해 죄송하다는 말씀을 드립니다.<br/>
                  이에 추가 처리 방안을 재공지 드립니다.<br/>
                </div>
                <div className="box2">
                  <div>1. 기&quot;학습완료&quot;나 &quot;학습중&quot; 목록에 중복으로 Count 된 경우 </div>
                  <ul>
                    <li>- 5월 27일 12:30 중복된 시간 제거 처리 완료</li>
                  </ul>
                  <div>2. 실제 학습 시간 미반영건(기 학습한 동영상의 변경, 추가 학습 인정 시간 누락)</div>
                  <ul>
                    <li>- 5월 28일 20시 학습시간 추가 반영 완료</li>
                  </ul>
                  <div>3. 학습을 완료하였으나, &quot;학습완료&quot; 처리가 되지 않은 경우</div>
                  <ul>
                    <li>- 학습완료 기능 정상화로 처리 완료</li>
                  </ul>
                </div>
                <div className="box3">
                  <div>
                    그동안 불편을 드린 점에 대해 다시 한번 양해를 부탁드리며,<br />
                    현재 서비스 안정화를 위해 더 세밀한 기능 점검 및 조치를 수행하고 있습니다.<br />
                    구성원 여러분들이 만족할 수 있는 서비스가 되도록 최선을 다하겠습니다.<br />
                  </div>
                </div>
                <div className="help-desk">
                  ※ 학습 시간 관련 이슈가 있으실 경우,<br />Helpdesk <span>(02-6323-9002)</span>를 통해 연락 주시기 바랍니다.<br />
                  개별 조사 후 조치해 드리도록 하겠습니다.
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

export default SystemGuideModalView;
