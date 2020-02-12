
import { observable, action, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';

import _ from 'lodash';
import { CubeState } from 'shared/model';
import PersonalCubeApi from '../apiclient/PersonalCubeApi';
import { PersonalCubeModel } from '../../model/PersonalCubeModel';


@autobind
export default class PersonalCubeService {
  //
  static instance: PersonalCubeService;

  personalCubeApi: PersonalCubeApi;

  @observable
  personalCube: PersonalCubeModel = new PersonalCubeModel();

  @observable
  personalCubeOffsetList: OffsetElementList<PersonalCubeModel> = { results: [], totalCount: 0 };


  constructor(personalCubeApi: PersonalCubeApi) {
    //
    this.personalCubeApi = personalCubeApi;
  }

  // PersonalCube ------------------------------------------------------------------------------------------------------

  @action
  clearPersonalCube() {
    //
    this.personalCube = new PersonalCubeModel();
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

    if (personalCube) {
      return runInAction(() => this.personalCube = new PersonalCubeModel(personalCube));
    }
    return null;
  }

  @action
  changeCubeProps(name: string, value: string | {} | string[]) {
    //
    this.personalCube = _.set(this.personalCube, name, value);
  }

  // PersonalCubeOffsetList --------------------------------------------------------------------------------------------

  @action
  async findAllPersonalCubes(offset: number, limit: number) {
    //
    const personalCubes = await this.personalCubeApi.findAllPersonalCubes(offset, limit);

    runInAction(() => this.personalCubeOffsetList = personalCubes);
    return personalCubes;
  }

  @action
  async findPersonalCubesForCreator(offset: number, limit: number, cubeState?: CubeState) {
    //
    const personalCubeOffsetList = await this.personalCubeApi.findPersonalCubesForCreator(offset, limit, cubeState);

    runInAction(() => {
      this.personalCubeOffsetList.results = this.personalCubeOffsetList.results.concat(personalCubeOffsetList.results);
      this.personalCubeOffsetList.totalCount = personalCubeOffsetList.totalCount;
    });
    return personalCubeOffsetList;
  }

  @action
  clear() {
    this.personalCubeOffsetList = { results: [], totalCount: 0 } as OffsetElementList<PersonalCubeModel>;
  }
}

Object.defineProperty(PersonalCubeService, 'instance', {
  value: new PersonalCubeService(PersonalCubeApi.instance),
  writable: false,
  configurable: false,
});
