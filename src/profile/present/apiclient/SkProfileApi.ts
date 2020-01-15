import { axiosApi as axios, NameValueList, OffsetElementList } from '@nara.platform/accent';

import { SkProfileModel } from '../../model/SkProfileModel';
import { SkProfileRdo } from '../../model/SkProfileRdo';
import { StudySummary } from '../../model/StudySummary';
import { SkProfileCdoModel } from '../../model/SkProfileCdoModel';
import { SkProfileUdo } from '../../model/SkProfileUdo';

export default class SkProfileApi {
  //
  URL = '/api/profile/profiles';

  static instance: SkProfileApi;

  //Manager, SuperManager
  registerSkProfile(skProfile: SkProfileCdoModel) {
    //
    return axios.post<SkProfileCdoModel>(this.URL, skProfile)
      .then((response) => response && response.data || null);
  }

  //Manager, SuperManager - 관리자 컨텐츠 목록에서 상세보기
  findSkProfileByAudienceId(audienceId: string) {
    //
    return axios.get<SkProfileModel>(this.URL + `/byAudienceId/${audienceId}`)
      .then((response) => response && response.data || null);
  }

  //Manager, SuperManager - 관리자 프로파일 목록에서 상세보기
  findSkProfileByProfileId(profileId:string) {
    return axios.get<SkProfileModel>(this.URL + `/byProfileId/${profileId}`)
      .then((response) => response && response.data || null );
  }

  //User 본인 상세보기
  findSkProfile() {
    return axios.get<SkProfileModel>(this.URL )
      .then((response) => response && response.data || null);
  }

  //Manager, SuperManager
  findAllSkProfile(offset:number, limit:number) {
    return axios.get<OffsetElementList<SkProfileModel>>(this.URL + '/all')
      .then((response) => response && response.data || null);
  }

  //Manager, SuprManager : SearchKey 검색
  findAllSkProfilesBySearchKey(skProfileRdo : SkProfileRdo) {
    return axios.get<OffsetElementList<SkProfileModel>>(this.URL + `/searchKey`, { params: skProfileRdo })
      .then(response => response && response.data || null);
  }

  //Manager, SuperManager
  modifySkProfileByProfileId(profileId : string, skProfileUdo:SkProfileUdo) {
    return axios.put<void>(this.URL + `/${profileId}`, skProfileUdo);
  }

  //본인 정보 수정
  modifySkProfile(skProfileUdo:SkProfileUdo) {
    return axios.put<void>(this.URL, skProfileUdo);
  }

  //Manager, SuperManager
  removeSkProfile(profileId:string) {
    return axios.delete(this.URL + `/${profileId}`);
  }

  //본인 StudySummary조회
  findStudySummary() {
    return axios.get<StudySummary>(this.URL + '/summary')
      .then((response) => response && response.data || null);
  }

  //Manager, SuperManager 조회
  findStudySummaryByProfileId(profileId : string) {
    return axios.get<StudySummary>(this.URL + `/summary/${profileId}`)
      .then((response) => response && response.data || null);
  }

  //본인 studysummary 등록 - 로그인시 skprofile에 생성된 studySummary update
  modifyStudySummary(nameValues : NameValueList) {
    return axios.put<void>(this.URL + `/summary`, nameValues);
  }

  modifyStudySummaryFirstTime(nameValues : NameValueList) {
    return axios.put<void>(this.URL + `/summary/firsttime`, nameValues);
  }

  //Manager, SuperAdmin{
  modifyStudySummaryByProfileId(profileId:string, nameValues:NameValueList) {
    return axios.put<void>(this.URL + `/summary/${profileId}`, nameValues);
  }

}

Object.defineProperty(SkProfileApi, 'instance', {
  value: new SkProfileApi(),
  writable: false,
  configurable: false,
});
