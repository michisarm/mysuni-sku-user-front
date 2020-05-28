import React, {Component} from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import {
  Modal, Form, TextArea, Button
} from 'semantic-ui-react';

import { ApprovalCubeService } from '../../stores';

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

  render() {

    const { approvalCube } = this.props.approvalCubeService!;
    console.log('ApprovalSharedDetailContainer approvalCube remark :: ' + approvalCube.remark);

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
                    선택된 항목에 대한 결제를 승인/반려하시겠습니까?
                  </div>
                  <div className="text2">
                    작성하신 의견은 결제가 승인/반려되는 신청자에게 동일하게 전송됩니다.
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
            <Button className="pop2 p" onClick={this.onCloseModal}>승인/반려</Button>
          </Modal.Actions>
        </Form>
      </Modal>
    );
  }
}

export default ApprovalProcessModal;
