import * as React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import depot from '@nara.drama/depot';
import { AlertWin, ConfirmWin, ContentLayout, CubeType } from 'shared';
import { Button, Form, Segment } from 'semantic-ui-react';
import routePaths from '../../../routePaths';
import { PersonalCubeService } from '../../../personalcube';
import { CubeIntroModel, CubeIntroService } from '../../../cubeintro';
import { MediaService } from '../../../media';
import { OfficeWebService } from '../../../officeweb';
import { BoardService } from '../../../board';
import SharedDetailBasicInfoView from '../view/SharedDetailBasicInfoView';
import SharedDetailExposureInfoView from '../view/SharedDetailExposureInfoView';
import SharedDetailIntroView from '../view/SharedDetailIntroView';
import SharedTypeDetailView from '../view/SharedTypeDetailView';
import SharedDetailIntroEditContainer from './SharedDetailIntroEditContainer';


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

  filesMap: Map<string, any>
}

@inject(mobxHelper.injectFrom('personalCube.boardService', 'personalCube.personalCubeService',
  'personalCube.cubeIntroService', 'personalCube.mediaService', 'personalCube.officeWebService'))
@observer
@reactAutobind
class SharedDetailContainer extends React.Component<Props, States> {
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
    const personalCubeService = this.props.personalCubeService!;
    const cubeIntroService = this.props.cubeIntroService!;
    const { personalCubeId, cubeType } = this.props.match.params;

    this.clearAll();
    personalCubeService.findPersonalCube(personalCubeId)
      .then(() => {
        const { personalCube } = personalCubeService;
        const referenceFileBoxId = personalCube && personalCube.contents && personalCube.contents.fileBoxId;
        this.findFiles('reference', referenceFileBoxId);
      })
      .then(() => {
        const cubeIntroId = personalCubeService.personalCube
          && personalCubeService.personalCube.cubeIntro && personalCubeService.personalCube.cubeIntro.id;
        cubeIntroService.findCubeIntro(cubeIntroId)
          .then(() => {
            const { cubeIntro } = cubeIntroService;
            const reportFileBoxId = cubeIntro && cubeIntro.reportFileBox && cubeIntro.reportFileBox.fileBoxId;
            this.findFiles('report', reportFileBoxId);
          });

        const contentsId = personalCubeService.personalCube && personalCubeService.personalCube.contents
          && personalCubeService.personalCube.contents.contents && personalCubeService.personalCube.contents.contents.id;

        if (cubeType === 'Audio' || cubeType === 'Video') this.setMedia(contentsId);
        if (cubeType === 'Community') this.setCommunity(contentsId);
        if (cubeType === 'Documents' || cubeType === 'WebPage') this.setOfficeWeb(contentsId);
      });
  }

  clearAll() {
    //
    const {
      personalCubeService, cubeIntroService,
      mediaService, boardService, officeWebService,
    } = this.props;

    personalCubeService!.clearPersonalCube();
    personalCubeService!.clearFileName();
    cubeIntroService!.clearCubeIntro();
    mediaService!.clearMedia();
    boardService!.clearBoard();
    officeWebService!.clearOfficeWeb();
  }

  findFiles(type: string, fileBoxId: string) {
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
    const officeWebService = this.props.officeWebService!;

    officeWebService.findOfficeWeb(contentsId)
      .then(() => {
        const { officeWeb } = this.props.officeWebService || {} as OfficeWebService;
        const officeWebFileBoxId = officeWeb.fileBoxId;

        if (officeWebFileBoxId) {
          this.findFiles('officeweb', officeWebFileBoxId);
        }
      });
  }

  setMedia(contentsId: string) {
    //
    const mediaService = this.props.mediaService!;
    mediaService.findMedia(contentsId);
  }

  setCommunity(contentsId: string) {
    //
    const boardService = this.props.boardService!;
    boardService.findBoard(contentsId);
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
    }
    else {
      this.confirmBlank(cubeIntroMessage);
    }
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

    if (cubeType === CubeType.Video || cubeType === CubeType.Audio) {
      this.modifyMedia(personalCubeId, cubeIntro);
    }
    else if (cubeType === CubeType.Community) {
      this.modifyCommunity(personalCubeId, cubeIntro);
    }
    else if (cubeType === CubeType.Documents || cubeType === CubeType.WebPage) {
      this.modifyOfficeWeb(personalCubeId, cubeIntro);
    }
  }

  modifyMedia(personalCubeId: string, cubeIntro: CubeIntroModel) {
    //
    const mediaService = this.props.mediaService!;
    const { media } = mediaService;

    Promise.resolve()
      .then(() => mediaService.modifyMediaByUser(personalCubeId, cubeIntro, media))
      .then(() => this.routeToCreateList());
  }

  modifyCommunity(personalCubeId: string, cubeIntro: CubeIntroModel) {
    //
    const boardService = this.props.boardService!;
    const { board } = boardService;

    Promise.resolve()
      .then(() => boardService.modifyBoardByUser(personalCubeId, cubeIntro, board))
      .then(() => this.routeToCreateList());
  }

  modifyOfficeWeb(personalCubeId: string, cubeIntro: CubeIntroModel ) {
    //
    const officeWebService = this.props.officeWebService!;
    const { officeWeb } = this.props.officeWebService || {} as OfficeWebService;

    Promise.resolve()
      .then(() => officeWebService.modifyOfficeWebByUser(personalCubeId, cubeIntro, officeWeb))
      .then(() => this.routeToCreateList());
  }

  routeToCreateList() {
    //
    this.props.history.push(routePaths.create());
  }

  goToVideo(url: string) {
    //
    window.open(url);
  }

  render() {
    const { personalCube } = this.props.personalCubeService!;
    const { cubeIntro } = this.props.cubeIntroService!;
    const { cubeType, cubeState, personalCubeId } = this.props.match.params;
    const {
      alertWinOpen, confirmWinOpen, alertMessage, alertIcon, alertTitle, alertType,
    } = this.state;
    const { filesMap } = this.state;
    const message = <p className="center">입력하신 학습 강좌에 대해 저장 하시겠습니까?</p>;

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
                filesMap={filesMap}
                goToVideo={this.goToVideo}
              />
              {
                cubeState === 'OpenApproval' ?
                  <div className="buttons editor">
                    <Button className="fix bg" onClick={this.routeToCreateList}>List</Button>
                  </div>
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
                buttonYesName="OK"
                buttonNoName="Cancel"
              />
            </Form>
          </div>
        </Segment>
      </ContentLayout>

    );
  }
}
export default SharedDetailContainer;
