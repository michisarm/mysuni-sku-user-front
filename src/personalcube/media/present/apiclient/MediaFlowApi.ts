import { axiosApi as axios } from '@nara.platform/accent';
//import { MediaFlowCdoModel, MediaFlowUdoModel } from '../../../../createtype';
import { MediaFlowCdoModel } from '../../model/MediaFlowCdoModel';
import { MediaFlowUdoModel } from '../../model/MediaFlowUdoModel';
import { MediaFlowUserCdoModel } from '../../model/MediaFlowUserCdoModel';
import { MediaFlowUserUdoModel } from '../../model/MediaFlowUserUdoModel';

export default class MediaFlowApi {

  URL = '/api/personalCube/medias/flow';

  static instance: MediaFlowApi;

  makeMedia(media: MediaFlowCdoModel) {
    return axios.post<string>(this.URL, media)
      .then(response => response && response.data || null);
  }

  makeMediaByUser(media: MediaFlowUserCdoModel) {
    return axios.post<string>(this.URL + '/byUser', media)
      .then(response => response && response.data || null);
  }

  modifyMediaByUser(personalCubeId: string, mediaFlowUserUdoModel: MediaFlowUserUdoModel) {
    //
    return axios.put<void>(this.URL +  `/byUser/${personalCubeId}`, mediaFlowUserUdoModel);
  }

  modifyMedia(personalCubeId: string, mediaFlowUdoModel: MediaFlowUdoModel) {
    //
    return axios.put<void>(this.URL + `/${personalCubeId}`, mediaFlowUdoModel);
  }

  removeMedia(personalCubeId: string) {
    //
    return axios.delete(this.URL + `/${personalCubeId}`);
  }

}

Object.defineProperty(MediaFlowApi, 'instance', {
  value: new MediaFlowApi(),
  writable: false,
  configurable: false,
});
