import * as React from 'react';
import { ContentLayout, CubeType, mobxHelper } from 'shared';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import { PersonalCubeService } from '../../../personalcube/personalcube';
import { CubeIntroModel, CubeIntroService } from '../../../personalcube/cubeintro';
import { MediaService } from '../../../personalcube/media';
import { OfficeWebService } from '../../../personalcube/officeweb';
import { BoardService } from '../../../personalcube/board';
import SharedDetailBasicInfoView from '../view/SharedDetailBasicInfoView';
import SharedDetailExposureInfoView from '../view/SharedDetailExposureInfoView';
import SharedDetailIntroView from '../view/SharedDetailIntroView';
import SharedTypeDetailView from '../view/SharedTypeDetailView';
import SharedDetailIntroEditContainer from './SharedDetailIntroEditContainer';
import AlertWin from '../../../shared/ui/logic/AlertWin';
import ConfirmWin from '../../../shared/ui/logic/ConfirmWin';

interface Props extends RouteComponentProps<{ personalCubeId: string, cubeType: string, cubeState: string }> {
  personalCubeService?: PersonalCubeService
  cubeIntroService?: CubeIntroService
  mediaService?: MediaService
  boardService?: BoardService
  officeWebService?: OfficeWebService
}

interface States {
  alertWinOpen: boolean
  alertIcon: string
  alertTitle: string
  alertType: string
  alertMessage: string

  confirmWinOpen: boolean
}

@inject(mobxHelper.injectFrom('personalCube.boardService', 'personalCube.personalCubeService',
  'personalCube.cubeIntroService', 'personalCube.mediaService', 'personalCube.officeWebService'))
