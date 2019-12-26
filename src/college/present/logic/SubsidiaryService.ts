import { action, observable, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { NameValueList } from '../../../shared-model/NameValueList';
import { SubsidiaryModel } from '../../model/SubsidiaryModel';
import SubsidiaryApi from '../apiclient/SubsidiaryApi';


@autobind
export default class SubsidiaryService {
  //
  static instance: SubsidiaryService;

  subsidiaryApi: SubsidiaryApi;

  @observable
  subsidiary: SubsidiaryModel = new SubsidiaryModel();

  @observable
  subsidiaries: SubsidiaryModel[] = [];

  constructor(subsidiaryApi: SubsidiaryApi) {
    this.subsidiaryApi = subsidiaryApi;
  }

  @action
  async findSubsidiary(subsidiaryId: string) {
    //
    const subsidiary = await this.subsidiaryApi.findSubsidiary(subsidiaryId);
    if (subsidiary) return runInAction(() => this.subsidiary = new SubsidiaryModel(subsidiary));
    return null;
  }

  @action
  async findAllsubsidiarys() {
    //
    const subsidiaries = await this.subsidiaryApi.findAllSubsidiaries();
    return runInAction(() => this.subsidiaries = subsidiaries);
  }

  modifySubsidiary(subsidiaryId: string, nameValues: NameValueList) {
    //
    this.subsidiaryApi.modifySubsidiary(subsidiaryId, nameValues);
  }

  removeSubsidiary(subsidiaryId: string) {
    //
    this.subsidiaryApi.removeSubsidiary(subsidiaryId);
  }


  @action
  clearsubsidiary() {
    //
    this.subsidiary = new SubsidiaryModel();
  }
}

Object.defineProperty(SubsidiaryService, 'instance', {
  value: new SubsidiaryService(SubsidiaryApi.instance),
  writable: false,
  configurable: false,
});
