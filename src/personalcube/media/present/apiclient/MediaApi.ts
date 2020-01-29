import { axiosApi as axios, OffsetElementList } from '@nara.platform/accent';
import { MediaModel } from '../../model/MediaModel';
import { PanoptoCdoModel } from '../../model/PanoptoCdoModel';
import { InternalMediaConnectionModel } from '../../model/InternalMediaConnectionModel';

export default class MediaApi {

  URL = '/api/personalCube/medias';

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
