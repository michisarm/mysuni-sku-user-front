
import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert, reactConfirm } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { Button } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { SkProfileService } from 'profile/stores';
import { CollegeModel, CollegeType } from 'college/model';
import { CollegeService } from 'college/stores';
import routePaths from '../../../routePaths';
import { PersonalCubeModel } from '../../../personalcube/model';
import { PersonalCubeService } from '../../../personalcube/stores';
import { MediaService } from '../../../media/stores';
import { BoardService } from '../../../community/stores';
import { OfficeWebService } from '../../../officeweb/stores';
import BasicInfoFormContainer from './BasicInfoFormContainer';
import ExposureInfoFormContainer from './ExposureInfoFormContainer';
import { FormTitle } from '../view/DetailElementsView';


interface Props extends RouteComponentProps<{ personalCubeId: string, cubeType: string }> {
  actionLogService?: ActionLogService
  skProfileService?: SkProfileService
  collegeService?: CollegeService
  personalCubeService?: PersonalCubeService
  mediaService?: MediaService
  boardService?: BoardService
  officeWebService?: OfficeWebService
}

interface State {
  isNext: boolean
  targetSubsidiaryId: string
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'profile.skProfileService',
  'college.collegeService',
  'personalCube.personalCubeService',
  'personalCube.mediaService',
  'personalCube.boardService',
  'personalCube.officeWebService'
))
@observer
@reactAutobind
class PersonalCubeContentContainer extends Component<Props, State> {
  //
  state = {
    isNext: false,
    targetSubsidiaryId: '',
  };


  constructor(props: Props) {
    //
    super(props);
    this.clearAll();
  }

  async componentDidMount() {
    //
    const personalCubeService = this.props.personalCubeService!;
    const { params } = this.props.match;

    if (params.personalCubeId) {
      const collegeService = this.props.collegeService!;
      const personalCube = await personalCubeService.findPersonalCube(params.personalCubeId);

      patronInfo.setWorkspaceByDomain(personalCube!);
      const college = await collegeService.findCollege(personalCube!.category.college.id);

      if (college && college.collegeType === CollegeType.Company) {
        this.setState({
          targetSubsidiaryId: college.id,
        });
      }
    }
  }

  componentWillUnmount(): void {
    //
    patronInfo.clearWorkspace();
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

    history.push(routePaths.createCubeIntroDetail(personalCubeId, personalCube.contents.type));
  }

  alertRequiredField(message: string) {
    //
    reactAlert({ title: '필수 정보 입력 안내', message, warning: true });
  }

  save() {
    //
    const { skProfileService, personalCubeService, match } = this.props;
    const { isNext } = this.state;

    const { name, company, email } = skProfileService!.skProfile.member;
    const { personalCube } = personalCubeService!;
    const { personalCubeId } = match.params;

    const createType : string = 'U';
    if (!personalCubeId) {
      personalCubeService!.registerCube({ ...personalCube, creator: { company, email, name, createType }})
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

  removePersonalCube(personalCubeId: string) {
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

  onChangePersonalCubeProps(name: string, value: string | {}) {
    //
    const personalCubeService = this.props.personalCubeService!;

    personalCubeService.changeCubeProps(name, value);
  }

  onChangeCollege(college: CollegeModel) {
    //
    const subsidiaryTargeted = college.collegeType === CollegeType.Company;

    if (subsidiaryTargeted) {
      this.setState({ targetSubsidiaryId: college.collegeId });
    }
    else {
      this.setState({ targetSubsidiaryId: '' });
    }
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
        onOk: this.save,
      });

      this.setState({ isNext });
    }
  }

  onRemovePersonalCube() {
    //
    const { params } = this.props.match;

    reactConfirm({
      title: '강좌 삭제',
      message: '등록된 강좌정보를 삭제하시겠습니까? 삭제하신 정보는 복구하실 수 없습니다.',
      warning: true,
      onOk: () => this.removePersonalCube(params.personalCubeId),
    });
  }

  onClickActionLog(text: string) {
    this.props.actionLogService?.registerClickActionLog({ subAction: text });
  }

  render() {
    //
    const { personalCubeService, match: { params }} = this.props;
    const { targetSubsidiaryId } = this.state;
    const { personalCube } = personalCubeService!;

    return (
      <>
        <FormTitle
          activeStep={1}
        />

        <BasicInfoFormContainer
          contentNew={!params.personalCubeId}
          personalCube={personalCube}
          onChangePersonalCubeProps={this.onChangePersonalCubeProps}
          onChangeCollege={this.onChangeCollege}
        />

        <ExposureInfoFormContainer
          personalCube={personalCube}
          targetSubsidiaryId={targetSubsidiaryId}
          onChangePersonalCubeProps={this.onChangePersonalCubeProps}
        />

        { params.personalCubeId ?
          <div className="buttons">
            <Button type="button" className="fix line" onClick={() => { this.onClickActionLog('Delete'); this.onRemovePersonalCube(); }}>Delete</Button>
            <Button type="button" className="fix line" onClick={() => { this.onClickActionLog('Cancel'); this.routeToCreateList(); }}>Cancel</Button>
            <Button type="button" className="fix line" onClick={() => { this.onClickActionLog('Save'); this.onSave(false); }}>Save</Button>
            <Button type="button" className="fix bg" onClick={() => { this.onClickActionLog('Next'); this.onSave(true); }}>Next</Button>
          </div>
          :
          <div className="buttons">
            <Button type="button" className="fix line" onClick={() => { this.onClickActionLog('Cancel'); this.routeToCreateList(); }}>Cancel</Button>
            <Button type="button" className="fix bg" onClick={() => { this.onClickActionLog('Next'); this.onSave(true); }}>Next</Button>
          </div>
        }
      </>
    );
  }
}

export default withRouter(PersonalCubeContentContainer);
