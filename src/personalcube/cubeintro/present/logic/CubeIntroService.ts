import { observable, action, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import CubeIntroApi from '../apiclient/CubeIntroApi';
import { CubeIntroModel } from '../../model/CubeIntroModel';


@autobind
export default class CubeIntroService {
  //
  static instance: CubeIntroService;

  cubeIntroApi: CubeIntroApi;

  @observable
  cubeIntro: CubeIntroModel = new CubeIntroModel();

  constructor(cubeIntroApi: CubeIntroApi) {
    this.cubeIntroApi = cubeIntroApi;
  }

  @action
  async findClassroom(cubeIntroId: string) {
    const cubeIntro = await this.cubeIntroApi.findCubeIntro(cubeIntroId);
    runInAction(() => this.cubeIntro = new CubeIntroModel(cubeIntro));
  }

  @action
  clearClassroom() {
    this.cubeIntro = new CubeIntroModel();
  }
}

Object.defineProperty(CubeIntroService, 'instance', {
  value: new CubeIntroService(CubeIntroApi.instance),
  writable: false,
  configurable: false,
});
