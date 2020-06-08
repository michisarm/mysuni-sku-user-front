
import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Button, Form, Segment } from 'semantic-ui-react';

import routePaths from '../../routePaths';

import { ApprovalCubeService } from '../../stores';

import ApprovalDetailBasicInfoView from '../view/ApprovalDetailBasicInfoView';
import { IdNameApproval } from '../../model/IdNameApproval';
import { ProposalState } from '../../model/ProposalState';

interface Props extends RouteComponentProps<{ studentId: string, cubeType: string, cubeState: string }> {
  approvalCubeService?: ApprovalCubeService
}

@inject(mobxHelper.injectFrom(
  'approvalCube.approvalCubeService'))
@observer
@reactAutobind
class ApprovalSharedDetailContainer extends React.Component<Props> {
  //
  componentDidMount() {
    //
    const approvalCubeService = this.props.approvalCubeService!;
    const { studentId } = this.props.match.params;

    // 리스트 삭제
    this.checkRemoveAll();

    approvalCubeService.findApprovalCube(studentId);
  }

  componentWillUnmount(): void {
    //
    const approvalCubeService = this.props.approvalCubeService!;
    approvalCubeService!.clearApprovalCube();
  }

  routeToCreateList() {
    //
    // 리스트 삭제
    this.checkRemoveAll();

    // this.clearAll();
    //window.location.href='/suni-main/my-training/my-page/ApprovalList/pages/1';
    this.props.history.push(routePaths.myPageApprovalList());

  }

  // 전체 삭제
  checkRemoveAll() {
    //
    this.onChangeSelectedStudentProps([]);
    this.onChangeSelectedProposalStateProps([]);
  }

  onChangeSelectedProposalStateProps(selectedList: string []) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) approvalCubeService.changeSelectedProposalStateProps(selectedList);
  }

  goToVideo(url: string) {
    //
    window.open(url);
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

  async addApprovedLectureSingle() {
    //
    const { approvalCubeService } = this.props;
    const { studentRequest } = this.props.approvalCubeService || {} as ApprovalCubeService;
    const { selectedList } = this.props.approvalCubeService || {} as ApprovalCubeService;
    const { approvalCube } = this.props.approvalCubeService!;

    const name = approvalCube.memberName;
    const userId = approvalCube.operation.operator.employeeId;

    const studentId = approvalCube.studentId;
    const tempList: string [] = [ ...selectedList ];
    tempList.push(studentId);

    this.onChangeSelectedStudentProps(tempList);

    const selectedListArr = this.props.approvalCubeService || {} as ApprovalCubeService;

    this.onChangeStudentRequestCdoProps('remark', approvalCube.remark);
    this.onChangeStudentRequestCdoProps('proposalState', ProposalState.Approved);
    const idNameApproval = new IdNameApproval({ id: userId, name });
    this.onChangeStudentRequestCdoProps('actor', idNameApproval);
    this.onChangeStudentRequestCdoProps('students', selectedListArr.selectedList);

    if (selectedList && approvalCubeService) {
      const reponseData = approvalCubeService.studentRequestOpen(studentRequest);
      const errorData = (await reponseData).error;

      if (errorData) {
        reactAlert({ title: '알림', message: '에러 입니다. 관리자에게 문의 하세요.' });
        // 리스트 삭제
        this.checkRemoveAll();
      } else {
        reactAlert({ title: '알림', message: '성공입니다.' });
        this.routeToCreateList();
      }
    }

  }

  async addRejectedLectureSingle() {
    //
    const { approvalCubeService } = this.props;
    const { studentRequest } = approvalCubeService || {} as ApprovalCubeService;
    const { selectedList } = approvalCubeService || {} as ApprovalCubeService;
    const { approvalCube } = approvalCubeService!;

    const name = approvalCube.memberName;
    const userId = approvalCube.operation.operator.employeeId;

    const studentId = approvalCube.studentId;
    const tempList: string [] = [ ...selectedList ];
    tempList.push(studentId);

    this.onChangeSelectedStudentProps(tempList);

    const selectedListArr = approvalCubeService || {} as ApprovalCubeService;

    this.onChangeStudentRequestCdoProps('remark', approvalCube.remark);
    this.onChangeStudentRequestCdoProps('proposalState', ProposalState.Rejected);
    const idNameApproval = new IdNameApproval({ id: userId, name });
    this.onChangeStudentRequestCdoProps('actor', idNameApproval);
    this.onChangeStudentRequestCdoProps('students', selectedListArr.selectedList);

    if (selectedList && approvalCubeService) {
      const reponseData = approvalCubeService.studentRequestReject(studentRequest);
      const errorData = (await reponseData).error;

      if(errorData) {
        reactAlert({ title: '알림', message: '에러 입니다. 관리자에게 문의 하세요.' });
        // 리스트 삭제
        this.checkRemoveAll();
      } else {
        reactAlert({ title: '알림', message: '성공입니다.' });
        this.routeToCreateList();
      }
    }

  }

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
    const { approvalCubeService } = this.props;
    const { approvalCube } = approvalCubeService!;

    return (
      <>
        <section className="content bg-white">
          <div className="add-personal-learning">
            <div className="add-personal-learning-wrap">
              <div className="apl-tit">교육 승인 요청</div>
              <div className="apl-notice">
                학습 수강에 대한 승인 요청을 결제하실 수 있습니다.<br />승인 혹은 반려 처리에 대한 승인자 의견을 함께 작성하실 수 있습니다.
              </div>
            </div>
          </div>
          <Segment className="full">
            <div className="apl-form-wrap">
              <>
                <ApprovalDetailBasicInfoView
                  approvalCube={approvalCube}
                />
                <>
                  <div className="result-view">
                    <dl className="bl">
                      <dt>승인자 의견</dt>
                      {
                        approvalCube.proposalState === 'Submitted' && (
                          <div>
                            <dd>
                              <textarea placeholder="승인자 의견을 입력해주세요"
                                value={approvalCube && approvalCube.remark || ''}
                                onChange={this.onChangeRemark}
                              />
                            </dd>
                          </div>
                        )
                      }
                      {
                        approvalCube.proposalState !== 'Submitted' && (
                          <div>
                            <dd>
                              <textarea placeholder=" "
                                value={approvalCube && approvalCube.remark || ''}
                                readOnly={true}
                              />
                            </dd>
                          </div>
                        )
                      }
                    </dl>
                  </div>

                  <div className="buttons border-none">

                    {
                      approvalCube.proposalState === 'Submitted' && (
                        <div>
                          <Button className="fix line" onClick={this.routeToCreateList}>List</Button>
                          <Button className="fix line" onClick={this.addRejectedLectureSingle}>반려</Button>
                          <Button className="fix bg" onClick={this.addApprovedLectureSingle}>승인</Button>
                        </div>
                      )
                    }
                    {
                      approvalCube.proposalState !== 'Submitted' && (
                        <div>
                          <Button className="fix line" onClick={this.routeToCreateList}>List</Button>
                        </div>
                      )
                    }
                  </div>
                </>
              </>
            </div>
          </Segment>
        </section>
      </>
    );
  }
}
export default withRouter(ApprovalSharedDetailContainer);
