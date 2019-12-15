import { axiosApi as axios, NameValueList, OffsetElementList } from '@nara.platform/accent';

import { SkProfileModel } from '../../model/SkProfileModel';
import { SkProfileRdo } from '../../model/SkProfileRdo';
import { StudySummaryCdoModel } from '../../model/StudySummaryCdoModel';

export default class SkProfileApi {
  //
  URL = '/api/sk/profiles';

  static instance: SkProfileApi;


  registerSkProfile(skProfile: SkProfileModel) {
    //
    return axios.post<SkProfileModel>(this.URL, skProfile)
      .then((response) => response && response.data || null);
  }

  findSkProfile(citizenId: string) {
    //
    return axios.get<SkProfileModel>(this.URL + `/${citizenId}`)
      .then((response) => response && response.data || null);
  }

  //Query
  findAllSkProfiles(skProfileRdo : SkProfileRdo) {
    return axios.get<OffsetElementList<SkProfileModel>>(this.URL + `/searchKey`, { params: skProfileRdo })
      .then(response => response && response.data || null);
  }

  modifySkProfile(memberId : string, nameValues: NameValueList) {
    return axios.put<void>(this.URL + `/${memberId}`, nameValues);
  }

  removeSkProfile(memberId:string) {
    return axios.delete(this.URL + `/${memberId}`);
  }

  registerStudySummary(studySummary : StudySummaryCdoModel) {
    return axios.post<StudySummaryCdoModel>(this.URL + `/studySummary`, studySummary)
      .then((response) => response && response.data || null);
  }

  findStudySummary(memberId : string) {
    return axios.get<StudySummaryCdoModel>(this.URL + `/studySummary/${memberId}`)
      .then((response) => response && response.data || null);
  }
}

Object.defineProperty(SkProfileApi, 'instance', {
  value: new SkProfileApi(),
  writable: false,
  configurable: false,
});
