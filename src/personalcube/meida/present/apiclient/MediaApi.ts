import { axiosApi as axios } from '@nara.platform/accent';
import { MediaModel } from '../../model/MediaModel';

export default class MediaApi {
  URL = '/api/personalCube/medias';

  static instance: MediaApi;

  findMedia(mediaId: string) {
    //
    return axios.get<MediaModel>(this.URL + `/${mediaId}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(MediaApi, 'instance', {
  value: new MediaApi(),
  writable: false,
  configurable: false,
});
