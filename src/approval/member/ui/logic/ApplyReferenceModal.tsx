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
import { Classroom } from '../../../../lecture/detail/viewModel/LectureClassroom';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';

interface Props {
  skProfileService?: SkProfileService;
  memberService?: MemberService;
  companyApproverService?: CompanyApproverService;
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
      .then(() => companyApproverService!.findCompanyApprover());
  }

  onOpenModal() {
    //
    this.setState({ open: true });
    // 2020-04-22 김우성
    // 참조자 모달 팝업 막기 위해 onOK 내용 바로 실행
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
    const { trigger, memberService, companyApproverService } = this.props;
    const { approvalMember } = memberService!;
    const { companyApprover, originCompanyApprover } = companyApproverService!;

    // 승인자 아이디가 없고 생성시간이 0이면 다이얼로그 표시하지 않음
    const memId = approvalMember ? approvalMember.id : '';
    const creationTime = approvalMember ? approvalMember.creationTime : 0;

    // 리더 승인 일 경우
    let approverTypeVal = '';
    // 승인자 변경하기 활성, 비활성처리
    if (companyApprover.approverType === 'Leader_Approve') {
      approverTypeVal = getPolyglotText(
        '본 과정의 승인은 학습자 본인의 리더(부서장)가 진행합니다. 승인요청 받을 리더정보를 확인 후 필요 시 변경해 주시길 바랍니다.',
        'CollageState-ClassroomModalRefer-리더'
      );
    } else {
      approverTypeVal = getPolyglotText(
        '본 과정의 승인은 HR담당자가 진행합니다.',
        'CollageState-ClassroomModalRefer-HR담당자'
      );
    }
    // 승인자 변경하기 활성, 비활성처리 (최조 승인자의 approverType에 따름)
    const approvalShow =
      originCompanyApprover.approverType === 'Leader_Approve';

    // 승인자 설정 문구 Leader_Approve 일 경우 만 보인다.
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
                  defaultString="신청 참조처 설정"
                  id="CollageState-ClassroomModalRefer-신청참조처"
                />
                <span className="sub f12">
                  <PolyglotText
                    defaultString="본 과정의 신청 정보를 함께 안내받을 리더 정보를 설정하여 주시기바랍니다."
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
                            defaultString="회사"
                            id="CollageState-ClassroomModalRefer-회사"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <PolyglotText
                            defaultString="부서"
                            id="CollageState-ClassroomModalRefer-부서"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <PolyglotText
                            defaultString="이름"
                            id="CollageState-ClassroomModalRefer-이름"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <PolyglotText
                            defaultString="직위/직책"
                            id="CollageState-ClassroomModalRefer-직위/직책"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <PolyglotText
                            defaultString="이메일"
                            id="CollageState-ClassroomModalRefer-이메일"
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
                    defaultString="참조자 변경하기"
                    id="CollageState-ClassroomModalRefer-참조자 변경하기"
                  />
                </Button>
                <ManagerListModalContainer
                  ref={(managerModal) => (this.managerModal = managerModal)}
                  handleOk={this.onClickManagerListOk}
                  multiSelect={false}
                />
                <Button className="w190 pop p" onClick={this.onOk}>
                  <PolyglotText
                    defaultString="확인"
                    id="CollageState-ClassroomModalRefer-확인"
                  />
                </Button>
                <Button className="w190 pop d" onClick={this.close}>
                  <PolyglotText
                    defaultString="취소"
                    id="CollageState-ClassroomModalRefer-취소"
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
                defaultString="승인자 설정"
                id="CollageState-ClassroomModalRefer-승인자 설정"
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
                          defaultString="회사"
                          id="CollageState-ClassroomModalRefer-승인자회사"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="부서"
                          id="CollageState-ClassroomModalRefer-승인자부서"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="이름"
                          id="CollageState-ClassroomModalRefer-승인자이름"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="직위/직책"
                          id="CollageState-ClassroomModalRefer-승인자직위"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <PolyglotText
                          defaultString="이메일"
                          id="CollageState-ClassroomModalRefer-승인자이메일"
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
                    defaultString="승인자 변경하기"
                    id="CollageState-ClassroomModalRefer-승인자 변경하기"
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
