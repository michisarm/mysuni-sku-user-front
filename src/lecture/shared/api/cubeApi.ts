import { getAxios } from 'shared/api/Axios';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import { createCacheApi } from '../../detail/api/cacheableApi';
import { CubeCdo } from '../model/CubeCdo';

export default class cubeApi {
  //
  cubeURL = '/api/cube';

  static instance: cubeApi;

  registerUserCube(cubeCdo: CubeCdo): Promise<string> {
    const axios = getAxios();
    return axios
      .post(this.cubeURL + '/userCubes', cubeCdo)
      .then(response => (response && response.data) || '');
  }
}

Object.defineProperty(cubeApi, 'instance', {
  value: new cubeApi(),
  writable: false,
  configurable: false,
});
