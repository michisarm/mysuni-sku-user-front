import * as React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { CubeType } from 'shared';
import { BoardService } from '@sku/personalcube';
import CreateIntroView from '../view/CreateIntroView';
import { CubeIntroModel, CubeIntroService, InstructorModel } from '../../../personalcube/cubeintro';
import { ContentsProviderService } from '../../../college';
import CreateMediaContainer from './CreateMediaContainer';
import AlertWin from '../../../shared/ui/logic/AlertWin';
import ConfirmWin from '../../../shared/ui/logic/ConfirmWin';
import { MediaService } from '../../../personalcube/media';
import { OfficeWebService, PersonalCubeService } from '../../../personalcube';

interface Props extends RouteComponentProps<{ personalCubeId: string, cubeType: string }> {
  personalCubeService?: PersonalCubeService
  cubeIntroService?: CubeIntroService
  contentsProviderService?: ContentsProviderService
  mediaService ?: MediaService
  boardService ?: BoardService
  officeWebService ?: OfficeWebService
  //personalCubeId?: string
}

interface States{
  hour: number
  minute: number

  alertWinOpen: boolean
  alertIcon: string
  alertTitle: string
  alertType: string
  alertMessage: string

  confirmWinOpen: boolean
}

@inject('personalCubeService', 'cubeIntroService',
  'contentsProviderService', 'mediaService', 'boardService', 'officeWebService')
