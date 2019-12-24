import { action, observable, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import MediaApi from '../apiclient/MediaApi';
import MediaFlowApi from '../apiclient/MediaFlowApi';
import { MediaModel } from '../../model/MediaModel';
import { PersonalCubeModel } from '../../../personalcube';
import { CubeIntroModel } from '../../../cubeintro';
import { MediaFlowCdoModel } from '../../model/MediaFlowCdoModel';
import { MediaFlowUdoModel } from '../../model/MediaFlowUdoModel';

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

  makeMedia(personalCubeModel: PersonalCubeModel, cubeIntro: CubeIntroModel, media: MediaModel) {
    //
    return this.mediaFlowApi.makeMedia(
      new MediaFlowCdoModel(
        PersonalCubeModel.asCdo(personalCubeModel),
        CubeIntroModel.asCdo(cubeIntro),
        MediaModel.asCdo(media))
    );
  }

  modifyMedia(personalCubeId: string, cube: PersonalCubeModel, cubeIntro: CubeIntroModel, media: MediaModel) {
    //
    this.mediaFlowApi.modifyMedia(personalCubeId, new MediaFlowUdoModel(cube, cubeIntro, media));
  }

  removeMedia(personalCubeId: string) {
    //
    this.mediaFlowApi.removeMedia(personalCubeId);
  }

  @action
  changeMediaProps(name: string, value: string | Date, nameSub?: string, valueSub?: string) {
    //
    this.media = _.set(this.media, name, value);
    if (typeof value === 'object' && nameSub) {
      this.media = _.set(this.media, nameSub, valueSub);
    }
    console.log(this.media);
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
