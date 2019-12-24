import { axiosApi as axios } from '@nara.platform/accent';
//import { MediaFlowCdoModel, MediaFlowUdoModel } from '../../../../createtype';
import { MediaFlowCdoModel } from '../../model/MediaFlowCdoModel';
import { MediaFlowUdoModel } from '../../model/MediaFlowUdoModel';
import { MediaFlowUserCdoModel } from '../../model/MediaFlowUserCdoModel';

export default class MediaFlowApi {

  URL = '/api/personalCube/medias/flow';

  static instance: MediaFlowApi;

  makeMedia(media: MediaFlowCdoModel) {
    return axios.post<string>(this.URL, media)
      .then(response => response && response.data || null);
  }

  makeMediaByUser(media: MediaFlowUserCdoModel) {
    console.log(media);
    return axios.post<string>(this.URL + '/byUser', media)
      .then(response => response && response.data || null);
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