@observer
@reactAutobind
class CreateIntroContainer extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = { hour: 0, minute: 0, alertWinOpen: false,
      alertMessage: '', alertIcon: '', alertTitle: '', alertType: '',
      confirmWinOpen: false };
  }

  componentDidMount() {
    //
    const { cubeIntroService } = this.props;
    const { personalCubeId } = this.props.match.params;
    if (cubeIntroService && !personalCubeId) {
      cubeIntroService.clearCubeIntro();
    }
  }

  onChangeCubeIntroProps(name: string, value: string | number | {}) {
    //
    const { cubeIntroService } = this.props;
    if (cubeIntroService) cubeIntroService.changeCubeIntroProps(name, value);
  }

  setHourAndMinute(name: string, value: number) {
    //
    Promise.resolve()
      .then(() => {
        if (name === 'hour') this.setState({ hour: value });
        if (name === 'minute') this.setState({ minute: value });
      })
      .then(() => this.setLearningTime());
  }

  setLearningTime() {
    //
    const { hour, minute } = this.state;
    const numberHour = Number(hour);
    const numberMinute = Number(minute);
    const newMinute = numberHour * 60 + numberMinute;
    this.onChangeCubeIntroProps('learningTime', newMinute);
  }

  onHandleInstructorModalOk(selectedInstructor: InstructorModel) {
    //
    const { cubeIntroService } = this.props;
    if (cubeIntroService) {
      /* cubeIntroService.changeCubeIntroProps('description.instructor.employeeId', selectedInstructor.employeeId);
      cubeIntroService.changeCubeIntroProps('description.instructor.email', selectedInstructor.memberSummary.email);
      cubeIntroService.changeCubeIntroProps('description.instructor.name', selectedInstructor.memberSummary.name);
      cubeIntroService.changeCubeIntroProps('description.instructor.company', selectedInstructor.memberSummary.department);
      cubeIntroService.changeCubeIntroProps('description.instructor.category', selectedInstructor.specialtyEnName);
      cubeIntroService.changeCubeIntroProps('description.instructor.internal', selectedInstructor.internal);
*/
      cubeIntroService.changeInstructorListModalOpen(false);
    }
  }

  routeToBasicList() {
    //
    this.props.history.push(`/personalcube/create-detail`);
  }

  routeToCreateList() {
    //
    this.props.history.push(`/personalcube/create`);
  }

  handleSave() {

    const { cubeIntro } = this.props.cubeIntroService || {} as CubeIntroService;
    const cubeIntroObject = CubeIntroModel.isBlank(cubeIntro);
    const cubeIntroMessage = '"' + cubeIntroObject + '" 은 필수 입력 항목입니다. 해당 정보를 입력하신 후 저장해주세요.';
    if ( cubeIntroObject === 'success') {
      this.setState({ confirmWinOpen: true });
      return;
    }
    if (cubeIntroObject !== 'success') this.confirmBlank(cubeIntroMessage);
  }

  confirmBlank(message: string) {
    //
    this.setState({ alertMessage: message, alertWinOpen: true, alertTitle: '필수 정보 입력 안내', alertIcon: 'triangle' });
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

  handleOKConfirmWin(mode?: string) {
    //
    const { cubeIntro } = this.props.cubeIntroService || {} as CubeIntroService;
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    const { personalCubeId, cubeType } = this.props.match.params;
    const contentId  = personalCube.contents.contents.id;
    const cubeIntroId = personalCube.cubeIntro.id;
    console.log(personalCubeId);
    if (cubeType === CubeType.Video
      || cubeType === CubeType.Audio) this.makeMedia(personalCubeId, cubeIntro, contentId, cubeIntroId);
    if (cubeType === CubeType.Community) this.makeCommunity(personalCubeId, cubeIntro,  contentId, cubeIntroId);
    if (cubeType === CubeType.Documents
      || cubeType === CubeType.WebPage) this.makeOfficeWeb(personalCubeId, cubeIntro, contentId, cubeIntroId);
  }

  makeMedia(personalCubeId: string, cubeIntro: CubeIntroModel, contentId: string, cubeIntroId : string  ) {
    //
    const { mediaService } = this.props;
    const { media } = this.props.mediaService || {} as MediaService;
    if (mediaService && !contentId && !cubeIntroId) {
      mediaService.makeMediaByUser(personalCubeId, cubeIntro, media)
        .then(() => this.routeToCreateList());
    }
    /* if (mediaService && mode) {
      Promise.resolve()
        .then(() => mediaService.modifyMedia(personalCubeId, cubeIntro, media))
        .then(() => this.routeToBasicList());
    }*/

  }

  makeCommunity(personalCubeId: string, cubeIntro: CubeIntroModel, contentId: string, cubeIntroId : string  ) {
    //
    const { boardService } = this.props;
    const { board } = this.props.boardService || {} as BoardService;
    /* if (boardService && !mode) {
      boardService.makeBoardByUser(personalCubeId, cubeIntro, board)
        .then(() => this.routeToBasicList());
    }*/
    /*if (boardService && mode) {
      Promise.resolve()
        .then(() => boardService.modifyBoard(personalCubeId, cube, cubeIntro, board))
        .then(() => this.routeToCubeList());
    }*/

  }

  makeOfficeWeb(personalCubeId: string, cubeIntro: CubeIntroModel, contentId: string, cubeIntroId : string  ) {
    //
    const { officeWebService } = this.props;
    const { officeWeb } = this.props.officeWebService || {} as OfficeWebService;
    if (officeWebService && !contentId && !cubeIntroId) {
      officeWebService.makeOfficeWebByUser(personalCubeId, cubeIntro, officeWeb)
        .then(() => this.routeToCreateList());
    }
    /*if (officeWebService && mode) {
      Promise.resolve()
        .then(() => officeWebService.modifyOfficeWeb(personalCubeId, cube, cubeIntro, officeWeb))
        .then(() => this.routeToCubeList());
    }*/
  }

  handleAlertOk(type: string) {
    //
    const { personalCubeId } = this.props.match.params;
    if (type === 'approvalRequest') this.handleOKConfirmWin('modify');
    if (type === 'justOk') this.handleCloseAlertWin();
    if (type === 'remove') this.handleDeleteCube(personalCubeId);
  }

  handleDeleteCube(personalCubeId: string) {
    //
    const { mediaService, boardService, officeWebService } = this.props;
    const { cubeType } = this.props.match.params;
    Promise.resolve()
      .then(() => {
        if ( mediaService && boardService && officeWebService) {
          if (cubeType === 'Video' || cubeType === 'Audio') mediaService.removeMedia(personalCubeId);
          if (cubeType === 'Community') boardService.removeBoard(personalCubeId);
          if (cubeType === 'Documents' || cubeType === 'WebPage') officeWebService.removeOfficeWeb(personalCubeId);
        }
      })
      .then(() => this.props.history.push(`/cubes/cube-list`));
  }

  render() {

    const {
      cubeIntro, changeManagerListModalOpen, instructorListModalOpen,
    } = this.props.cubeIntroService || {} as CubeIntroService;
    const {
      hour, minute, alertWinOpen, confirmWinOpen, alertMessage, alertIcon, alertTitle, alertType,
    } = this.state;
    //const cubeType = personalCube && personalCube.contents && personalCube.contents.type;
    const { cubeType, personalCubeId } = this.props.match.params;

    console.log(cubeType);
    console.log(personalCubeId);
    const message = (
      <>
        <p className="center">입력하신 학습 강좌에 대해 승인 요청하시겠습니까?</p>
        <p className="center">바로 승인 요청을 하지 않아도 원하시는 시점에 승인 요청을 하실 수 있습니다. </p>
      </>
    );
    return (
      <section className="content bg-white">
        <div className="add-personal-learning support">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">Create</div>
            <div className="apl-notice">
              내가 갖고 있는 지식을 강좌로 만들 수 있습니다.<br />관리자의 확인 절차를 거쳐 다른 University 사용자에게 전파해보세요.
            </div>
          </div>
        </div>

        <Segment className="full">
          <div className="apl-form-wrap create">
            <Form>
              <CreateIntroView
                cubeIntro={cubeIntro}
                onChangeCubeIntroProps={this.onChangeCubeIntroProps}
                setHourAndMinute={this.setHourAndMinute}
                hour={hour}
                minute={minute}
                cubeType={cubeType}
                changeManagerListModalOpen={changeManagerListModalOpen}
                instructorListModalOpen={instructorListModalOpen}
                onHandleInstructorModalOk={this.onHandleInstructorModalOk}
              />
              <CreateMediaContainer
                cubeType={cubeType}
              />
              {
                personalCubeId ?
                  <div className="buttons">
                    <Button className="fix line">Delete</Button>
                    <Button className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                    <Button className="fix line" onClick={this.handleSave}>Save</Button>
                    <Button className="fix line" onClick={this.routeToBasicList}>Previous</Button>
                    <Button className=" fix bg">Next</Button>
                  </div>
                  :
                  <div className="buttons">
                    <Button className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                    <Button className="fix line" onClick={this.handleSave}>Save</Button>
                    <Button className="fix line" onClick={this.routeToBasicList}>Previous</Button>
                    <Button className="fix bg">Next</Button>
                  </div>
              }
              <AlertWin
                message={alertMessage}
                handleClose={this.handleCloseAlertWin}
                open={alertWinOpen}
                alertIcon={alertIcon}
                title={alertTitle}
                type={alertType}
                handleOk={this.handleAlertOk}
              />
              <ConfirmWin
                id={personalCubeId}
                message={message}
                open={confirmWinOpen}
                handleClose={this.handleCloseConfirmWin}
                handleOk={this.handleOKConfirmWin}
                //handleSaveAndApprove={this.handleSaveAndApprove}
                title="저장 안내"
                buttonYesName="저장"
                buttonNoName="취소"
              />
            </Form>
          </div>
        </Segment>
      </section>
    );
  }
}

export default withRouter(CreateIntroContainer);
