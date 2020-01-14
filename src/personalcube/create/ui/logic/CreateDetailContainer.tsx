
import React from 'react';
import { reactAutobind, mobxHelper, reactAlert, reactConfirm } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { ContentLayout } from 'shared';
import { Button, Form, Segment } from 'semantic-ui-react';
import { SkProfileService } from 'profile';
import routePaths from '../../../routePaths';
import { PersonalCubeModel, PersonalCubeService } from '../../../personalcube';
import { MediaService } from '../../../media';
import { BoardService } from '../../../board';
import { OfficeWebService } from '../../../officeweb';
import CreateBasicInfoContainer from './CreateBasicInfoContainer';
import CreateExposureInfoContainer from './CreateExposureInfoContainer';


interface Props extends RouteComponentProps<{ personalCubeId: string, cubeType: string }> {
  skProfileService?: SkProfileService
  personalCubeService?: PersonalCubeService
  mediaService?: MediaService
  boardService?: BoardService
  officeWebService?: OfficeWebService
}

interface States {
  tags: string
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
class CreateDetailContainer extends React.Component<Props, States> {
  //
  state = {
    tags: '',
    isNext: false,
  };

  componentDidMount(): void {
    //
    const { personalCubeService, match } = this.props;
    const { personalCubeId } = match.params;

    if (!personalCubeId) {
      this.clearAll();
    } else {
      personalCubeService!.findPersonalCube(personalCubeId);
    }
  }

  clearAll() {
    //
    const {
      personalCubeService,
    } = this.props;

    personalCubeService!.clearPersonalCube();
  }

  routeToCreateList() {
    //
    this.props.history.push(routePaths.create());
  }

  onChangePersonalCubeProps(name: string, value: string | {}) {
    //
    const { personalCubeService } = this.props;
    let getTagList = [];

    if (name === 'tags' && typeof value === 'string') {
      getTagList = value.split(',');
      personalCubeService!.changeCubeProps('tags', getTagList);
    }
    if (name !== 'tags') personalCubeService!.changeCubeProps(name, value);
  }

  handleSave(isNext: boolean) {
    //
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
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

  alertRequiredField(message: string) {
    //
    reactAlert({ title: '필수 정보 입력 안내', message, warning: true });
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

  routeToCreateIntro(personalCubeId: string) {
    //
    const { history,  personalCubeService } = this.props;
    const { personalCube } = personalCubeService!;

    history.push(routePaths.createIntro(personalCubeId, personalCube.contents.type));
  }

  render() {
    //
    const { personalCubeService, match } = this.props;
    const { tags } = this.state;
    const { personalCube } = personalCubeService!;
    const { params } = match;

    return (
      <ContentLayout
        className="bg-white"
        breadcrumb={[
          { text: 'Create' },
          { text: 'Create', path: routePaths.createCreate() },
        ]}
      >
        <div className="add-personal-learning support">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">Create</div>
            <div className="apl-notice">
              내가 갖고 있는 지식을 강좌로 만들 수 있습니다.<br />관리자의 확인 절차를 거쳐 다른 mySUNI 사용자에게 전파해보세요.
            </div>
          </div>
        </div>
        <Segment className="full">
          <div className="apl-form-wrap create">
            <Form>
              <CreateBasicInfoContainer
                personalCubeId={params.personalCubeId}
                personalCube={personalCube}
                onChangePersonalCubeProps={this.onChangePersonalCubeProps}
              />
              <CreateExposureInfoContainer
                personalCube={personalCube}
                onChangePersonalCubeProps={this.onChangePersonalCubeProps}
                tags={tags}
              />
              {
                params.personalCubeId ?
                  <div className="buttons">
                    <Button type="button" className="fix line" onClick={this.onDeleteCube}>Delete</Button>
                    <Button type="button" className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                    <Button type="button" className="fix line" onClick={() => this.handleSave(false)}>Save</Button>
                    <Button type="button" className="fix bg" onClick={() => this.handleSave(true)}>Next</Button>
                  </div>
                  :
                  <div className="buttons">
                    <Button type="button" className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                    <Button type="button" className="fix bg" onClick={() => this.handleSave(true)}>Next</Button>
                  </div>
              }
            </Form>
          </div>
        </Segment>
      </ContentLayout>
    );
  }
}

export default CreateDetailContainer;
