import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { Button, Modal, Table } from 'semantic-ui-react';
import { MemberViewModel } from '@nara.drama/approval';
import { inject, observer } from 'mobx-react';
import { SkProfileService } from 'profile/stores';
import ManagerListModalContainer from './ManagerListModalContainer';
import SkProfileModel from '../../../../profile/model/SkProfileModel';
import { DepartmentModel } from '../../../department/model/DepartmentModel';
import { CompanyApproverModel } from '../../../company/model/CompanyApproverModel';
import { DepartmentService, MemberService, CompanyApproverService } from '../../../stores';
import { ApprovalMemberModel } from '../../model/ApprovalMemberModel';
import {ClassroomModel} from '../../../../personalcube/classroom/model';

interface Props {
  skProfileService?: SkProfileService
  memberService?: MemberService
  companyApproverService?: CompanyApproverService
  departmentService?: DepartmentService
  trigger?: React.ReactNode
  handleOk: (member: MemberViewModel) => void
  classrooms: ClassroomModel[]
}

@inject(mobxHelper.injectFrom(
  'approval.memberService',
  'approval.companyApproverService',
  'approval.departmentService',
  'profile.skProfileService'
))
@reactAutobind
@observer
class ApplyReferenceModal extends React.Component<Props> {
  //
  managerModal: any = null;

  state = { open: false };

  componentDidMount() {
    //
    this.init();
  }

  init() {
    //
    const { skProfileService, departmentService, memberService, companyApproverService } = this.props;
    skProfileService!.findSkProfile()
      .then((profile: SkProfileModel) => departmentService!.findDepartmentByCode(profile.departmentCode))
      .then((department: DepartmentModel) => memberService!.findApprovalMemberByEmployeeId(department.manager.id))
      .then((companyApprover: CompanyApproverModel) => companyApproverService!.findCompanyApprover());
  }

  onOpenModalNoData() {
    //
    this.setState({ open: true });
    // 2020-04-22 김우성
    // 참조자 모달 팝업 막기 위해 onOK 내용 바로 실행
    const { handleOk, memberService, classrooms } = this.props;
    const { approvalMember } = memberService!;
    // by JSM
    if (this.state.open || !classrooms) {
      handleOk(approvalMember);
      this.close();
    }
    // 2020-04-22 김우성 여기까지
  }

  close() {
    //
    this.setState({ open: false });
  }

  onOk() {
    //
    const { handleOk, memberService, companyApproverService } = this.props;
    const { approvalMember } = memberService!;
    const { companyApprover } = companyApproverService!;
    handleOk(approvalMember);
    this.close();
  }

  onClickChangeApplyReference() {
    //
    this.managerModal.onShow(true);
  }

  onClickManagerListOk(approvalMember: ApprovalMemberModel) {
    //
    const { memberService } = this.props;
    memberService!.changeApprovalManagerProps(approvalMember);
  }

  render() {
    const {open} = this.state;
    const {trigger, memberService} = this.props;
    const {approvalMember} = memberService!;

    // by JSM : 승인자 아이디가 없고 생성시간이 0이면 다이얼로그 표시하지 않음
    const memId = approvalMember ? approvalMember.id : '';
    const creationTime = approvalMember ? approvalMember.creationTime : 0;

    return (
      <div>
        {
          memId !== '' && creationTime > 0 &&
          (
            <Modal className="base w1000" size="small" trigger={trigger} open={open} onClose={this.close} onOpen={this.onOpenModalNoData}>
              <Modal.Header className="res">
                {/*Class Series Detail*/}신청 참조처 설정
                <span className="sub f12">본 과정의 신청 정보를 함께 안내받을 리더 정보를 설정하여 주시기바랍니다.</span>
              </Modal.Header>
              <Modal.Content>
                <div className="scrolling-60vh">
                  <Table className="head-fix ml-extra-01">
                    <colgroup>
                      <col width="20%"/>
                      <col width="20%"/>
                      <col width="20%"/>
                      <col width="10%"/>
                      <col width="30%"/>
                    </colgroup>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>회사</Table.HeaderCell>
                        <Table.HeaderCell>부서</Table.HeaderCell>
                        <Table.HeaderCell>이름</Table.HeaderCell>
                        <Table.HeaderCell>직위/직책</Table.HeaderCell>
                        <Table.HeaderCell>이메일</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell><span>{approvalMember.companyName}</span></Table.Cell>
                        <Table.Cell><span>{approvalMember.departmentName}</span></Table.Cell>
                        <Table.Cell><span>{approvalMember.name}</span></Table.Cell>
                        <Table.Cell><span>{approvalMember.titleName}</span></Table.Cell>
                        <Table.Cell><span>{approvalMember.email}</span></Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </Modal.Content>
              <Modal.Actions className="actions">
                <Button className="w190 pop p" onClick={this.onClickChangeApplyReference}>참조자 변경하기</Button>
                <ManagerListModalContainer
                  ref={managerModal => this.managerModal = managerModal}
                  handleOk={this.onClickManagerListOk}
                />
                <Button className="w190 pop p" onClick={this.onOk}>확인</Button>
                <Button className="w190 pop d" onClick={this.close}>취소</Button>
              </Modal.Actions>
            </Modal>
          )
        }
      </div>
    );
  }
}

export default ApplyReferenceModal;
