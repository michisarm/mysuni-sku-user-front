import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { Button, Modal, Table } from 'semantic-ui-react';
import { MemberViewModel } from '@nara.drama/approval';
import { inject, observer } from 'mobx-react';
import { SkProfileService } from 'profile/stores';
import ManagerListModalContainer from './ManagerListModalContainer';
import SkProfileModel from '../../../../profile/model/SkProfileModel';
import { DepartmentModel } from '../../../department/model/DepartmentModel';
import {
  CompanyApproverService,
  DepartmentService,
  MemberService,
  MenuControlAuthService,
} from '../../../stores';
import { ApprovalMemberModel } from '../../model/ApprovalMemberModel';
import { Classroom } from '../../../../lecture/detail/viewModel/LectureClassroom';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { LectureApproverType } from '../../../company/model/LectureApproverType';

interface Props {
  skProfileService?: SkProfileService;
  memberService?: MemberService;
  companyApproverService?: CompanyApproverService;
  menuControlAuthService?: MenuControlAuthService;
  departmentService?: DepartmentService;
  trigger?: React.ReactNode;
  handleOk: (member: MemberViewModel) => void;
  classrooms: Classroom[];
  selectedClassRoom: Classroom | null;
}

@inject(
  mobxHelper.injectFrom(
    'approval.memberService',
    'approval.companyApproverService',
    'approval.menuControlAuthService',
    'approval.departmentService',
    'profile.skProfileService'
  )
)
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
    const {
      skProfileService,
      departmentService,
      memberService,
      companyApproverService,
      menuControlAuthService,
    } = this.props;
    skProfileService!
      .findSkProfile()
      .then((profile: SkProfileModel) => {
        return departmentService!.findDepartmentByCode(
          skProfileService!.skProfile.departmentCode
        );
        // return departmentService!.findDepartmentByCode(profile.departmentCode)
      })
      .then((department: DepartmentModel) =>
        memberService!.findApprovalMemberByEmployeeId(department.managerId)
      )
      .then(() => menuControlAuthService!.findMenuControlAuth())
      .then(() => companyApproverService!.findCompanyApprover());
  }

  onOpenModal() {
    //
    this.setState({ open: true });
    // 2020-04-22 ?????????
    // ????????? ?????? ?????? ?????? ?????? onOK ?????? ?????? ??????
    const { handleOk, memberService, classrooms } = this.props;
    const { approvalMember } = memberService!;

    if (!this.isApprovalProcess()) {
      if (this.state.open || !classrooms) {
        handleOk(approvalMember);
        this.close();
      }
    }
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

    if (this.isApprovalProcess()) {
      handleOk(companyApprover);
    } else {
      handleOk(approvalMember);
    }

    this.close();
  }

  onClickChangeApplyReference() {
    //
    this.managerModal.onShow(true);
  }

  onClickManagerListOk(approvalMember: ApprovalMemberModel) {
    //
    const { memberService, companyApproverService } = this.props;

    if (approvalMember == null || approvalMember.id === '') return;

    if (this.isApprovalProcess()) {
      companyApproverService!.changeCompanyApproverProps(approvalMember);
    } else {
      memberService!.changeApprovalManagerProps(approvalMember);
    }
  }

  isApprovalProcess() {
    const { selectedClassRoom } = this.props;
    return (
      selectedClassRoom &&
      selectedClassRoom.enrollingAvailable === true &&
      selectedClassRoom.freeOfCharge.approvalProcess === true
    );
  }

  render() {
    const { open } = this.state;
    const {
      trigger,
      memberService,
      menuControlAuthService,
      companyApproverService,
    } = this.props;
    const { approvalMember } = memberService!;
    const { companyApprover } = companyApproverService!;
    const { menuControlAuth } = menuControlAuthService!;

    // ????????? ???????????? ?????? ??????????????? 0?????? ??????????????? ???????????? ??????
    const memId = approvalMember ? approvalMember.id : '';
    const creationTime = approvalMember ? approvalMember.creationTime : 0;

    // ?????? ?????? ??? ??????
    let approverTypeVal = '';
    // ????????? ???????????? ??????, ???????????????
    if (
      menuControlAuth.lectureApproval.courseApproverType ===
      LectureApproverType.TEAM_LEADER
    ) {
      approverTypeVal = getPolyglotText(
        '??? ????????? ????????? ????????? ????????? ??????(?????????)??? ???????????????. ???????????? ?????? ??????????????? ?????? ??? ?????? ??? ????????? ????????? ????????????.',
        'CollageState-ClassroomModalRefer-??????'
      );
    } else {
      approverTypeVal = getPolyglotText(
        '??? ????????? ????????? HR???????????? ???????????????.',
        'CollageState-ClassroomModalRefer-HR?????????'
      );
    }

    //????????? ???????????? ??????, ??????????????? (?????? ???????????? approverType??? ??????)
    const approvalShow =
      menuControlAuth.lectureApproval.courseApproverType ===
      LectureApproverType.TEAM_LEADER;

    // ????????? ?????? ?????? Leader_Approve ??? ?????? ??? ?????????.
    const approverTypeStr = approverTypeVal;

    if (!this.isApprovalProcess()) {
      return (
        <div>
          {memId !== '' && creationTime > 0 && (
            <Modal
              className="base w1000"
              size="small"
              trigger={trigger}
              open={open}
              onClose={this.close}
              onOpen={this.onOpenModal}
            >
              <Modal.Header className="res">
                {/*Class Series Detail*/}
                <PolyglotText
                  defaultString="?????? ????????? ??????"
                  id="CollageState-ClassroomModalRefer-???????????????"
                />
                <span className="sub f12">
                  <PolyglotText
                    defaultString="??? ????????? ?????? ????????? ?????? ???????????? ?????? ????????? ???????????? ?????????????????????."
                    id="CollageState-ClassroomModalRefer-Subtitle"
                  />
                </span>
              </Modal.Header>
              <Modal.Content>
                <div className="scrolling-60vh">
                  <Table className="head-fix ml-extra-01">
                    <colgroup>
                      <col width="20%" />
                      <col width="20%" />
                      <col width="20%" />
                      <col width="10%" />
                      <col width="30%" />
                    </colgroup>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>
                          <PolyglotText
                            defaultString="??????"
                            id="CollageState-ClassroomModalRefer-??????"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <PolyglotText
                            defaultString="??????"
                            id="CollageState-ClassroomModalRefer-??????"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <PolyglotText
                            defaultString="??????"
                            id="CollageState-ClassroomModalRefer-??????"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <PolyglotText
                            defaultString="??????/??????"
                            id="CollageState-ClassroomModalRefer-??????/??????"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <PolyglotText
                            defaultString="?????????"
                            id="CollageState-ClassroomModalRefer-?????????"
                          />
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <span>{approvalMember.companyName}</span>
                        </Table.Cell>
                        <Table.Cell>
                          <span>{approvalMember.departmentName}</span>
                        </Table.Cell>
                        <Table.Cell>
                          <span>
                            {parsePolyglotString(approvalMember.name)}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <span>{approvalMember.title}</span>
                        </Table.Cell>
                        <Table.Cell>
                          <span>{approvalMember.email}</span>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </Modal.Content>
              <Modal.Actions className="actions">
                <Button
                  className="w190 pop p"
                  onClick={this.onClickChangeApplyReference}
                >
                  <PolyglotText
                    defaultString="????????? ????????????"
                    id="CollageState-ClassroomModalRefer-????????? ????????????"
                  />
                </Button>
                <ManagerListModalContainer
                  ref={(managerModal) => (this.managerModal = managerModal)}
                  handleOk={this.onClickManagerListOk}
                  multiSelect={false}
                />
                <Button className="w190 pop p" onClick={this.onOk}>
                  <PolyglotText
                    defaultString="??????"
                    id="CollageState-ClassroomModalRefer-??????"
                  />
                </Button>
                <Button className="w190 pop d" onClick={this.close}>
                  <PolyglotText
                    defaultString="??????"
                    id="CollageState-ClassroomModalRefer-??????"
                  />
                </Button>
              </Modal.Actions>
            </Modal>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Modal
            className="base w1000"
            size="small"
            trigger={trigger}
            open={open}
            onClose={this.close}
            onOpen={this.onOpenModal}
          >
            <Modal.Header className="res">
              {/*Class Series Detail*/}
              <PolyglotText
                defaultString="????????? ??????"
                id="CollageState-ClassroomModalRefer-????????? ??????"
              />
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
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="??????"
                          id="CollageState-ClassroomModalRefer-???????????????"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="??????"
                          id="CollageState-ClassroomModalRefer-???????????????"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="??????"
                          id="CollageState-ClassroomModalRefer-???????????????"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="??????/??????"
                          id="CollageState-ClassroomModalRefer-???????????????"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="?????????"
                          id="CollageState-ClassroomModalRefer-??????????????????"
                        />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Table.Cell verticalAlign="middle" />
                        <span>
                          {parsePolyglotString(companyApprover.companyName)}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Table.Cell verticalAlign="middle" />
                        <span>
                          {parsePolyglotString(companyApprover.departmentName)}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Table.Cell verticalAlign="middle" />
                        <span>{parsePolyglotString(companyApprover.name)}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <Table.Cell verticalAlign="middle" />
                        <span>{companyApprover.title}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <Table.Cell verticalAlign="middle" />
                        <span>{companyApprover.email}</span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </Modal.Content>
            <Modal.Actions className="actions">
              {approvalShow && (
                <Button
                  className="w190 pop p"
                  onClick={this.onClickChangeApplyReference}
                >
                  <PolyglotText
                    defaultString="????????? ????????????"
                    id="CollageState-ClassroomModalRefer-????????? ????????????"
                  />
                </Button>
              )}
              <ManagerListModalContainer
                ref={(managerModal) => (this.managerModal = managerModal)}
                handleOk={this.onClickManagerListOk}
                multiSelect={false}
              />
              <Button className="w190 pop d" onClick={this.close}>
                <PolyglotText
                  defaultString="Cancel"
                  id="CollageState-ClassroomModalRefer-Cancel"
                />
              </Button>
              <Button className="w190 pop p" onClick={this.onOk}>
                <PolyglotText
                  defaultString="OK"
                  id="CollageState-ClassroomModalRefer-OK"
                />
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      );
    }
  }
}

export default ApplyReferenceModal;
