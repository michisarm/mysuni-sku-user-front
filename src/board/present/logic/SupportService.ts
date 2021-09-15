import SupportApi from '../apiclient/SupportApi';

class SupportService {
  //
  static instance: SupportService;

  supportApi: SupportApi;

  constructor(supportApi: SupportApi) {
    this.supportApi = supportApi;
  }
}

SupportService.instance = new SupportService(SupportApi.instance);
export default SupportService;
