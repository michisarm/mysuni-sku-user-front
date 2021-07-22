import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { reactAutobind, reactAlert } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { Modal, Form, Button } from 'semantic-ui-react';
import { ApprovalCubeService } from '../../stores';
import { IdNameApproval } from '../../model/IdNameApproval';
import { ProposalState } from '../../model/ProposalState';
import routePaths from '../../routePaths';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

interface Props {
  approvalCubeService?: ApprovalCubeService;
  open: boolean;
  onCloseModal: () => void;
}

@observer
@reactAutobind
class ApprovalProcessModal extends Component<Props> {
  onChangeApprovalCubeProps(name: string, value: any) {
    //
    const { approvalCubeService } = this.props;
    approvalCubeService!.changeCubeProps(name, value);
  }

  onChangeRemark(e: any) {
    const { value } = e.target;
    this.onChangeApprovalCubeProps('remark', value);
  }

  onChangeStudentRequestCdoProps(name: string, value: any) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) {
      approvalCubeService.changeStudentRequestProps(name, value);
    }
  }

  async onChangeSelectedStudentProps(selectedList: string[]) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) {
      approvalCubeService.changeSelectedStudentProps(selectedList);
    }
  }

  async addApprovedLectureSingle() {
    //
    const { approvalCubeService } = this.props;
    const { studentRequest, selectedList, approvalCube } = approvalCubeService!;

    const name = patronInfo.getPatronName() || '';
    const email = patronInfo.getPatronEmail() || '';

    this.onChangeStudentRequestCdoProps('remark', approvalCube.remark);
    this.onChangeStudentRequestCdoProps(
      'proposalState',
      ProposalState.Approved
    );
    this.onChangeStudentRequestCdoProps(
      'actor',
      new IdNameApproval({ id: email, name })
    );
    this.onChangeStudentRequestCdoProps('studentIds', [...selectedList]);

    const responseData = await approvalCubeService!.studentRequestOpen(
      studentRequest
    );
    // const { error, message } = responseData;

    // if (error) {
    //   if (message) {
    //     reactAlert({ title: '알림', message });
    //   } else {
    //     reactAlert({
    //       title: '알림',
    //       message: '에러 입니다. 관리자에게 문의 하세요.',
    //     });
    //   }
    // } else {
    //   reactAlert({ title: '알림', message: '성공입니다.' });
    //   this.routeToCreateList();
    // }
    reactAlert({ title: '알림', message: '성공입니다.' });
    this.routeToCreateList();
  }

  routeToCreateList() {
    //
    // this.clearAll();
    // window.location.href =
    //   '/suni-main/my-training/my-page/ApprovalList/pages/1';

    window.location.href =
      process.env.PUBLIC_URL + routePaths.approvalPaidCourse();
  }

  render() {
    const { approvalCube } = this.props.approvalCubeService!;
    const { open, onCloseModal } = this.props;

    return (
      <Modal open={open} onClose={onCloseModal} className="base w700">
        <Modal.Header>
          <PolyglotText
            id="승인관리-유료과정-선택승인"
            defaultString="선택된 결제 승인"
          />
        </Modal.Header>
        <Form className="base">
          <Modal.Content>
            <div className="scrolling-80vh">
              <div className="content-wrap6">
                <div className="my-03-01-pop">
                  <div className="text1">
                    <PolyglotText
                      id="승인관리-유료과정-결제승인"
                      defaultString="선택된 항목에 대한 결제를 승인하시겠습니까?"
                    />
                  </div>
                  <div className="text2">
                    <PolyglotText
                      id="승인관리-유료과정-승인의견"
                      defaultString="작성하신 의견은 결제가 승인되는 신청자에게 동일하게 전송됩니다."
                    />
                  </div>
                  <textarea
                    placeholder={getPolyglotText(
                      '의견을 기재해주세요.',
                      '승인관리-유료과정-의견기재2'
                    )}
                    value={(approvalCube && approvalCube.remark) || ''}
                    onChange={this.onChangeRemark}
                  />
                </div>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="actions2">
            <Button className="pop2 d" onClick={onCloseModal}>
              <PolyglotText
                id="승인관리-유료과정-취소버튼2"
                defaultString="취소"
              />
            </Button>
            <Button className="pop2 p" onClick={this.addApprovedLectureSingle}>
              <PolyglotText
                id="승인관리-유료과정-승인버튼"
                defaultString="승인"
              />
            </Button>
          </Modal.Actions>
        </Form>
      </Modal>
    );
  }
}

export default ApprovalProcessModal;