@observer
@reactAutobind
class SharedDetailContainer extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = { alertWinOpen: false,
      alertMessage: '', alertIcon: '', alertTitle: '', alertType: '',
      confirmWinOpen: false };
  }

  componentDidMount() {
    const { personalCubeService, cubeIntroService } = this.props;
    const { personalCubeId, cubeType } = this.props.match.params;

    if (personalCubeService && cubeIntroService) {
      personalCubeService.findPersonalCube(personalCubeId)
        .then(() => {
          const cubeIntroId = personalCubeService.personalCube
            && personalCubeService.personalCube.cubeIntro && personalCubeService.personalCube.cubeIntro.id;
          cubeIntroService.findCubeIntro(cubeIntroId);
        })
        .then(() => {
          const contentsId = personalCubeService.personalCube && personalCubeService.personalCube.contents
            && personalCubeService.personalCube.contents.contents && personalCubeService.personalCube.contents.contents.id;
          if (cubeType === 'Audio' || cubeType === 'Video') this.setMedia(contentsId);
          if (cubeType === 'Community') this.setCommunity(contentsId);
          if (cubeType === 'Documents' || cubeType === 'WebPage') this.setOfficeWeb(contentsId);
        });
    }
  }

  setOfficeWeb(contentsId: string) {
    //
    const { officeWebService } = this.props;
    if (officeWebService) officeWebService.findOfficeWeb(contentsId);
  }

  setMedia(contentsId: string) {
    //
    const { mediaService } = this.props;
    if ( mediaService ) mediaService.findMedia(contentsId);
  }

  setCommunity(contentsId: string) {
    //
    const { boardService } = this.props;
    if ( boardService) boardService.findBoard(contentsId);
  }

  handleAlertOk(type: string) {
    //
    this.handleOKConfirmWin();
    /*const { personalCubeId } = this.props.match.params;
    if (type === 'approvalRequest') this.handleOKConfirmWin('approvalRequest');*/
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
    const { personalCubeId, cubeType } = this.props.match.params;

    if (cubeType === CubeType.Video
      || cubeType === CubeType.Audio) this.modifyMedia(personalCubeId, cubeIntro);
    if (cubeType === CubeType.Community) this.modifyCommunity(personalCubeId, cubeIntro);
    if (cubeType === CubeType.Documents
      || cubeType === CubeType.WebPage) this.modifyOfficeWeb(personalCubeId, cubeIntro);
  }

  modifyMedia(personalCubeId: string, cubeIntro: CubeIntroModel) {
    //
    const { mediaService } = this.props;
    const { media } = this.props.mediaService || {} as MediaService;

    if (mediaService) {
      Promise.resolve()
        .then(() => mediaService.modifyMediaByUser(personalCubeId, cubeIntro, media))
        .then(() => this.routeToCreateList());
    }
  }

  modifyCommunity(personalCubeId: string, cubeIntro: CubeIntroModel) {
    //
    const { boardService } = this.props;
    const { board } = this.props.boardService || {} as BoardService;

    if (boardService ) {
      Promise.resolve()
        .then(() => boardService.modifyBoardByUser(personalCubeId, cubeIntro, board))
        .then(() => this.routeToCreateList());
    }
  }

  modifyOfficeWeb(personalCubeId: string, cubeIntro: CubeIntroModel ) {
    //
    const { officeWebService } = this.props;
    const { officeWeb } = this.props.officeWebService || {} as OfficeWebService;

    if (officeWebService ) {
      Promise.resolve()
        .then(() => officeWebService.modifyOfficeWebByUser(personalCubeId, cubeIntro, officeWeb))
        .then(() => this.routeToCreateList());
    }
  }

  routeToCreateList() {
    //
    this.props.history.push(`/personalcube/create`);
  }

  render() {
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    const { cubeIntro } = this.props.cubeIntroService || {} as CubeIntroService;
    const { cubeType, cubeState, personalCubeId } = this.props.match.params;
    const {
      alertWinOpen, confirmWinOpen, alertMessage, alertIcon, alertTitle, alertType,
    } = this.state;
    const message = (
      <>
        <p className="center">입력하신 학습 강좌에 대해 저장 하시겠습니까?</p>
      </>
    );

    return (
      <ContentLayout className="bg-white">
        <div className="add-personal-learning support">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">Detail</div>
            <div className="apl-notice">
              생성하신 학습에 대한 확인과 수정, 그리고 승인요청을 할수 있습니다.
            </div>
          </div>
        </div>
        <Segment className="full">
          <div className="apl-form-wrap create">
            <Form>
              <SharedDetailBasicInfoView
                personalCube ={personalCube}
              />
              <SharedDetailExposureInfoView
                personalCube={personalCube}
              />

              {
              cubeState === 'OpenApproval' ?
                <SharedDetailIntroView
                  cubeIntro={cubeIntro}
                  cubeType={cubeType}
                />
                :
                <SharedDetailIntroEditContainer
                  cubeIntro={cubeIntro}
                />
            }

              <SharedTypeDetailView
                personalCube={personalCube}
                cubeType={cubeType}
              />
              {
                cubeState === 'OpenApproval' ?
                  <>
                    {/* List 영역에서 저장 상태인 항목 view page 진입 시 */}
                    {/* <div className="buttons editor">
                  <Button className="fix line">Delete</Button>
                  <Button className="fix line">List</Button>
                  <Button className="fix line">Modify</Button>
                  <Button className="fix bg">Shared</Button>
                </div>
                */}
                    <br />
                    {/* // List 영역에서 저장 상태인 항목 view page 진입 시 */}
                    {/* List 영역에서 승인 대기상태인 항목 view page 진입 시 */}
                    <div className="buttons editor">
                      <Button className="fix bg" onClick={this.routeToCreateList}>List</Button>
                    </div>
                    <br />
                    {/* // List 영역에서 승인 대기상태인 항목 view page 진입 시 */}
                    {/* List 영역에서 승인 완료 상태 항목 view page 진입 시 */}
                    {/*<div className="buttons editor">
                  <Button className="fix line">List</Button>
                  <Button className="fix bg">Modify</Button>
                </div>*/}
                  </>
                  :
                  <div className="buttons">
                    <Button className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                    <Button className="fix bg" onClick={this.handleSave}>Save</Button>
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
      </ContentLayout>

    );
  }
}
export default SharedDetailContainer;
