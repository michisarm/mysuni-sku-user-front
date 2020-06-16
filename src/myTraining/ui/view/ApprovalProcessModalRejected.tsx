import React, {Component} from 'react';
import { reactAutobind, reactAlert } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { observer } from 'mobx-react';
import {
  Modal, Form, Button,
} from 'semantic-ui-react';
import { ApprovalCubeService } from '../../stores';
import { IdNameApproval } from '../../model/IdNameApproval';
import { ProposalState } from '../../model/ProposalState';

interface Props {
  approvalCubeService?: ApprovalCubeService
  open: boolean
  onCloseModal: () => void
}

@observer
@reactAutobind
class ApprovalProcessModalRejected extends Component<Props> {

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
    if (approvalCubeService) approvalCubeService.changeStudentRequestProps(name, value);
  }

  async onChangeSelectedStudentProps(selectedList: string []) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) approvalCubeService.changeSelectedStudentProps(selectedList);
  }

  async addRejectedLectureSingle() {
    //
    const { approvalCubeService } = this.props;
    const { studentRequest, selectedList, approvalCube } = approvalCubeService!;

    const name = patronInfo.getPatronName() || '';
    const email = patronInfo.getPatronEmail() || '';

    if (!approvalCube.remark) {
      reactAlert({ title: '알림', message: '반려 의견을 입력해주세요.' });
      return;
    }

    this.onChangeStudentRequestCdoProps('remark', approvalCube.remark);
    this.onChangeStudentRequestCdoProps('proposalState', ProposalState.Rejected);
    this.onChangeStudentRequestCdoProps('actor', new IdNameApproval({ id: email, name }));
    this.onChangeStudentRequestCdoProps('students', [ ...selectedList ]);

    const responseData = await approvalCubeService!.studentRequestReject(studentRequest);
    const { error, message } = responseData;

    if (error) {
      if (message) {
        reactAlert({ title: '알림', message });
      } else {
        reactAlert({ title: '알림', message: '에러 입니다. 관리자에게 문의 하세요.' });
      }
    } else {
      reactAlert({ title: '알림', message: '성공입니다.' });
      this.routeToCreateList();
    }

  }


  routeToCreateList() {
    //
    // this.clearAll();
    window.location.href = '/suni-main/my-training/my-page/ApprovalList/pages/1';
  }

  render() {

    const { approvalCube } = this.props.approvalCubeService!;
    const { open, onCloseModal } = this.props;

    return (
      <Modal
        open={open}
        onClose={onCloseModal}
        className="base w700"
      >
        <Modal.Header>선택된 결제 반려</Modal.Header>
        <Form className="base">
          <Modal.Content>
            <div className="scrolling-80vh">
              <div className="content-wrap6">
                <div className="my-03-01-pop">
                  <div className="text1">
                    선택된 항목에 대한 결제를 반려하시겠습니까?
                  </div>
                  <div className="text2">
                    작성하신 의견은 결제가 반려되는 신청자에게 동일하게 전송됩니다.
                  </div>
                  <textarea placeholder="의견을 기재해주세요."
                    value={approvalCube && approvalCube.remark || ''}
                    onChange={this.onChangeRemark}
                  />
                </div>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="actions2">
            <Button className="pop2 d" onClick={onCloseModal}>취소</Button>
            <Button className="pop2 p" onClick={this.addRejectedLectureSingle}>반려</Button>
          </Modal.Actions>
        </Form>
      </Modal>
    );
  }
}

export default ApprovalProcessModalRejected;
