
import React from 'react';
import { reactAutobind, mobxHelper, reactConfirm } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { Button } from 'semantic-ui-react';
import { CubeState, CubeType } from 'shared';
import { BoardService } from 'personalcube/community';
import { CollegeService, ContentsProviderService } from 'college/stores';
import routePaths from '../../../routePaths';
import { OfficeWebService, PersonalCubeService } from '../../../index';
import { PersonalCubeModel } from '../../../personalcube';
import { CubeIntroModel, CubeIntroService } from '../../../cubeintro';
import { MediaModel, MediaService } from '../../../media';
import AlertWin from '../../../../shared/ui/logic/AlertWin';
import ConfirmWin from '../../../../shared/ui/logic/ConfirmWin';

import CubeIntroMediaContainer from './CubeIntroMediaContainer';
import CubeIntroView from '../view/CubeIntroView';
import { FormTitle } from '../view/DetailElementsView';


interface Props extends RouteComponentProps<{ personalCubeId: string, cubeType: string }> {
  personalCubeService?: PersonalCubeService
  cubeIntroService?: CubeIntroService
  contentsProviderService?: ContentsProviderService
  collegeService?: CollegeService
  mediaService ?: MediaService
  boardService?: BoardService
  officeWebService ?: OfficeWebService
}

interface State {
  hour: number
  minute: number

  alertWinOpen: boolean
  alertIcon: string
  alertTitle: string
  alertType: string
  alertMessage: string

  confirmWinOpen: boolean
}

@inject(mobxHelper.injectFrom(
  'college.contentsProviderService',
  'college.collegeService',
  'personalCube.boardService',
  'personalCube.personalCubeService',
  'personalCube.cubeIntroService',
  'personalCube.mediaService',
  'personalCube.officeWebService'))
@observer
@reactAutobind
class CubeIntroContentContainer extends React.Component<Props, State> {
  //
  state = {
    hour: 0,
    minute: 0,
    alertWinOpen: false,
    alertMessage: '',
    alertIcon: '',
    alertTitle: '',
    alertType: '',
    confirmWinOpen: false,
  };

  componentDidMount() {
    //
    this.init();
  }

  componentWillUnmount(): void {
    //
    patronInfo.clearWorkspace();
  }

  async init() {
    //
    const { cubeIntroService, collegeService } = this.props;
    const personalCubeService = this.props.personalCubeService!;
    const { cubeType, personalCubeId } = this.props.match.params;

    if (cubeType === 'Video' || cubeType === 'Audio') collegeService!.findAllCollegesForPanopto();
    if (personalCubeId) {
      // await personalCubeService.findPersonalCube(personalCubeId);
      const personalCube = await personalCubeService.findPersonalCube(personalCubeId);

      patronInfo.setWorkspaceByDomain(personalCube!);
    }
    const cubeIntroId = personalCubeService && personalCubeService.personalCube && personalCubeService.personalCube.cubeIntro
      && personalCubeService.personalCube.cubeIntro.id;

    if (!cubeIntroId) {
      this.clearAll();
    }
    else if (personalCubeId) {
      cubeIntroService!.findCubeIntro(cubeIntroId)
        .then(() => {
          const contentsId = personalCubeService.personalCube && personalCubeService.personalCube.contents
            && personalCubeService.personalCube.contents.contents && personalCubeService.personalCube.contents.contents.id;

          if (cubeType === 'Audio' || cubeType === 'Video') this.setMedia(contentsId);
          else if (cubeType === 'Community') this.setCommunity(contentsId);
          else if (cubeType === 'Documents' || cubeType === 'WebPage' || cubeType === 'Experiential') this.setOfficeWeb(contentsId);
        });
    }
  }

  clearAll() {
    //
    const {
      cubeIntroService,
      mediaService,
      boardService,
      officeWebService,
    } = this.props;

    cubeIntroService!.clearCubeIntro();
    mediaService!.clearMedia();
    boardService!.clearBoard();
    officeWebService!.clearOfficeWeb();
  }

  setOfficeWeb(contentsId: string) {
    //
    const { officeWebService } = this.props;
    officeWebService!.findOfficeWeb(contentsId);
  }

