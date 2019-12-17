import { observable, action, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import MediaApi from '../apiclient/MediaApi';
import MediaFlowApi from '../apiclient/MediaFlowApi';
import { MediaModel } from '../../model/MediaModel';


@autobind
export default class MediaService {
  //
  static instance: MediaService;

  mediaApi: MediaApi;
  mediaFlowApi: MediaFlowApi;

  @observable
  media: MediaModel = new MediaModel();

  constructor(mediaApi: MediaApi, mediaFlowApi: MediaFlowApi) {
    this.mediaApi = mediaApi;
    this.mediaFlowApi = mediaFlowApi;
  }

  @action
  async findMedia(mediaId: string) {
    const media = await this.mediaApi.findMedia(mediaId);
    runInAction(() => this.media = new MediaModel(media));
  }

  @action
  clearMedia() {
    this.media = new MediaModel();
  }
}

Object.defineProperty(MediaService, 'instance', {
  value: new MediaService(MediaApi.instance, MediaFlowApi.instance),
  writable: false,
  configurable: false,
});
