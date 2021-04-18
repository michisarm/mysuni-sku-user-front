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
  findPanopToList,
} from '../apiclient/cubeApi';
import { CubeState } from '../../../../shared/model';
import {
  CreateCubeDetail,
  getCubeSdo,
} from '../../../create/model/CreateCubeDetail';
import { CubeSdo, initialCubeSdo } from '../../../create/model/CubeSdo';
import { PanoptoCdoModel } from '../../../media/model/PanoptoCdoModel';
import { InternalMediaConnection } from '../../../../lecture/model/InternalMediaConnection';

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

  @observable
  _panoptoCdo: PanoptoCdoModel = new PanoptoCdoModel();

  @computed get panoptoCdo() {
    return this._panoptoCdo;
  }

  @action
  async findPanopToList(panoptoCdo: PanoptoCdoModel) {
    const panoptos = await findPanopToList(panoptoCdo);
    return runInAction(() => {
      if (
        this.cubeSdo.materialSdo &&
        this.cubeSdo.materialSdo?.mediaSdo.meidaContents
      ) {
        this.cubeSdo.materialSdo.mediaSdo.meidaContents.internalMedias =
          panoptos.results;
      }
    });
  }

  @action
  changePanoptoCdoProps(name: string, value: string | number) {
    this._panoptoCdo = _.set(this.panoptoCdo, name, value);
  }

  @observable
  _panopto: InternalMediaConnection = {
    duration: 0,
    folderId: '',
    folderName: '',
    name: '',
    panoptoSessionId: '',
    startTime: '',
    thumbUrl: '',
    viewUrl: '',
    quizIds: [],
  };

  @computed get panopto() {
    return this._panopto;
  }

  @action
  setPanoptoProps(selectedPanopto: InternalMediaConnection) {
    this._panopto = selectedPanopto;
  }
}

Object.defineProperty(CreateCubeService, 'instance', {
  value: new CreateCubeService(),
  writable: false,
  configurable: false,
});
