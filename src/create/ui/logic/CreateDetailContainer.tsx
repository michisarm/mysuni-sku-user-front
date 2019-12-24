import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Form, Segment } from 'semantic-ui-react';
import { PersonalCubeModel, PersonalCubeService } from 'personalcube/personalcube';
import { ContentLayout, CubeType, mobxHelper } from 'shared';
import { BoardService } from '@sku/personalcube';
import CreateBasicInfoContainer from './CreateBasicInfoContainer';
import CreateExposureInfoContainer from './CreateExposureInfoContainer';
import { CubeIntroModel, CubeIntroService } from '../../../personalcube/cubeintro';
import { MediaService } from '../../../personalcube/media';
import AlertWin from '../../../shared/ui/logic/AlertWin';
import ConfirmWin from '../../../shared/ui/logic/ConfirmWin';
import { OfficeWebService } from '../../../personalcube/officeweb';

interface Props extends RouteComponentProps<{ personalCubeId: string, cubeType: string }> {
  personalCubeService?: PersonalCubeService
  cubeIntroService?: CubeIntroService
  mediaService?: MediaService
  officeWebService?: OfficeWebService
  boardService?: BoardService

}


interface States {
  tags: string
  alertWinOpen: boolean
  alertIcon: string
  alertTitle: string
  alertType: string
  alertMessage: string

  confirmWinOpen: boolean
}

@inject(mobxHelper.injectFrom('personalCube.personalCubeService', 'personalCube.mediaService'))
@observer
@reactAutobind
class CreateDetailContainer extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = {
      tags: '', alertWinOpen: false,
      alertMessage: '', alertIcon: '', alertTitle: '', alertType: '',
      confirmWinOpen: false,
    };
  }

  componentDidMount(): void {
    //
    const { personalCubeService, cubeIntroService } = this.props;
    const { personalCubeId, cubeType } = this.props.match.params;
    if (personalCubeService && cubeIntroService) {
      if (!personalCubeId && !cubeType) {
        this.clearAll();
      } else {
        personalCubeService.findPersonalCube(personalCubeId)
          .then(() => cubeIntroService.findCubeIntro(personalCubeService.personalCube.cubeIntro.id))
          .then(() => {
            console.log(cubeIntroService);

          });
      }
    }
  }

  clearAll() {
    //
    const {
      personalCubeService,
    } = this.props;
    if (personalCubeService) {
      personalCubeService.clearPersonalCube();
    }
  }

  routeToCreateList() {
    //
    this.props.history.push(`/personalcube/create`);
  }

  onChangePersonalCubeProps(name: string, value: string | {}) {
    //
    const { personalCubeService } = this.props;
    let getTagList = [];
    if (personalCubeService && name === 'tags' && typeof value === 'string') {
      getTagList = value.split(',');
      personalCubeService.changeCubeProps('tags', getTagList);
    }
    if (personalCubeService && name !== 'tags') personalCubeService.changeCubeProps(name, value);
  }

  handleSave() {
    //
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    const personalCubeObject = PersonalCubeModel.isBlank(personalCube);

    if (personalCubeObject === 'success') {
      this.setState({ confirmWinOpen: true });
      return;
    }
    if (personalCubeObject !== 'success') this.confirmBlank(personalCubeObject);
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
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    const { cubeIntro } = this.props.cubeIntroService || {} as CubeIntroService;
    const { personalCubeId } = this.props.match.params;
    const type = personalCube && personalCube.contents && personalCube.contents.type;
    const { personalCubeService } = this.props;
    if (personalCubeService && !personalCubeId) {
      personalCubeService.registerCube(personalCube)
        .then(() => this.routeToCreateIntro());
    }
  }

  handleAlertOk(type: string) {
    //
    const { personalCubeId } = this.props.match.params;
    if (type === 'approvalRequest') this.handleOKConfirmWin('modify');
    if (type === 'justOk') this.handleCloseAlertWin();
    if (type === 'remove') this.handleDeleteCube(personalCubeId);
  }

  onDeleteCube() {
    //
    const message = '등록된 Cube 정보를 삭제하시겠습니까? 삭제하신 정보는 복구하실 수 없습니다.';
    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: 'Cube 삭제',
      alertIcon: 'circle',
      alertType: 'remove',
    });
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

  routeToCreateIntro() {
    //
    const { personalCube } = this.props.personalCubeService ||  {} as PersonalCubeService;
    this.props.history.push(`/personalcube/create-intro/${personalCube.contents.type}`);
  }

  render() {
    const {
      tags, alertWinOpen, confirmWinOpen, alertMessage, alertIcon, alertTitle, alertType,
    } = this.state;
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    const { personalCubeId } = this.props.match.params;
    const message = (
      <>
        <p className="center">입력하신 학습 강좌에 대해 승인 요청하시겠습니까?</p>
        <p className="center">바로 승인 요청을 하지 않아도 원하시는 시점에 승인 요청을 하실 수 있습니다. </p>
      </>
    );
    return (
      <ContentLayout className="bg-white">
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
              <CreateBasicInfoContainer
                personalCubeId={personalCubeId}
                personalCube={personalCube}
                onChangePersonalCubeProps={this.onChangePersonalCubeProps}
              />
              <CreateExposureInfoContainer
                personalCube={personalCube}
                onChangePersonalCubeProps={this.onChangePersonalCubeProps}
                tags={tags}
              />
              {
                personalCubeId ?
                  <div className="buttons">
                    <Button className="fix line">Delete</Button>
                    <Button className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                    <Button className="fix line" onClick={this.handleSave}>Save</Button>
                    <Button className="fix bg" onClick={this.routeToCreateIntro}>Next</Button>
                  </div>
                  :
                  <div className="buttons">
                    <Button className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                    <Button className="fix line" onClick={this.handleSave}>Save</Button>
                    <Button className=" fix bg" onClick={this.routeToCreateIntro}>Next</Button>
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

export default CreateDetailContainer;
