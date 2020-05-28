
import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import depot from '@nara.drama/depot';
import { CubeType } from 'shared/model';
import { AlertWin, ConfirmWin } from 'shared';
import { Button, Form, Segment, Table, TextArea, TextAreaProps } from 'semantic-ui-react';

import routePaths from '../../routePaths';
import { CubeIntroModel } from '../../model';

import { ApprovalCubeService } from '../../stores';

import ApprovalDetailBasicInfoView from '../view/ApprovalDetailBasicInfoView';

import { StudentRequestCdoModel } from '../../model/StudentRequestCdoModel';
import { LearningStateUdoModel } from '../../model/LearningStateUdoModel';

import { IdNameApproval } from '../../model/IdNameApproval';
import { ProposalState } from '../../model/ProposalState';

import { ApprovedResponse } from '../../model/ApprovedResponse';


interface Props extends RouteComponentProps<{ studentId: string, cubeType: string, cubeState: string }> {
  approvalCubeService?: ApprovalCubeService
}

interface States {
  alertWinOpen: boolean
  alertIcon: string
  alertTitle: string
  alertType: string
  alertMessage: string

  confirmWinOpen: boolean

  filesMap: Map<string, any>
}

@inject(mobxHelper.injectFrom(
  'approvalCube.approvalCubeService'))
@observer
@reactAutobind
class ApprovalSharedDetailContainer extends React.Component<Props, States> {
  //
  state = {
    alertWinOpen: false,
    alertMessage: '',
    alertIcon: '',
    alertTitle: '',
    alertType: '',
    confirmWinOpen: false,
    filesMap: new Map<string, any>(),
  };

  componentDidMount() {
    //
    const approvalCubeService = this.props.approvalCubeService!;
    const { studentId, cubeType } = this.props.match.params;

    console.log('componentDidMount personalCubeId :: ' + studentId);

    approvalCubeService.findApprovalCube(studentId)
      .then(() => {
        const { approvalCube } = approvalCubeService;

        console.log('componentDidMount approvalCube::' + approvalCube);
        console.log('componentDidMount approvalCube.studentId ::' + approvalCube.studentId);
        console.log('componentDidMount approvalCube.rollBookId ::' + approvalCube.rollBookId);
        console.log('componentDidMount approvalCube.memberName ::' + approvalCube.memberName);

        const referenceFileBoxId = approvalCube && approvalCube.contents && approvalCube.contents.fileBoxId;
        this.findFiles('reference', referenceFileBoxId);
      });
  }

  clearAll() {
    //
    const {
      approvalCubeService,
    } = this.props;

    approvalCubeService!.clearApprovalCube();
  }

  findFiles(type: string, fileBoxId: string) {
    //
    const { filesMap } = this.state;

    depot.getDepotFiles(fileBoxId)
      .then(files => {
        filesMap.set(type, files);
        const newMap = new Map(filesMap.set(type, files));
        this.setState({ filesMap: newMap });
      });
  }

  confirmBlank(message: string) {
    //
    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: '필수 정보 입력 안내',
      alertIcon: 'triangle',
    });
  }

  handleCloseAlertWin() {
    //
    this.setState({
      alertWinOpen: false,
    });
  }

  handleCloseConfirmWin() {
    //
    this.setState({
      confirmWinOpen: false,
    });
  }

  routeToCreateList() {
    //
    console.log(' routeToCreateList Start ... ::');
    // this.clearAll();
    //window.location.href='/suni-main/my-training/my-page/ApprovalList/pages/1';
    console.log(' routeToCreateList End ... ::');
    this.props.history.push(routePaths.myPageApprovalList());
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

      console.log('addApprovedLectureSingle reponseData.error ::' + (await reponseData).error);
      console.log('addApprovedLectureSingle reponseData.message ::' + (await reponseData).message);

      const errorData = (await reponseData).error;

      if(errorData) {
        reactAlert({ title: '알림', message: '에러 입니다. 관리자에게 문의 하세요.' });
      } else {
        reactAlert({ title: '알림', message: '성공입니다.' });
        this.routeToCreateList();
      }
    }

  }

  async addRejectedLectureSingle() {
    console.log('addRejectedLectureSingle click ::');
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
    console.log('addRejectedLectureSingle approvalCube.remark ::' + approvalCube.remark);

    this.onChangeStudentRequestCdoProps('remark', approvalCube.remark);
    this.onChangeStudentRequestCdoProps('proposalState', ProposalState.Rejected);
    const idNameApproval = new IdNameApproval({ id: userId, name });
    this.onChangeStudentRequestCdoProps('actor', idNameApproval);
    this.onChangeStudentRequestCdoProps('students', selectedListArr.selectedList);

    if (selectedList && approvalCubeService) {
      const reponseData = approvalCubeService.studentRequestReject(studentRequest);

      console.log('addApprovedLectureSingle reponseData.error ::' + (await reponseData).error);
      console.log('addApprovedLectureSingle reponseData.message ::' + (await reponseData).message);

      const errorData = (await reponseData).error;

      if(errorData) {
        reactAlert({ title: '알림', message: '에러 입니다. 관리자에게 문의 하세요.' });
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
    const { approvalCube } = this.props.approvalCubeService!;

    console.log('ApprovalSharedDetailContainer approvalCube remark :: ' + approvalCube.remark);
    console.log('ApprovalSharedDetailContainer approvalCube studentId :: ' + approvalCube.studentId);

    // const { cubeIntro } = this.props.cubeIntroService!;
    const { cubeType, cubeState, studentId } = this.props.match.params;
    const {
      alertWinOpen, confirmWinOpen, alertMessage, alertIcon, alertTitle, alertType,
    } = this.state;
    const { filesMap } = this.state;
    const message = <p className="center">입력하신 학습 강좌에 대해 저장 하시겠습니까?</p>;

    return (
      <>
        <section className="content bg-white">
          <div className="add-personal-learning">
            <div className="add-personal-learning-wrap">
              <div className="apl-tit">교육 승인 요청</div>
              <div className="apl-notice">
                학습 수강에 대한 승인 요청을 결제하실 수 있습니다.<br/>승인 혹은 반려 처리에 대한 승인자 의견을 함께 작성하실 수 있습니다.
              </div>
            </div>
          </div>
          <Segment className="full">
            <div className="apl-form-wrap">
              <Form>
                <ApprovalDetailBasicInfoView
                  approvalCube ={approvalCube}
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
              </Form>
            </div>
          </Segment>
        </section>
      </>
    );
  }
}
export default withRouter(ApprovalSharedDetailContainer);
