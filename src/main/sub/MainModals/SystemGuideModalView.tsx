
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
  // render() {
  //   //
  //   const { modalState, onClose, onCheckDisable } = this.props;

  //   return (
  //     <Modal className="w824 base" open={modalState.open}>
  //       <Modal.Content>
  //         <div className="scrolling-80vh">
  //           <div className="content-wrap5">
  //             <div className="system-message">
  //               <div className="tit">
  //                 <Icon className="sk-university-login" />
  //                 <span className="blind">mySUNI</span> 시스템 안내
  //               </div>
  //               <div className="box1">
  //                 <div>안녕하십니까? mySUNI입니다.</div>
  //                 구성원 여러분께 급하게 인사 드리느라 아직 몇가지 불편을 드리는 사항들이 있습니다.<br />
  //                 문의 주신 내용들을 최대한 빨리 개선하고, 나날이 진화해 나가는 써니가 되도록<br />
  //                 하겠습니다. ^^
  //               </div>
  //               <div className="box2">
  //                 <div>Q) 동영상을 시청했는데 학습이력(시간) 반영이 안되요.</div>
  //                 <ul>
  //                   <li>- 동영상 학습시간/진도율은 익일 또는 컨텐츠 재방문시 반영됩니다.</li>
  //                   <li>- 단, 외부 링크를 통해 학습하는 경우(예: Linkedin Learning) 일주일 등의 주기로<br />학습이력에 반영되니
  //                     참고하십시오.
  //                   </li>
  //                   <li>- 그러나, 하나의 학습카드에 여러 개의 동영상이 포함된 경우는(예: AI 101) 오류가<br />발생하고 있어 2월 중으로 조치
  //                     하도록
  //                     하겠습니다.
  //                   </li>
  //                   <li>- 학습 결과는 이상 없이 관리되고 있으니 안심하고 학습하시면 됩니다.</li>
  //                 </ul>
  //                 <div>Q) 코스를 이수 했는데, 반영이 안되요.</div>
  //                 <ul>
  //                   <li>- 현재 코스 이수 기능에 오류가 있어, 1월 중으로 조치 예정입니다.</li>
  //                   <li>- 대신, 코스 학습을 통해 획득하신 Stamp는 프로필 화면에서 확인하실 수 있습니다.</li>
  //                 </ul>
  //                 <div>Q) 동영상 플레이어가 동작하지 않아요.</div>
  //                 <ul>
  //                   <li>- 각 사 보안환경에 따라 일부 접속이 어려운 경우가 있습니다.</li>
  //                   <li>- 개별적으로 문의 주시면 최대한 빨리 조치해 드리겠습니다.</li>
  //                 </ul>
  //               </div>
  //               <div className="box3">
  //                 <div>
  //                   그리고, 곧 공개할 몇 가지 개선 사항도 말씀 드립니다.
  //                 </div>
  //                 <ol>
  //                   <li>
  //                     1. 매번 과정 ‘상세보기’를 눌러 영상을 학습하느라 힘드셨죠?<br />
  //                     바로 영상 컨텐츠를 학습할 수 있도록 ‘바로 보기’ 버튼을 제공합니다. (1월 중)
  //                   </li>
  //                   <li>
  //                     2. Mobile로 학습하실 수 있도록 스마트폰 App.을 배포할 예정입니다.(3월 초)
  //                   </li>
  //                 </ol>
  //               </div>
  //               <div className="help-desk">
  //                 ※ 이외 시스템 장애, 기능개선 요청은 Helpdesk <span>(02-6323-9002)</span><br />
  //                 또는 <span>Support &gt; Q&A</span>를 통해 문의해주시면 지원드리겠습니다.
  //               </div>
  //               <div className="qa">
  //                 <Link to={boardRoutePaths.supportQnA()}>
  //                   <Button className="fix line">1:1 문의 바로가기(Q&A)</Button>
  //                 </Link>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </Modal.Content>
  //       <Modal.Actions className="actions4">
  //         <div className="left">
  //           <Checkbox label="이창 다시보지 않기" className="base" checked={modalState.disableChecked} onClick={onCheckDisable} />
  //         </div>
  //         <div className="right">
  //           <Button className="close" onClick={onClose}>Close</Button>
  //         </div>
  //       </Modal.Actions>
  //     </Modal>
  //   );
  // }

  // 20200527 동영상 학습 시간 줄어든 현상 관련 팝업 안내 
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
                  <div>안녕하세요. mySUNI 시스템 개발 담당자입니다.</div>
                  먼저 그동안 시스템 불안정으로 인해 불편을 드려 죄송합니다.<br/>
                  가장 기본이 되는 시스템 속도, 안정적인 동영상 표출 및 학습상태 관리(완료처리) 기능 중에서<br />
                  현재 일부 관계사의 동영상 학습 불안정성(끊김)을 제외하고는 금일(5월 27일)부로 대부분 조치 되었습니다.<br />
                  그 중 학습상태를 처리를 원활하게 하기 위해 데이터 최적화 작업을 진행했고,<br/>
                  일부 구성원들의 총 학습시간 정보가 기존과 다르게 표시되고 있습니다.<br/>
                  이에 대한 구성원 여러분의 이해를 구하고자 합니다. 나타나는 현상은 다음과 같습니다.
                </div>
                <div className="box2">
                  <div>1. 학습 시간이 기존보다 줄어든 경우</div>
                  <ul>
                    <li>- 기존의 학습데이터 중 일부 학습컨텐츠들이 학습완료나 학습중 목록에 중복으로 Count되어 정상 조치<br />(원인 : 실제 데이터 중복의 경우와 시스템 기능 오류)</li>
                    <li>- 학습상태 관리 기능 정상화 후 학습시간 계산 후에는 중복 계산된 학습시간만큼 줄어든 현상이 발생합니다.</li>
                  </ul>
                  <div>2. 학습시간이 기존보다 늘어난 경우</div>
                  <ul>
                    <li>- 기존에 학습완료 처리가 되지 못했던 학습컨텐츠들에 대한 학습완료 기능 정상 작동 후 해당 학습시간이 반영되면서 증가</li>
                  </ul>
                </div>
                <div className="box3">
                  <div>
                    그동안 불편을 드린 점에 대해 다시 한번 양해를 부탁드리며,<br/>
                    현재 서비스 안정화를 위해 더 세밀한 기능 점검 및 조치를 수행하고 있습니다.<br/>
                    구성원 여러분들이 만족할 수 있는 서비스가 되도록 최선을 다하겠습니다.<br/>
                  </div>
                </div>
                <div className="help-desk">
                  ※ 학습 시간 관련 이슈가 있으실 경우, Helpdesk <span>(02-6323-9002)</span>를 통해 연락 주시기 바랍니다.<br />
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
