
import { action, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import _ from 'lodash';

import { PersonalCubeModel } from '../../../personalcube/model';
import { CubeIntroModel } from '../../../cubeintro/model';
import OfficeApi from '../apiclient/OfficeApi';
import OfficeWebFlowApi from '../apiclient/OfficeWebFlowApi';
import { OfficeWebModel } from '../../model/OfficeWebModel';
import { OfficeWebFlowUdoModel } from '../../model/OfficeWebFlowUdoModel';
import { OfficeWebFlowCdoModel } from '../../model/OfficeWebFlowCdoModel';
import { OfficeWebFlowUserCdoModel } from '../../model/OfficeWebFlowUserCdoModel';
import { OfficeWebFlowUserUdoModel } from '../../model/OfficeWebFlowUserUdoModel';


@autobind
export default class OfficeWebService {
  //
  static instance: OfficeWebService;

  officeApi: OfficeApi;
  officeWebFlowApi: OfficeWebFlowApi;

  @observable
  officeWeb: OfficeWebModel = new OfficeWebModel();

  constructor(officeApi: OfficeApi, officeWebFlowApi: OfficeWebFlowApi) {
    this.officeApi = officeApi;
    this.officeWebFlowApi = officeWebFlowApi;
  }

  makeOfficeWeb(personalCube: PersonalCubeModel, cubeIntro: CubeIntroModel, officeWeb: OfficeWebModel) {
    //
    return this.officeWebFlowApi.makeOfficeWeb(
      new OfficeWebFlowCdoModel(
        PersonalCubeModel.asCdo(personalCube),
        CubeIntroModel.asCdo(cubeIntro),
        OfficeWebModel.asCdo(officeWeb)
      )
    );
  }

  makeOfficeWebByUser(personalCubeId: string, cubeIntro: CubeIntroModel, officeWeb: OfficeWebModel) {
    return this.officeWebFlowApi.makeOfficeWebByUser(
      new OfficeWebFlowUserCdoModel(
        personalCubeId,
        CubeIntroModel.asCdo(cubeIntro),
        OfficeWebModel.asCdo(officeWeb)
      )
    );
  }

  modifyOfficeWebByUser(personalCubeId: string, cubeIntro : CubeIntroModel, officeWeb: OfficeWebModel) {
    return this.officeWebFlowApi.modifyOfficeWebByUser(personalCubeId, new OfficeWebFlowUserUdoModel(cubeIntro, officeWeb));
  }

  @action
  async findOfficeWeb(officeWebId: string) {
    const officeWeb = await this.officeApi.findOfficeWeb(officeWebId);
    runInAction(() => this.officeWeb = new OfficeWebModel(officeWeb));
  }

  @action
  changeOfficeWebProps(name: string, value: string | Date | boolean, nameSub?: string, valueSub?: string) {
    //
    this.officeWeb = _.set(this.officeWeb, name, value);
    if (typeof value === 'object' && nameSub) this.officeWeb = _.set(this.officeWeb, nameSub, valueSub);
  }

  modifyOfficeWeb(personalCubeId: string, cube: PersonalCubeModel, cubeIntro: CubeIntroModel, officeWeb: OfficeWebModel) {
    //
    return this.officeWebFlowApi.modifyOfficeWeb(personalCubeId, new OfficeWebFlowUdoModel(cube, cubeIntro, officeWeb));
  }

  removeOfficeWeb(personalCubeId: string) {
    //
    return this.officeWebFlowApi.removeOfficeWeb(personalCubeId);
  }

  @action
  clearOfficeWeb() {
    this.officeWeb = new OfficeWebModel();
  }
}

Object.defineProperty(OfficeWebService, 'instance', {
  value: new OfficeWebService(OfficeApi.instance, OfficeWebFlowApi.instance),
  writable: false,
  configurable: false,
});