  setCommunity(contentsId: string) {
    //
    const { boardService } = this.props;
    boardService!.findBoard(contentsId);
  }

  setMedia(contentsId: string) {
    //
    const { mediaService } = this.props;
    mediaService!.findMedia(contentsId);
  }

  onChangeCubeIntroProps(name: string, value: string | number | {}) {
    //
    const { cubeIntroService } = this.props;
    if (value < 0) value = 0;
    cubeIntroService!.changeCubeIntroProps(name, value);
  }

  onChangeHourAndMinute(name: string, value: number) {
    //
    let nextValue = value;

    if (name === 'hour') {
      let minute = this.state.minute;

      if (value >= 40) {
        if (minute > 0) {
          minute = 0;
          this.setState({ minute });
        }
        nextValue = 40;
      }
      this.setState({ hour: nextValue });
      this.setLearningTime(nextValue, minute);
    }
    else if (name === 'minute') {
      const { hour } = this.state;

      if (hour === 40) {
        nextValue = 0;
      }
      else if (value >= 60) {
        nextValue = 59;
      }
      this.setState({ minute: nextValue });
      this.setLearningTime(hour, nextValue);
    }
  }

  setLearningTime(hour: number, minute: number) {
    //
    const learningTime = hour * 60 + minute;
    this.onChangeCubeIntroProps('learningTime', learningTime);
  }

  routeToBasicList(personalCubeId?: string, cubeType?: string) {
    //
    if (personalCubeId === 'undefined') {
      this.props.history.push(routePaths.createNew());
    } else {
      this.handleOKConfirmWin();
      this.props.history.push(routePaths.createPersonalCubeDetail(personalCubeId || '', cubeType || ''));
      // Promise.resolve()
      //   .then(() => this.handleOKConfirmWin())
      //   .then(() => this.props.history.push(routePaths.createDetail(personalCubeId || '', cubeType || '')));
    }
  }

  routeToCreateList() {
    //
    this.setState({
      confirmWinOpen: false,
    }, () => {
      reactConfirm({
        title: '저장완료',
        message: '저장되었습니다. 목록 페이지로 이동하시겠습니까?',
        onOk: () => this.props.history.push(routePaths.create()),
        onCancel: () => {
          const { params } = this.props.match;

          this.props.history.replace('/empty');
          setTimeout(() => this.props.history.replace(routePaths.createCubeIntroDetail(params.personalCubeId, params.cubeType)), 0);
        },
      });
    });
  }

  handleSave() {
    const { personalCube } = this.props.personalCubeService!;
    const { cubeIntro } = this.props.cubeIntroService!;
    const { media } = this.props.mediaService!;
    const cubeIntroObject = CubeIntroModel.isBlank(cubeIntro);
    let mediaObject = 'success';
    if (personalCube.contents.type === CubeType.Video || personalCube.contents.type === CubeType.Audio) {
      mediaObject = MediaModel.isBlank(media);
    }

    const cubeIntroMessage = '"' + cubeIntroObject + '" 은 필수 입력 항목입니다. 해당 정보를 입력하신 후 저장해주세요.';
    const mediaMessage = mediaObject;
    if ( cubeIntroObject === 'success' && mediaObject === 'success') {
      this.setState({ confirmWinOpen: true });
      return;
    }
    if (cubeIntroObject !== 'success') this.confirmBlank(cubeIntroMessage);
    if (mediaMessage !== 'success') this.confirmBlank(mediaMessage);
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
    const { personalCubeService, cubeIntroService, match } = this.props;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;
    const { personalCubeId, cubeType } = match.params;
    const contentId  = personalCube.contents.contents.id;
    const cubeIntroId = personalCube.cubeIntro.id;

    if (personalCubeId) {
      return personalCubeService!.modifyPersonalCube(personalCubeId, personalCube)
        .then(() => {
          if (cubeIntroId) {
            return cubeIntroService!.modifyCubeIntro(cubeIntroId, cubeIntro);
          }
          return null;
        })
        .then(() => {
          if (cubeType === CubeType.Video || cubeType === CubeType.Audio) {
            this.makeMedia(personalCubeId, personalCube, cubeIntro, contentId, cubeIntroId, mode && mode);
          }
          else if (cubeType === CubeType.Community) {
            this.makeCommunity(personalCubeId, personalCube, cubeIntro,  contentId, cubeIntroId, mode && mode);
          }
          else if (cubeType === CubeType.Documents || cubeType === CubeType.WebPage) {
            this.makeOfficeWeb(personalCubeId, personalCube, cubeIntro, contentId, cubeIntroId, mode && mode);
          }
        });
    }
    return null;
  }

