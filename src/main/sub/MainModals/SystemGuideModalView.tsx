
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
                  <span className="blind">mySUNI</span> 시스템 안내
                </div>
                <div className="box1">
                  <div>안녕하세요. mySUNI 시스템 개발 담당자입니다.</div>
                  먼저 그동안 시스템 불안정으로 인해 불편을 드려 죄송합니다.<br />
                  가장 기본이 되는 시스템 속도, 안정적인 동영상 표출 및 학습상태 관리(완료처리) 기능 중에서<br />
                  현재 일부 관계사의 동영상 학습 불안정성(끊김)을 제외하고는<br />
                  금일(5월 27일)부로 대부분 조치 되었습니다.<br />
                  <br />
                  그 중 학습상태를 처리를 원활하게 하기 위해 데이터 최적화 작업을 진행했고,<br />
                  일부 구성원들의 총 학습시간 정보가 기존과 다르게 표시되고 있습니다.<br />
                  이에 대한 구성원 여러분의 이해를 구하고자 합니다. 나타나는 현상은 다음과 같습니다.
                </div>
                <div className="box2">
                  <div>1. 학습 시간이 기존보다 줄어든 경우</div>
                  <ul>
                    <li>- 기존의 학습 데이터 중 일부 학습 컨텐츠들이<br />학습완료나 학습중 목록에 중복으로 Count되어 정상 조치<br />(원인 : 실제 데이터 중복의 경우와 시스템 기능 오류)</li>
                    <li>- 학습상태 관리 기능 정상화 후 학습시간 계산 후에는<br />중복 계산된 학습시간만큼 줄어든 현상이 발생합니다.</li>
                  </ul>
                  <div>2. 학습시간이 기존보다 늘어난 경우</div>
                  <ul>
                    <li>- 기존에 학습완료 처리가 되지 못했던 학습 컨텐츠들에 대한<br />학습완료 기능 정상 작동 후 해당 학습시간이 반영되면서 증가</li>
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
            <Checkbox label="이창 다시보지 않기" className="base" checked={modalState.disableChecked} onClick={onCheckDisable} />
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
