import { axiosApi as axios, OffsetElementList } from '@nara.platform/accent';
import { MediaModel } from '../../model/MediaModel';
import { PanoptoCdoModel } from '../../model/PanoptoCdoModel';
import { InternalMediaConnectionModel } from '../../model/InternalMediaConnectionModel';

export default class MediaApi {

  // URL = '/api/personalCube/medias';

  serverUrl = '/api/personalCube/medias';
  devUrl = process.env.REACT_APP_DEV_PERSONAL_CUBE_API  === undefined || process.env.REACT_APP_DEV_PERSONAL_CUBE_API  === '' ?
    this.serverUrl : process.env.REACT_APP_DEV_PERSONAL_CUBE_API ;

  URL = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ?
    this.serverUrl : this.devUrl + '/medias';

  static instance: MediaApi;

  findMedia(mediaId: string) {
    //
    return axios.get<MediaModel>(this.URL + `/${mediaId}`)
      .then(response => response && response.data && new MediaModel(response.data) || null);
  }

  findPanoptoList(panoptoCdo: PanoptoCdoModel) {
    //
    return axios.get<OffsetElementList<InternalMediaConnectionModel>>(this.URL + '/panoptos', { params: panoptoCdo })
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(MediaApi, 'instance', {
  value: new MediaApi(),
  writable: false,
  configurable: false,
});
