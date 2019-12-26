import { action, observable, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { OffsetElementList } from '@nara.platform/accent';
import { CubeState, IdName } from 'shared';
import PersonalCubeApi from '../apiclient/PersonalCubeApi';
import { PersonalCubeModel } from '../../model/PersonalCubeModel';
import { CubeQueryModel } from '../../model/CubeQueryModel';
import { ApprovalContents } from '../../model/ApprovalContents';
import { ExcelView } from '../../../../shared/model/ExcelView';
import { PersonalCubeRequestCdoModel } from '../../model/PersonalCubeRequestCdoModel';

@autobind
export default class PersonalCubeService {
  //
  static instance: PersonalCubeService;

  personalCubeApi: PersonalCubeApi;

  @observable
  personalCube: PersonalCubeModel = new PersonalCubeModel();

  @observable
  personalCubes: OffsetElementList<PersonalCubeModel> = { results: [], totalCount: 0 };

  @observable
  approvalContents: OffsetElementList<ApprovalContents> = { results: [], totalCount: 0 };

  @observable
  personalCubeQuery: CubeQueryModel = new CubeQueryModel();

  @observable
  surveyListModalOpen: boolean = false;

  @observable
  excelView: ExcelView = new ExcelView();

  @observable
  cubeRequestCdo: PersonalCubeRequestCdoModel = new PersonalCubeRequestCdoModel();

  @observable
  channelsMap: Map<IdName, IdName[]> = new Map<IdName, IdName[]>();

  constructor(personalCubeApi: PersonalCubeApi) {
    this.personalCubeApi = personalCubeApi;
  }

  @action
  registerCube(personalCube: PersonalCubeModel) {
    //
    return this.personalCubeApi.registerCube(PersonalCubeModel.asCdo(personalCube));
  }

  modifyPersonalCube(personalCubeId: string, personalCube: PersonalCubeModel) {
    //
    return this.personalCubeApi.modifyPersonalCube(personalCubeId, PersonalCubeModel.asNameValues(personalCube));
  }

  removePersonalCube(personalCubeId: string) {
    //
    this.personalCubeApi.removePersonalCube(personalCubeId);
  }

  @action
  async findPersonalCube(personalCubeId: string) {
    //
    const personalCube = await this.personalCubeApi.findPersonalCube(personalCubeId);
    console.log('service', personalCube);
    if (personalCube) return runInAction(() => this.personalCube = new PersonalCubeModel(personalCube));
    return null;
  }

  @action
  async findAllPersonalCubes(offset: number, limit: number) {
    //
    const personalCubes = await this.personalCubeApi.findAllPersonalCubes(offset, limit);
    return runInAction(() => this.personalCubes = personalCubes);
  }

  @action
  async findAllPersonalCubesByQuery() {
    //
    const personalCubes = await this.personalCubeApi.findAllPersonalCubesByQuery(CubeQueryModel.asCubeRdo(this.personalCubeQuery));
    return runInAction(() => this.personalCubes = personalCubes);
  }

  @action
  changeCubeProps(name: string, value: string | {} | string[]) {
    //
    console.log(name, value);
    this.personalCube = _.set(this.personalCube, name, value);
    console.log(this.personalCube);
  }

  @action
  clearPersonalCube() {
    //
    this.personalCube = new PersonalCubeModel();
    // this.cube = {} as PersonalCubeModel;
  }

  @action
  changePersonalCubeQueryProps(name: string, value: string | Date | number, nameSub?: string, valueSub?: number | string) {
    this.personalCubeQuery = _.set(this.personalCubeQuery, name, value);
    if (typeof value === 'object' && nameSub) {
      this.personalCubeQuery = _.set(this.personalCubeQuery, nameSub, valueSub);
    }
    console.log(this.personalCubeQuery);
  }

  @action
  async findAllApprovalContents() {
    //
    const approvalContents = await this.personalCubeApi.findAllApprovalContents(CubeQueryModel.asApprovalContentsRdo(this.personalCubeQuery));
    console.log(approvalContents);
    return runInAction(() => this.approvalContents = approvalContents);
  }

  @action
  changeCubeRequestProps(name: string, value: string) {
    //
    this.cubeRequestCdo = _.set(this.cubeRequestCdo, name, value);
  }

  @action
  cubeRequestOpen() {
    //
    this.cubeRequestCdo = _.set(this.cubeRequestCdo, 'cubeState', CubeState.Opened);
    return this.personalCubeApi.personalCubeRequestOpen(this.cubeRequestCdo);
  }

  @action
  cubeRequestReject() {
    //
    this.cubeRequestCdo = _.set(this.cubeRequestCdo, 'cubeState', CubeState.Rejected);
    return this.personalCubeApi.personalCubeRequestReject(this.cubeRequestCdo);
  }

  @action
  changeSurveyListModalOpen(open: boolean) {
    //
    this.surveyListModalOpen = open;
  }

  @action
  findAllCubesExcel() {
    //
    this.personalCubeApi.findAllPersonalCubesExcel(CubeQueryModel.asCubeRdo(this.personalCubeQuery));
  }

  @action
  setCubeState(cubeState: CubeState) {
    //
    this.personalCubeQuery = _.set(this.personalCubeQuery, 'cubeState', cubeState);
  }

  @action
  changeChannelsMapProps(channelsMap: Map<IdName, IdName[]>) {
    //
    this.channelsMap = channelsMap;
  }
}

Object.defineProperty(PersonalCubeService, 'instance', {
  value: new PersonalCubeService(PersonalCubeApi.instance),
  writable: false,
  configurable: false,
});
