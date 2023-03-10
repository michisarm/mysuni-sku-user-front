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
import {
  DepartmentService,
  MemberService,
  CompanyApproverService,
} from '../../../stores';
import { ApprovalMemberModel } from '../../model/ApprovalMemberModel';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props {
  skProfileService?: SkProfileService;
  memberService?: MemberService;
  companyApproverService?: CompanyApproverService;
  departmentService?: DepartmentService;
  trigger?: React.ReactNode;
  handleOk: (member: MemberViewModel) => void;
}

@inject(
  mobxHelper.injectFrom(
    'approval.memberService',
    'approval.companyApproverService',
    'approval.departmentService',
    'profile.skProfileService'
  )
)
@reactAutobind
@observer
class ApplyReferenceModalApproval extends React.Component<Props> {
  //
  managerModal: any = null;

  state = { open: false };

  componentDidMount() {
    //
    this.init();
  }

  init() {
    //
    const {
      skProfileService,
      departmentService,
      memberService,
      companyApproverService,
    } = this.props;
    skProfileService!
      .findSkProfile()
      .then((profile: SkProfileModel) =>
        departmentService!.findDepartmentByCode(profile.departmentCode)
      )
      .then((department: DepartmentModel) =>
        memberService!.findApprovalMemberByEmployeeId(department.managerId)
      )
      .then(() => companyApproverService!.findCompanyApprover());
  }

  onOpenModalApproval() {
    //
    this.setState({ open: true });
    // 2020-04-22 ?????????
    // ????????? ?????? ?????? ?????? ?????? onOK ?????? ?????? ??????
    const { handleOk, memberService, companyApproverService } = this.props;
    const { approvalMember } = memberService!;
    const { companyApprover } = companyApproverService!;
    //handleOk(approvalMember);
    //this.close();
    // issue date : 2020-05-14 ????????? ?????? ??? ????????? ???????????? this.close() ?????? ?????? ???.
    // 2020-04-22 ????????? ????????????
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

    // ?????????
    let companyNamVal = '';
    if (parsePolyglotString(approvalMember.companyName) === '') {
      companyNamVal = parsePolyglotString(companyApprover.companyName);
    } else {
      companyNamVal = parsePolyglotString(approvalMember.companyName);
    }
    const companyNam = companyNamVal;

    // ?????????
    let departmentNameVal = '';
    if (parsePolyglotString(approvalMember.departmentName) === '') {
      departmentNameVal = parsePolyglotString(companyApprover.departmentName);
    } else {
      departmentNameVal = parsePolyglotString(approvalMember.departmentName);
    }
    const departmentName = departmentNameVal;

    // ??????
    let userNameVal = '';
    if (parsePolyglotString(approvalMember.name) === '') {
      userNameVal = parsePolyglotString(companyApprover.name);
    } else {
      userNameVal = parsePolyglotString(approvalMember.name);
    }
    const userName = userNameVal;

    // ??????
    let titleNameVal = '';
    if (approvalMember.title === '') {
      titleNameVal = companyApprover.title;
    } else {
      titleNameVal = approvalMember.title;
    }
    const titleName = titleNameVal;

    // ??????
    let dutiesVal = '';
    if (approvalMember.duty === '') {
      dutiesVal = companyApprover.duty;
    } else {
      dutiesVal = approvalMember.duty;
    }
    const dutiesName = dutiesVal;

    // ??????/??????
    let titleDutiesVal = '';
    if (dutiesName !== '') {
      titleDutiesVal = titleName + '/' + dutiesName;
    }
    const titleDuties = titleDutiesVal;

    // ?????????
    let emailVal = '';
    if (approvalMember.email === '') {
      emailVal = companyApprover.email;
    } else {
      emailVal = approvalMember.email;
    }
    const email = emailVal;

    // ?????? ?????? ??? ??????
    let approverTypeVal = '';
    // ????????? ???????????? ??????, ???????????????
    let approvalShowVal;
    if (companyApprover.approverType === 'Leader_Approve') {
      approverTypeVal =
        '??? ????????? ?????? ????????? ?????? ???????????? ?????? ????????? ???????????? ?????????????????????.';
      approvalShowVal = true;
    } else {
      approvalShowVal = false;
    }
    // ????????? ???????????? ??????, ???????????????
    const approvalShow = approvalShowVal;

    // ????????? ?????? ?????? Leader_Approve ??? ?????? ??? ?????????.
    const approverTypeStr = approverTypeVal;

    return (
      <Modal
        className="base w1000"
        size="small"
        trigger={trigger}
        open={open}
        onClose={this.close}
        onOpen={this.onOpenModalApproval}
      >
        <Modal.Header className="res">
          {/*Class Series Detail*/}????????? ??????
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
                  <Table.HeaderCell>??????</Table.HeaderCell>
                  <Table.HeaderCell>??????</Table.HeaderCell>
                  <Table.HeaderCell>??????</Table.HeaderCell>
                  <Table.HeaderCell>??????/??????</Table.HeaderCell>
                  <Table.HeaderCell>?????????</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <span>{companyNam}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{departmentName}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{userName}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{titleDuties}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{email}</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          {approvalShow === true && (
            <Button
              className="w190 pop p"
              onClick={this.onClickChangeApplyReference}
            >
              ????????? ????????????
            </Button>
          )}
          <ManagerListModalContainer
            ref={(managerModal) => (this.managerModal = managerModal)}
            handleOk={this.onClickManagerListOk}
          />
          <Button className="w190 pop d" onClick={this.close}>
            Cancel
          </Button>
          <Button className="w190 pop p" onClick={this.onOk}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ApplyReferenceModalApproval;
