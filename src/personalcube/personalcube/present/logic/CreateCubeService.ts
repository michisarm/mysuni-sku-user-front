import { autobind } from '@nara.platform/accent';
import { observable, computed, action, runInAction } from 'mobx';
import _ from 'lodash';
import { CreateCube } from '../../../create/model/CreateCube';

import { UserCubeRdo } from '../../model/UserCubeRdo';
import {
  findUserCubes,
  findCubeDetail,
  registerUserCube,
  modifyUserCube,
  removeUserCube,
} from '../apiclient/cubeApi';
import { CubeState } from '../../../../shared/model';
import {
  CreateCubeDetail,
  getCubeSdo,
} from '../../../create/model/CreateCubeDetail';
import { CubeSdo, initialCubeSdo } from '../../../create/model/CubeSdo';

@autobind
export default class CreateCubeService {
  static instance: CreateCubeService;

  @observable
  _createCubeDetail?: CreateCubeDetail;

  @computed get createCubeDetail() {
    return this._createCubeDetail;
  }

  async registerUserCube(cubeSdo: CubeSdo) {
    return registerUserCube(cubeSdo);
  }

  async modifyUserCube(cubeId: string, cubeSdo: CubeSdo) {
    return modifyUserCube(cubeId, cubeSdo);
  }

  async removeUserCube(cubeId: string) {
    return removeUserCube(cubeId);
  }

  @action
  async findCreateCubeDetail(cubeId: string) {
    const foundCubeDetail = await findCubeDetail(cubeId);

    if (foundCubeDetail === undefined) {
      return;
    }

    const cubeSdo = getCubeSdo(foundCubeDetail);

    runInAction(() => {
      this._createCubeDetail = foundCubeDetail;
      this._cubeSdo = cubeSdo;
    });

    return foundCubeDetail;
  }

  @action
  clearCreateCubeDetail() {
    this._createCubeDetail = undefined;
    this._cubeSdo = initialCubeSdo;
  }

  @observable
  _cubeSdo: CubeSdo = initialCubeSdo;

  @computed get cubeSdo() {
    return this._cubeSdo;
  }

  @action
  changeCubeSdoProps(name: string, value: string | {} | string[]) {
    this._cubeSdo = _.set(this._cubeSdo, name, value);
  }

  @observable
  _createCubes: CreateCube[] = [];

  @computed get createCubes() {
    return this._createCubes;
  }

  @observable
  _createCubeCount: number = 0;

  @computed get createCubeCount() {
    return this._createCubeCount;
  }

  @action
  async findCreateCubes(userCubeRdo: UserCubeRdo) {
    const offsetCreateCube = await findUserCubes(userCubeRdo);

    if (offsetCreateCube === undefined) {
      return;
    }

    runInAction(() => {
      this._createCubes = [...this._createCubes, ...offsetCreateCube.results];
      this._createCubeCount = offsetCreateCube.totalCount;
    });
  }

  @action
  clearCreateCubes() {
    this._createCubes = [];
    this._createCubeCount = 0;
  }

  @observable
  _selectedCubeState: CubeState = CubeState.ALL;

  @computed get selectedCubeState() {
    return this._selectedCubeState;
  }

  @action
  setSelectedCubeState(next: CubeState) {
    this._selectedCubeState = next;
  }

  @action
  clearSelectedCubeState() {
    this._selectedCubeState = CubeState.ALL;
  }
}

Object.defineProperty(CreateCubeService, 'instance', {
  value: new CreateCubeService(),
  writable: false,
  configurable: false,
});
