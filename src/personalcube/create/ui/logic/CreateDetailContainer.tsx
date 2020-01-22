
import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert, reactConfirm } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ContentLayout } from 'shared';
import { Button } from 'semantic-ui-react';
import { SkProfileService } from 'profile';
import routePaths from '../../../routePaths';
import { PersonalCubeModel, PersonalCubeService } from '../../../personalcube';
import { MediaService } from '../../../media';
import { BoardService } from '../../../board';
import { OfficeWebService } from '../../../officeweb';
import DetailBasicInfoContainer from './DetailBasicInfoContainer';
import CreateExposureInfoContainer from './CreateExposureInfoContainer';
import { ContentWrapper } from '../view/DetailElementsView';


interface Props extends RouteComponentProps<{ personalCubeId: string, cubeType: string }> {
  skProfileService?: SkProfileService
  personalCubeService?: PersonalCubeService
  mediaService?: MediaService
  boardService?: BoardService
  officeWebService?: OfficeWebService
}

interface States {
  isNext: boolean
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'personalCube.personalCubeService',
  'personalCube.mediaService',
  'personalCube.boardService',
  'personalCube.officeWebService'
))
@observer
@reactAutobind
class CreateDetailContainer extends Component<Props, States> {
  //
  state = {
    isNext: false,
  };

  componentDidMount(): void {
    //
    const personalCubeService = this.props.personalCubeService!;
    const { params } = this.props.match;

    // 신규
    if (!params.personalCubeId) {
      this.clearAll();
    }
    // 수정
    else {
      personalCubeService.findPersonalCube(params.personalCubeId);
    }
  }

  clearAll() {
    //
    const personalCubeService = this.props.personalCubeService!;

    personalCubeService.clearPersonalCube();
  }

  routeToCreateList() {
    //
    this.props.history.push(routePaths.create());
  }

  routeToCreateIntro(personalCubeId: string) {
    //
    const { history,  personalCubeService } = this.props;
    const { personalCube } = personalCubeService!;

    history.push(routePaths.createIntro(personalCubeId, personalCube.contents.type));
  }

  alertRequiredField(message: string) {
    //
    reactAlert({ title: '필수 정보 입력 안내', message, warning: true });
  }

  onChangePersonalCubeProps(name: string, value: string | {}) {
    //
    const personalCubeService = this.props.personalCubeService!;

    personalCubeService.changeCubeProps(name, value);
    // if (name === 'tags') {
    //   personalCubeService.changeCubeTagsCsv(value as string);
    // }
    // else {
    //   personalCubeService.changeCubeProps(name, value);
    // }
  }

  onSave(isNext: boolean) {
    //
    const { personalCube } = this.props.personalCubeService!;
    const personalCubeObject = PersonalCubeModel.getBlankRequiredField(personalCube);

    if (personalCubeObject !== 'success') {
      this.alertRequiredField(personalCubeObject);
    }
    else {
      reactConfirm({
        title: '저장 안내',
        message: '입력하신 강좌를 저장 하시겠습니까?',
        onOk: this.handleOKConfirmWin,
      });

      this.setState({ isNext });
    }
  }

  handleOKConfirmWin() {
    //
    const { skProfileService, personalCubeService, match } = this.props;
    const { isNext } = this.state;

    const { name, company, email } = skProfileService!.skProfile.member;
    const { personalCube } = personalCubeService!;
    const { personalCubeId } = match.params;

    if (!personalCubeId) {
      personalCubeService!.registerCube({ ...personalCube, creator: { company, email, name }})
        .then((personalCubeId) => {
          if (personalCubeId) {
            this.routeToCreateIntro(personalCubeId);
          }
          else {
            reactAlert({ title: '저장 실패', message: '저장을 실패했습니다. 잠시 후 다시 시도해주세요.' });
          }
        });
    }
    else {
      personalCubeService!.modifyPersonalCube(personalCubeId, personalCube)
        .then(() => {
          if (isNext) {
            this.routeToCreateIntro(personalCubeId || '');
          }
        });
    }
  }

  onDeleteCube() {
    //
    const { params } = this.props.match;

    reactConfirm({
      title: '강좌 삭제',
      message: '등록된 강좌정보를 삭제하시겠습니까? 삭제하신 정보는 복구하실 수 없습니다.',
      warning: true,
      onOk: () => this.handleDeleteCube(params.personalCubeId),
    });
  }

  handleDeleteCube(personalCubeId: string) {
    //
    const { personalCubeService, mediaService, boardService, officeWebService, match, history } = this.props;
    const { cubeType } = match.params;

    const cubeIntroId = personalCubeService!.personalCube.cubeIntro.id;

    if (!cubeIntroId) {
      Promise.resolve()
        .then(() => personalCubeService!.removePersonalCube(personalCubeId))
        .then(() => history.push(routePaths.create()));
    }
    else {
      Promise.resolve()
        .then(() => {
          if (cubeType === 'Video' || cubeType === 'Audio') mediaService!.removeMedia(personalCubeId);
          if (cubeType === 'Community') boardService!.removeBoard(personalCubeId);
          if (cubeType === 'Documents' || cubeType === 'WebPage') officeWebService!.removeOfficeWeb(personalCubeId);
        })
        .then(() => history.push(routePaths.create()));
    }
  }

  render() {
    //
    const { personalCubeService, match: { params }} = this.props;
    const { personalCube } = personalCubeService!;

    return (
      <ContentLayout
        className="bg-white"
        breadcrumb={[
          { text: 'Create' },
          { text: 'Create', path: routePaths.createCreate() },
        ]}
      >
        <ContentWrapper>
          <DetailBasicInfoContainer
            personalCubeId={params.personalCubeId}
            personalCube={personalCube}
            onChangePersonalCubeProps={this.onChangePersonalCubeProps}
          />

          <CreateExposureInfoContainer
            personalCube={personalCube}
            onChangePersonalCubeProps={this.onChangePersonalCubeProps}
          />

          {
            params.personalCubeId ?
              <div className="buttons">
                <Button type="button" className="fix line" onClick={this.onDeleteCube}>Delete</Button>
                <Button type="button" className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                <Button type="button" className="fix line" onClick={() => this.onSave(false)}>Save</Button>
                <Button type="button" className="fix bg" onClick={() => this.onSave(true)}>Next</Button>
              </div>
              :
              <div className="buttons">
                <Button type="button" className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                <Button type="button" className="fix bg" onClick={() => this.onSave(true)}>Next</Button>
              </div>
          }
        </ContentWrapper>
      </ContentLayout>
    );
  }
}

export default withRouter(CreateDetailContainer);
