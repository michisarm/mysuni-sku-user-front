// import { axiosApi as axios } from '@nara.platform/accent';

export default class MediaFlowApi {
  URL = '/api/personalCube/media/flow';

  static instance: MediaFlowApi;

}

Object.defineProperty(MediaFlowApi, 'instance', {
  value: new MediaFlowApi(),
  writable: false,
  configurable: false,
});