  makeMedia(personalCubeId: string, cube: PersonalCubeModel, cubeIntro: CubeIntroModel, contentId: string, cubeIntroId : string, mode?: string  ) {
    //
    const { mediaService } = this.props;
    const { media } = mediaService!;

    if (!contentId && !cubeIntroId) {
      mediaService!.makeMediaByUser(personalCubeId, cubeIntro, media)
        .then(() => this.routeToCreateList());
    }
    if (mode === 'modify') {
      mediaService!.modifyMediaByUser(personalCubeId, cubeIntro, media)
        .then(() => this.routeToCreateList());
    }

    if (mode === 'approvalRequest') {
      mediaService!.modifyMedia(personalCubeId, cube, cubeIntro, media)
        .then(() => this.routeToCreateList());
    }
  }

  makeCommunity(personalCubeId: string, cube: PersonalCubeModel, cubeIntro: CubeIntroModel, contentId: string, cubeIntroId : string, mode?: string ) {
    //
    const { boardService } = this.props;
    const { board } = boardService!;

    if (!contentId && !cubeIntroId && !mode) {
      boardService!.makeBoardByUser(personalCubeId, cubeIntro, board)
        .then(() => this.routeToCreateList());
    }
    if (mode === 'modify') {
      boardService!.modifyBoardByUser(personalCubeId, cubeIntro, board)
        .then(() => this.routeToCreateList());
    }
    if (mode === 'approvalRequest') {
      boardService!.modifyBoard(personalCubeId, cube, cubeIntro, board)
        .then(() => this.routeToCreateList());
    }
  }

  makeOfficeWeb(personalCubeId: string, cube: PersonalCubeModel, cubeIntro: CubeIntroModel, contentId: string, cubeIntroId : string, mode?: string) {
    //
    const { officeWebService } = this.props;
    const { officeWeb } = officeWebService!;

    if (!contentId && !cubeIntroId && !mode) {
      officeWebService!.makeOfficeWebByUser(personalCubeId, cubeIntro, officeWeb)
        .then(() => this.routeToCreateList());
    }
    if (mode === 'modify') {
      officeWebService!.modifyOfficeWebByUser(personalCubeId, cubeIntro, officeWeb)
        .then(() => this.routeToCreateList());
    }

    if (mode === 'approvalRequest') {
      officeWebService!.modifyOfficeWeb(personalCubeId, cube, cubeIntro, officeWeb)
        .then(() => this.routeToCreateList());
    }

  }

  handleApprovalRequest() {
    //
    const message = '학습 강좌에 대해 승인 요청하시겠습니까?';
    const { personalCube } = this.props.personalCubeService!;
    const { cubeIntro } = this.props.cubeIntroService!;
    const { media } = this.props.mediaService!;
    const cubeIntroObject = CubeIntroModel.isBlank(cubeIntro);

    let mediaObject = 'success';
    if (personalCube.contents.type === CubeType.Video || personalCube.contents.type === CubeType.Audio) {
      mediaObject = MediaModel.isBlank(media);
    }

    const cubeIntroMessage = '"' + cubeIntroObject + '" 은 필수 입력 항목입니다. 해당 정보를 입력하신 후 저장해주세요.';
    const mediaMessage = mediaObject;
    if ( cubeIntroObject === 'success' && mediaObject === 'success') {
      Promise.resolve()
        .then(() => this.onChangePersonalCubeProps('cubeState', CubeState.OpenApproval))
        .then(() => this.setState({
          alertMessage: message,
          alertWinOpen: true,
          alertTitle: '승인 요청 안내',
          alertIcon: 'circle',
          alertType: 'approvalRequest',
        }));
    }
    if (cubeIntroObject !== 'success') this.confirmBlank(cubeIntroMessage);
    if (mediaMessage !== 'success') this.confirmBlank(mediaMessage);

  }

