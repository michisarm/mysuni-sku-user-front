import { action, observable, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import CubeIntroApi from '../apiclient/CubeIntroApi';
import { CubeIntroModel } from '../../model/CubeIntroModel';


@autobind
export default class CubeIntroService {
  //
  static instance: CubeIntroService;

  cubeIntroApi: CubeIntroApi;

  @observable
  cubeIntro: CubeIntroModel = new CubeIntroModel();

  @observable
  instructorListModalOpen: boolean = false;

  @observable
  managerListModalOpen: boolean = false;

  constructor(cubeIntroApi: CubeIntroApi) {
    this.cubeIntroApi = cubeIntroApi;
  }

  @action
  async findCubeIntro(cubeIntroId: string) {
    const cubeIntro = await this.cubeIntroApi.findCubeIntro(cubeIntroId);

    if (!cubeIntro) {
      return null;
    }
    return runInAction(() => this.cubeIntro = new CubeIntroModel(cubeIntro));
  }

  @action
  changeCubeIntroProps(name: string, value: string | number | {}) {
    //
    this.cubeIntro = _.set(this.cubeIntro, name, value);
  }

  @action
  clearCubeIntro() {
    this.cubeIntro = new CubeIntroModel();
  }

  @action
  changeInstructorListModalOpen(open: boolean) {
    //
    this.instructorListModalOpen = open;
  }

  @action
  changeManagerListModalOpen(open: boolean) {
    //
    this.managerListModalOpen = open;
  }
}

Object.defineProperty(CubeIntroService, 'instance', {
  value: new CubeIntroService(CubeIntroApi.instance),
  writable: false,
  configurable: false,
});
