import { axiosApi as axios } from '@nara.platform/accent';
import { NameValueList } from 'shared/model';
import { CubeIntroModel } from '../../model/CubeIntroModel';

export default class CubeIntroApi {

  // URL = '/api/personalCube/cubeintros';

  serverUrl = '/api/personalCube/cubeintros';
  devUrl = process.env.REACT_APP_DEV_PERSONAL_CUBE_API  === undefined || process.env.REACT_APP_DEV_PERSONAL_CUBE_API  === '' ?
    this.serverUrl : process.env.REACT_APP_DEV_PERSONAL_CUBE_API ;

  URL = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ?
    this.serverUrl : this.devUrl + '/cubeintros';

  static instance: CubeIntroApi;

  findCubeIntro(cubeIntroId: string) {
    //
    return axios.get<CubeIntroModel>(this.URL + `/${cubeIntroId}`)
      .then(response => response && response.data || null);
  }

  modifyCubeIntro(cubeIntroId: string, nameValues: NameValueList) {
    return axios.put<string>(this.URL + `/${cubeIntroId}`, nameValues)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(CubeIntroApi, 'instance', {
  value: new CubeIntroApi(),
  writable: false,
  configurable: false,
});
