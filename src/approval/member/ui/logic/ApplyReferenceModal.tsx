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

interface Props {
  skProfileService?: SkProfileService
  memberService?: MemberService
  companyApproverService?: CompanyApproverService
  departmentService?: DepartmentService
  trigger?: React.ReactNode
  handleOk: (member: MemberViewModel) => void
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

  onOpenModal() {
    //
    this.setState({ open: true });
    // 2020-04-22 김우성
    // 참조자 모달 팝업 막기 위해 onOK 내용 바로 실행
    const { handleOk, memberService, companyApproverService } = this.props;
    const { approvalMember } = memberService!;
    const { companyApprover } = companyApproverService!;
    handleOk(approvalMember);
    //this.close();
    // issue date : 2020-05-14 승인자 설정 및 승인자 변경하기 this.close() 주석 처리 함.
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
    const { open } = this.state;
    const { trigger, memberService, companyApproverService } = this.props;
    const { approvalMember } = memberService!;
    const { companyApprover } = companyApproverService!;

    console.log('render start companyApprover.titleName ::' + companyApprover.titleName);
    console.log('render start approvalMember.titleName ::' + approvalMember.titleName);

    console.log('render start companyApprover.myApprover ::' + companyApprover.myApprover);

    // 회사명
    let companyNamVal = '';
    if ( approvalMember.companyName === '' ) {
      companyNamVal = companyApprover.companyName;
    } else {
      companyNamVal = approvalMember.companyName;
    }
    const companyNam = companyNamVal;


    // 부서명
    let departmentNameVal = '';
    if ( approvalMember.departmentName === '' ) {
      departmentNameVal = companyApprover.departmentName;
    } else {
      departmentNameVal = approvalMember.departmentName;
    }
    const departmentName = departmentNameVal;

    // 이름
    let userNameVal = '';
    if ( approvalMember.name === '' ) {
      userNameVal = companyApprover.name;
    } else {
      userNameVal = approvalMember.name;
    }
    const userName = userNameVal;

    // 직위
    let titleNameVal = '';
    if ( approvalMember.titleName === '' ) {
      titleNameVal = companyApprover.titleName;
    } else {
      titleNameVal = approvalMember.titleName;
    }
    const titleName = titleNameVal;

    // 직책
    let dutiesVal = '';
    if ( approvalMember.dutiesName === '' ) {
      dutiesVal = companyApprover.dutiesName;
    } else {
      dutiesVal = approvalMember.dutiesName;
    }
    const dutiesName = dutiesVal;

    // 직위/직책
    let titleDutiesVal = '';
    if( dutiesName !== '') {
      titleDutiesVal = titleName + '/' + dutiesName;
    }
    const titleDuties = titleDutiesVal;

    // 이메일
    let emailVal = '';
    if ( approvalMember.email === '' ) {
      emailVal = companyApprover.email;
    } else {
      emailVal = approvalMember.email;
    }
    const email = emailVal;

    console.log('render start companyApprover.approverType ::' + companyApprover.approverType);

    // 리더 승인 일 경우
    let approverTypeVal = '';
    // 승인자 변경하기 활성, 비활성처리
    let approvalShowVal;
    if ( companyApprover.approverType === 'Leader_Approve') {
      approverTypeVal = '본 과정의 신청 정보를 함께 안내받을 리더 정보를 설정하여 주시기바랍니다.';
      approvalShowVal = true;
    } else {
      approvalShowVal = false;
    }
    // 승인자 변경하기 활성, 비활성처리
    const approvalShow = approvalShowVal;

    // 승인자 설정 문구 Leader_Approve 일 경우 만 보인다.
    const approverTypeStr = approverTypeVal;

    return (
      <Modal className="base w1000" size="small" trigger={trigger} open={open} onClose={this.close} onOpen={this.onOpenModal}>
        <Modal.Header className="res">
          {/*Class Series Detail*/}승인자 설정
          <span className="sub f12">{approverTypeStr}</span>
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-60vh">
            <Table className="head-fix ml-extra-01">
              <colgroup>
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="15%" />
                <col width="25%" />
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
                  <Table.Cell><span>{companyNam}</span></Table.Cell>
                  <Table.Cell><span>{departmentName}</span></Table.Cell>
                  <Table.Cell><span>{userName}</span></Table.Cell>
                  <Table.Cell><span>{titleDuties}</span></Table.Cell>
                  <Table.Cell><span>{email}</span></Table.Cell>
                </Table.Row>

              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          { approvalShow === true && <Button className="w190 pop p" onClick={this.onClickChangeApplyReference}>승인자 변경하기</Button> }
          <ManagerListModalContainer
            ref={managerModal => this.managerModal = managerModal}
            handleOk={this.onClickManagerListOk}
          />
          <Button className="w190 pop d" onClick={this.close}>Cancel</Button>
          <Button className="w190 pop p" onClick={this.onOk}>OK</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ApplyReferenceModal;
