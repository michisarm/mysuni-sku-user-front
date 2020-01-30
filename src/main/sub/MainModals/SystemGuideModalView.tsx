
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Link } from 'react-router-dom';
import { Modal, Button, Icon, Checkbox } from 'semantic-ui-react';
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
                  <div>안녕하십니까? mySUNI입니다.</div>
                  구성원 여러분께 급하게 인사 드리느라 아직 몇가지 불편을 드리는 사항들이 있습니다.<br />
                  문의 주신 내용들을 최대한 빨리 개선하고, 나날이 진화해 나가는 써니가 되도록<br />
                  하겠습니다. ^^
                </div>
                <div className="box2">
                  <div>Q) 동영상을 시청했는데 학습이력(시간) 반영이 안되요.</div>
                  <ul>
                    <li>- 동영상 학습시간/진도율은 익일 또는 컨텐츠 재방문시 반영됩니다.</li>
                    <li>- 단, 외부 링크를 통해 학습하는 경우(예: Linkedin Learning) 일주일 등의 주기로<br />학습이력에 반영되니
                      참고하십시오.
                    </li>
                    <li>- 그러나, 하나의 학습카드에 여러 개의 동영상이 포함된 경우는(예: AI 101) 오류가<br />발생하고 있어 2월 중으로 조치
                      하도록
                      하겠습니다.
                    </li>
                    <li>- 학습 결과는 이상 없이 관리되고 있으니 안심하고 학습하시면 됩니다.</li>
                  </ul>
                  <div>Q) 코스를 이수 했는데, 반영이 안되요.</div>
                  <ul>
                    <li>- 현재 코스 이수 기능에 오류가 있어, 1월 중으로 조치 예정입니다.</li>
                    <li>- 대신, 코스 학습을 통해 획득하신 Stamp는 프로필 화면에서 확인하실 수 있습니다.</li>
                  </ul>
                  <div>Q) 동영상 플레이어가 동작하지 않아요.</div>
                  <ul>
                    <li>- 각 사 보안환경에 따라 일부 접속이 어려운 경우가 있습니다.</li>
                    <li>- 개별적으로 문의 주시면 최대한 빨리 조치해 드리겠습니다.</li>
                  </ul>
                </div>
                <div className="box3">
                  <div>
                    그리고, 곧 공개할 몇 가지 개선 사항도 말씀 드립니다.
                  </div>
                  <ol>
                    <li>
                      1. 매번 과정 ‘상세보기’를 눌러 영상을 학습하느라 힘드셨죠?<br />
                      바로 영상 컨텐츠를 학습할 수 있도록 ‘바로 보기’ 버튼을 제공합니다. (1월 중)
                    </li>
                    <li>
                      2. Mobile로 학습하실 수 있도록 스마트폰 App.을 배포할 예정입니다.(3월 초)
                    </li>
                  </ol>
                </div>
                <div className="help-desk">
                  ※ 이외 시스템 장애, 기능개선 요청은 Helpdesk <span>(02-6323-9002)</span><br />
                  또는 <span>Support &gt; Q&A</span>를 통해 문의해주시면 지원드리겠습니다.
                </div>
                <div className="qa">
                  <Link to="/board/support/Q&A">
                    <Button className="fix line">1:1 문의 바로가기(Q&A)</Button>
                  </Link>
                </div>
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

export default SystemGuideModalView;
