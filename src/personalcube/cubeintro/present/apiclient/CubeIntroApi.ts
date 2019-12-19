import { axiosApi as axios } from '@nara.platform/accent';
import { CubeIntroModel } from '../../model/CubeIntroModel';

export default class CubeIntroApi {

  URL = '/api/personalCube/cubeintros';

  static instance: CubeIntroApi;

  findCubeIntro(cubeIntroId: string) {
    //
    return axios.get<CubeIntroModel>(this.URL + `/${cubeIntroId}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(CubeIntroApi, 'instance', {
  value: new CubeIntroApi(),
  writable: false,
  configurable: false,
});
