import { action, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { ContentsProviderModel } from '../../model/ContentsProviderModel';
import ContentsProviderApi from '../apiclient/ContentsProviderApi';
import { NameValueList } from '../../../shared/model/NameValueList';


@autobind
export default class ContentsProviderService {
  //
  static instance: ContentsProviderService;

  contentsProviderApi: ContentsProviderApi;

  @observable
  contentsProvider: ContentsProviderModel = new ContentsProviderModel();

  @observable
  contentsProviders: ContentsProviderModel[] = [];

  constructor(contentsProviderApi: ContentsProviderApi) {
    this.contentsProviderApi = contentsProviderApi;
  }

  @action
  async findContentsProvider(contentsProviderId: string) {
    //
    const contentsProvider = await this.contentsProviderApi.findContentsProvider(contentsProviderId);
    if (contentsProvider) return runInAction(() => this.contentsProvider = new ContentsProviderModel(contentsProvider));
    return null;
  }

  @action
  async findAllContentsProviders() {
    //
    const contentsProviders = await this.contentsProviderApi.findAllContentsProviders();
    return runInAction(() => this.contentsProviders = contentsProviders);
  }

  modifyContentsProvider(contentsProviderId: string, nameValues: NameValueList) {
    //
    this.contentsProviderApi.modifyContentsProvider(contentsProviderId, nameValues);
  }

  removeContentsProvider(contentsProviderId: string) {
    //
    this.contentsProviderApi.removeContentsProvider(contentsProviderId);
  }


  @action
  clearContentsProvider() {
    //
    this.contentsProvider = new ContentsProviderModel();
  }
}

Object.defineProperty(ContentsProviderService, 'instance', {
  value: new ContentsProviderService(ContentsProviderApi.instance),
  writable: false,
  configurable: false,
});
