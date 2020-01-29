import { action, observable, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';
import _ from 'lodash';
import MediaApi from '../apiclient/MediaApi';
import MediaFlowApi from '../apiclient/MediaFlowApi';
import { MediaModel } from '../../model/MediaModel';
import { PersonalCubeModel } from '../../../personalcube';
import { CubeIntroModel } from '../../../cubeintro';
import { MediaFlowCdoModel } from '../../model/MediaFlowCdoModel';
import { MediaFlowUdoModel } from '../../model/MediaFlowUdoModel';
import { MediaFlowUserCdoModel } from '../../model/MediaFlowUserCdoModel';
import { MediaFlowUserUdoModel } from '../../model/MediaFlowUserUdoModel';
import { PanoptoCdoModel } from '../../model/PanoptoCdoModel';
import { InternalMediaConnectionModel } from '../../model/InternalMediaConnectionModel';

@autobind
export default class MediaService {
  //
  static instance: MediaService;

  mediaApi: MediaApi;
  mediaFlowApi: MediaFlowApi;

  @observable
  media: MediaModel = new MediaModel();

  @observable
  panoptoCdo: PanoptoCdoModel = new PanoptoCdoModel();

  @observable
  panoptos: OffsetElementList<InternalMediaConnectionModel> = { results: [], totalCount: 0 };

  @observable
  panopto: InternalMediaConnectionModel = new InternalMediaConnectionModel();

  @observable
  selectedPanoptos: InternalMediaConnectionModel[] = [];

  @observable
  selectedPanoptoIds: string[] = [];

  @observable
  uploadedPaonoptos: InternalMediaConnectionModel[] = [];

  constructor(mediaApi: MediaApi, mediaFlowApi: MediaFlowApi) {
    this.mediaApi = mediaApi;
    this.mediaFlowApi = mediaFlowApi;
  }

  @action
  async findMedia(mediaId: string) {
    //
    const media = await this.mediaApi.findMedia(mediaId);

    runInAction(() => this.media = media);
    return media;
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

  makeMediaByUser(personalCubeId : string, cubeIntro: CubeIntroModel, media: MediaModel) {
    //
    return this.mediaFlowApi.makeMediaByUser(
      new MediaFlowUserCdoModel(
        personalCubeId,
        CubeIntroModel.asCdo(cubeIntro),
        MediaModel.asCdo(media))
    );
  }

  modifyMediaByUser(personalCubeId: string, cubeIntro : CubeIntroModel, media: MediaModel) {
    return this.mediaFlowApi.modifyMediaByUser(personalCubeId, new MediaFlowUserUdoModel(cubeIntro, media));
  }

  modifyMedia(personalCubeId: string, cube: PersonalCubeModel, cubeIntro: CubeIntroModel, media: MediaModel) {
    //
    return this.mediaFlowApi.modifyMedia(personalCubeId, new MediaFlowUdoModel(cube, cubeIntro, media));
  }

  removeMedia(personalCubeId: string) {
    //
    return this.mediaFlowApi.removeMedia(personalCubeId);
  }

  @action
  changeMediaProps(name: string, value: string | Date | any[], nameSub?: string, valueSub?: string) {
    //
    this.media = _.set(this.media, name, value);
    if (typeof value === 'object' && nameSub) {
      this.media = _.set(this.media, nameSub, valueSub);
    }
  }

  @action
  setSeletedPanoptos(panoptoList: InternalMediaConnectionModel[]) {
    //
    this.selectedPanoptos = panoptoList;
  }

  @action
  setUploadedPanoptos(panoptoList: InternalMediaConnectionModel[]) {
    //
    this.uploadedPaonoptos = panoptoList;
  }

  @action
  setSeletedPanoptoIds(panoptoIdList: string[]) {
    //
    this.selectedPanoptoIds = panoptoIdList;
  }

  @action
  clearMedia() {
    this.media = new MediaModel();
  }

  @action
  async findPanoptoList() {
    //
    const panoptos = await this.mediaApi.findPanoptoList(this.panoptoCdo);
    return runInAction(() => this.panoptos = panoptos);
  }

  @action
  changePanoptoCdoProps(name: string, value: string | number) {
    //
    this.panoptoCdo = _.set(this.panoptoCdo, name, value);
  }

  @action
  changePanoptoProps(name: string, value: string) {
    //
    this.panopto = _.set(this.panopto, name, value);
  }

  @action
  setPanoptoProps(selectedPanopto: InternalMediaConnectionModel) {
    //
    this.panopto = selectedPanopto;
  }

  @action
  clearPanopto() {
    //
    this.panopto = new InternalMediaConnectionModel();
  }

  @action
  clearPanoptos() {
    //
    this.panoptos = { results: [], totalCount: 0 };
  }

  @action
  clearPanoptoCdo() {
    //
    this.panoptoCdo = new PanoptoCdoModel();
  }

  @action
  clearselectedPanoptoCdo() {
    //
    this.selectedPanoptos = [];
  }

  @action
  clearselectedPanoptoIds() {
    //
    this.selectedPanoptoIds = [];
  }
}

Object.defineProperty(MediaService, 'instance', {
  value: new MediaService(MediaApi.instance, MediaFlowApi.instance),
  writable: false,
  configurable: false,
});
