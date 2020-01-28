
import { observable, action, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';

import _ from 'lodash';
import PersonalCubeApi from '../apiclient/PersonalCubeApi';
import { PersonalCubeModel } from '../../model/PersonalCubeModel';
import { CubeQueryModel } from '../../model/CubeQueryModel';


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
  personalCubeQuery: CubeQueryModel = new CubeQueryModel();


  constructor(personalCubeApi: PersonalCubeApi) {
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

  // PersonalCubes -----------------------------------------------------------------------------------------------------

  @action
  async findAllPersonalCubes(offset: number, limit: number) {
    //
    const personalCubes = await this.personalCubeApi.findAllPersonalCubes(offset, limit);

    runInAction(() => this.personalCubes = personalCubes);
    return personalCubes;
  }

  // PersonalCubeQuery -------------------------------------------------------------------------------------------------

  @action
  async findAllPersonalCubesByQuery() {
    //
    const personalCubes = await this.personalCubeApi.findAllPersonalCubesByQuery(CubeQueryModel.asCreateRdo(this.personalCubeQuery));

    runInAction(() => this.personalCubes = personalCubes);
    return personalCubes;
  }

  @action
  changePersonalCubeQueryProps(name: string, value: string | Date | number, nameSub?: string, valueSub?: number | string) {
    this.personalCubeQuery = _.set(this.personalCubeQuery, name, value);
    if (typeof value === 'object' && nameSub) {
      this.personalCubeQuery = _.set(this.personalCubeQuery, nameSub, valueSub);
    }
  }
}

Object.defineProperty(PersonalCubeService, 'instance', {
  value: new PersonalCubeService(PersonalCubeApi.instance),
  writable: false,
  configurable: false,
});
