
import { axiosApi as axios } from '@nara.platform/accent';
import { NameValueList } from 'shared/model';
import { SubsidiaryModel } from '../../model/SubsidiaryModel';


class SubsidiaryApi {
  //
  URL = '/api/college/subsidiaries';

  static instance: SubsidiaryApi;

  registerSubsidiary(subsidiary: SubsidiaryModel) {
    return axios.post<string>(this.URL, subsidiary)
      .then(response => response && response.data || null)
      .catch(() => {});
  }

  findSubsidiary(subsidiaryId: string) {
    //
    return axios.get<SubsidiaryModel>(this.URL + `/${subsidiaryId}`)
      .then(response => response && response.data || null);
  }

  findAllSubsidiaries() {
    //
    return axios.get<SubsidiaryModel[]>(this.URL)
      .then(response => response && Array.isArray(response.data) && response.data || []);
  }

  findSubsidiariesByCompany() {
    //
    return axios.get<SubsidiaryModel[]>(this.URL + '/byCineroomId')
      .then(response => response && Array.isArray(response.data) && response.data || []);

  }

  modifySubsidiary(subsidiaryId: string, nameValues: NameValueList) {
    //
    return axios.put<void>(this.URL + `${subsidiaryId}`, nameValues);
  }

  removeSubsidiary(subsidiaryId: string) {
    //
    return axios.delete(this.URL + `${subsidiaryId}`);
  }
}

Object.defineProperty(SubsidiaryApi, 'instance', {
  value: new SubsidiaryApi(),
  writable: false,
  configurable: false,
});

export default SubsidiaryApi;
