import React, {Component} from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';

import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import depot from '@nara.drama/depot';
import { CubeType } from 'shared/model';
import { AlertWin, ConfirmWin } from 'shared';

import {
  Modal, Form, TextArea, Button
} from 'semantic-ui-react';

import { ApprovalCubeService } from '../../stores';

import routePaths from '../../routePaths';

import { CubeIntroModel } from '../../model';
import { IdNameApproval } from '../../model/IdNameApproval';
import { ProposalState } from '../../model/ProposalState';

import { ApprovedResponse } from '../../model/ApprovedResponse';

interface Props {
  trigger: React.ReactNode
  approvalCubeService?: ApprovalCubeService
}

@inject(mobxHelper.injectFrom(
  'approvalCube.approvalCubeService'))
@observer
@reactAutobind
class ApprovalProcessModal extends Component<Props> {

  state = {
    open : false
  };

  onCloseModal = () => this.setState({ open : false });

  onOpenModal = () => this.setState({ open : true });

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
    console.log('approvalCubeService?.selectedList ::' + selectedList);
  }
  
  async addApprovedLectureSingle() {
    console.log('addApprovedLectureSingle click ::');
    //
    const { approvalCubeService } = this.props;
    const { studentRequest } = this.props.approvalCubeService || {} as ApprovalCubeService;
    const { selectedList } = this.props.approvalCubeService || {} as ApprovalCubeService;
    const { approvalCube } = this.props.approvalCubeService!;

    const ApprovedResponse = this.props;

    const name = approvalCube.memberName;
    const userId = approvalCube.operation.operator.employeeId;

    const studentId = approvalCube.studentId;
    const tempList: string [] = [ ...selectedList ];
    tempList.push(studentId);

    this.onChangeSelectedStudentProps(tempList);

    const selectedListArr = this.props.approvalCubeService || {} as ApprovalCubeService;

    console.log('onChangeSelectedStudentProps => selectedListArr ::' + selectedListArr.selectedList);
    console.log('addApprovedLectureSingle approvalCube.remark ::' + approvalCube.remark);

    this.onChangeStudentRequestCdoProps('remark', approvalCube.remark);
    this.onChangeStudentRequestCdoProps('proposalState', ProposalState.Approved);
    const idNameApproval = new IdNameApproval({ id: userId, name });
    this.onChangeStudentRequestCdoProps('actor', idNameApproval);
    this.onChangeStudentRequestCdoProps('students', selectedListArr.selectedList);

    if (selectedList && approvalCubeService) {
      const reponseData = approvalCubeService.studentRequestOpen(studentRequest);

      // console.log('addApprovedLectureSingle reponseData.error ::' + (await reponseData).error);
      // console.log('addApprovedLectureSingle reponseData.message ::' + (await reponseData).message);

      const errorData = (await reponseData).error;

      const messageData = (await reponseData).message;
      const messageTitle = messageData+' <br> 에러 입니다. 관리자에게 문의 하세요.';

      if(errorData === null ) {
        reactAlert({ title: '알림', message: messageTitle });
      }

      if(errorData) {
        reactAlert({ title: '알림', message: messageTitle });
      } else {
        reactAlert({ title: '알림', message: '성공입니다.' });
        this.routeToCreateList();
      }
    }

  }

  routeToCreateList() {
    //
    console.log(' routeToCreateList Start ... ::');
    // this.clearAll();
    window.location.href='/suni-main/my-training/my-page/ApprovalList/pages/1';
    console.log(' routeToCreateList End ... ::');
  }

  render() {

    const { approvalCube } = this.props.approvalCubeService!;
    // console.log('ApprovalSharedDetailContainer approvalCube remark :: ' + approvalCube.remark);

    const { open } = this.state;
    const { trigger } = this.props;

    return(
      <Modal
        open={open}
        onClose={this.onCloseModal}
        onOpen={this.onOpenModal}
        className="base w700"
        trigger={trigger}
      >
        <Modal.Header>선택된 결제 승인</Modal.Header>
        <Form className="base">
          <Modal.Content>
            <div className="scrolling-80vh">
              <div className="content-wrap6">
                <div className="my-03-01-pop">
                  <div className="text1">
                    선택된 항목에 대한 결제를 승인하시겠습니까?
                  </div>
                  <div className="text2">
                    작성하신 의견은 결제가 승인되는 신청자에게 동일하게 전송됩니다.
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
            <Button className="pop2 d" onClick={this.onCloseModal}>취소</Button>
            <Button className="pop2 p" onClick={this.addApprovedLectureSingle}>승인</Button>
          </Modal.Actions>
        </Form>
      </Modal>
    );
  }
}

export default ApprovalProcessModal;