  onDeleteCube() {
    //
    const message = '등록된 Cube 정보를 삭제하시겠습니까?  삭제하신 정보는 복구하실 수 없습니다.';
    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: 'Create 삭제',
      alertIcon: 'circle',
      alertType: 'remove',
    });
  }

  onChangePersonalCubeProps(name: string, value: string | {} | []) {
    //
    const { personalCubeService } = this.props;
    let getTagList = [];

    if (name === 'tags' && typeof value === 'string') {
      getTagList = value.split(',');
      personalCubeService!.changeCubeProps('tags', getTagList);
      personalCubeService!.changeCubeProps('tag', value);
    }
    if (name !== 'tags') personalCubeService!.changeCubeProps(name, value);
  }

  handleAlertOk(type: string) {
    //
    const { personalCubeId } = this.props.match.params;

    if (type === 'approvalRequest') this.handleOKConfirmWin('approvalRequest');
    if (type === 'justOk') this.handleCloseAlertWin();
    if (type === 'remove') this.handleDeleteCube(personalCubeId);
  }

  handleDeleteCube(personalCubeId: string) {
    //
    const { mediaService, boardService, officeWebService } = this.props;
    const { cubeType } = this.props.match.params;

    Promise.resolve()
      .then(() => {
        if (cubeType === 'Video' || cubeType === 'Audio') mediaService!.removeMedia(personalCubeId);
        if (cubeType === 'Community') boardService!.removeBoard(personalCubeId);
        if (cubeType === 'Documents' || cubeType === 'WebPage') officeWebService!.removeOfficeWeb(personalCubeId);
      })
      .then(() => this.props.history.push(routePaths.create()));
  }

  render() {

    const { cubeIntro } = this.props.cubeIntroService!;
    const {
      hour, minute, alertWinOpen, confirmWinOpen, alertMessage, alertIcon, alertTitle, alertType,
    } = this.state;
    const { cubeType, personalCubeId } = this.props.match.params;
    const cubeIntroId  = cubeIntro && cubeIntro.id;

    const message = <p className="center">입력하신 학습 강좌에 대해 저장 하시겠습니까?</p>;

    return (
      <>
        <FormTitle
          activeStep={2}
        />

        <CubeIntroView
          cubeIntro={cubeIntro}
          hour={hour}
          minute={minute}
          cubeType={cubeType}
          onChangeCubeIntroProps={this.onChangeCubeIntroProps}
          onChangeHourAndMinute={this.onChangeHourAndMinute}
        />
        <CubeIntroMediaContainer
          cubeType={cubeType}
          onChangePersonalCubeProps={this.onChangePersonalCubeProps}
        />
        {
          personalCubeId ?
            <div className="buttons">
              <Button className="fix line" onClick={this.onDeleteCube}>Delete</Button>
              <Button className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
              <Button className="fix line" onClick={() => this.routeToBasicList(personalCubeId, cubeType)}>Previous</Button>
              { cubeIntroId ?
                <>
                  <Button className="fix line" onClick={this.handleSave}>Save</Button>
                  <Button className="fix bg" onClick={() => this.handleApprovalRequest()}>Shared</Button>
                </>
                :
                <Button className="fix bg" onClick={this.handleSave}>Save</Button>
              }
            </div>
            :
            <div className="buttons">
              <Button className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
              <Button className="fix line" onClick={this.handleSave}>Save</Button>
              <Button className="fix line" onClick={() => this.routeToBasicList}>Previous</Button>
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
          id={cubeIntroId}
          message={message}
          open={confirmWinOpen}
          handleClose={this.handleCloseConfirmWin}
          handleOk={this.handleOKConfirmWin}
          title="저장 안내"
          buttonYesName="OK"
          buttonNoName="Cancel"
        />
      </>
    );
  }
}

export default withRouter(CubeIntroContentContainer);
