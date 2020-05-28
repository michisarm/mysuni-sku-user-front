
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
  // cubeIntroService?: CubeIntroService
  // mediaService?: MediaService
  // boardService?: BoardService
  // officeWebService?: OfficeWebService
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
    // const cubeIntroService = this.props.cubeIntroService!;
    const { studentId, cubeType } = this.props.match.params;

    console.log('componentDidMount personalCubeId :: ' + studentId);

    this.clearAll();

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
    // cubeIntroService!.clearCubeIntro();
    // mediaService!.clearMedia();
    // boardService!.clearBoard();
    // officeWebService!.clearOfficeWeb();
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

  setOfficeWeb(contentsId: string) {
    //
    // const officeWebService = this.props.officeWebService!;

    // officeWebService.findOfficeWeb(contentsId)
    //   .then(() => {
    //     const officeWebFileBoxId = officeWebService.officeWeb.fileBoxId;

    //     if (officeWebFileBoxId) {
    //       this.findFiles('officeweb', officeWebFileBoxId);
    //     }
    //   });
  }

  setMedia(contentsId: string) {
    //
    // const mediaService = this.props.mediaService!;
    // mediaService.findMedia(contentsId);
  }

  setCommunity(contentsId: string) {
    //
    // const boardService = this.props.boardService!;
    // boardService.findBoard(contentsId);
  }

  handleAlertOk(type: string) {
    //
    this.handleOKConfirmWin();
    /*const { personalCubeId } = this.props.match.params;
    if (type === 'approvalRequest') this.handleOKConfirmWin('approvalRequest');*/
  }

  handleSave() {

    // const { cubeIntro } = this.props.cubeIntroService!;
    // const cubeIntroObject = CubeIntroModel.isBlank(cubeIntro);
    // const cubeIntroMessage = '"' + cubeIntroObject + '" 은 필수 입력 항목입니다. 해당 정보를 입력하신 후 저장해주세요.';

    // if ( cubeIntroObject === 'success') {
    //   this.setState({ confirmWinOpen: true });
    // }
    // else {
    //   this.confirmBlank(cubeIntroMessage);
    // }
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

  handleOKConfirmWin() {
    //
    // const { cubeIntro } = this.props.cubeIntroService || {} as CubeIntroService;
    const { studentId, cubeType } = this.props.match.params;

    // if (cubeType === CubeType.Video || cubeType === CubeType.Audio) {
    //   this.modifyMedia(personalCubeId, cubeIntro);
    // }
    // else if (cubeType === CubeType.Community) {
    //   this.modifyCommunity(personalCubeId, cubeIntro);
    // }
    // else if (cubeType === CubeType.Documents || cubeType === CubeType.WebPage) {
    //   this.modifyOfficeWeb(personalCubeId, cubeIntro);
    // }
  }

  modifyCommunity(personalCubeId: string, cubeIntro: CubeIntroModel) {
    //
    // const boardService = this.props.boardService!;
    // const { board } = boardService;

    // Promise.resolve()
    //   .then(() => boardService.modifyBoardByUser(personalCubeId, cubeIntro, board))
    //   .then(() => this.routeToCreateList());
  }

  modifyOfficeWeb(personalCubeId: string, cubeIntro: CubeIntroModel ) {
    //
    // const officeWebService = this.props.officeWebService!;
    // const { officeWeb } = this.props.officeWebService || {} as OfficeWebService;

    // Promise.resolve()
    //   .then(() => officeWebService.modifyOfficeWebByUser(personalCubeId, cubeIntro, officeWeb))
    //   .then(() => this.routeToCreateList());
  }

  routeToCreateList() {
    //
    console.log(' routeToCreateList Start ... ::');
    // this.clearAll();
    window.location.replace('/suni-main/my-training/my-page/ApprovalList/pages/1');
    console.log(' routeToCreateList End ... ::');
    // this.props.history.push(routePaths.myPageApprovalList());
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

    this.onChangeStudentRequestCdoProps('remark', '승인요청 입니다.');
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

    this.onChangeStudentRequestCdoProps('remark', '반려 입니다.');
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
      }
    }

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
                              <textarea id="remark" name="remark" placeholder="승인자 의견을 입력해주세요" >{approvalCube.remark}</textarea>
                            </dd>
                          </div>
                        )
                      }
                      {
                        approvalCube.proposalState !== 'Submitted' && (
                          <div>
                            <dd>
                              <textarea id="remark" name="remark" placeholder=" " readOnly={true}>{approvalCube.remark }</textarea>
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
