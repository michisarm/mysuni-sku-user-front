
import { axiosApi as axios, NameValueList } from '@nara.platform/accent';

import SkProfileModel from '../../model/SkProfileModel';
import StudySummaryModel from '../../model/StudySummaryModel';
import SkProfileUdo from '../../model/SkProfileUdo';


export default class SkProfileApi {
  //
  URL = '/api/profile/profiles';

  static instance: SkProfileApi;


  // User 본인 상세보기
  findSkProfile() {
    return axios.get<SkProfileModel>(this.URL )
      .then((response) => response && response.data || null);
  }

  // 본인 정보 수정
  modifySkProfile(skProfileUdo:SkProfileUdo) {
    return axios.put<void>(this.URL, skProfileUdo);
  }

  // 본인 StudySummary 조회
  findStudySummary() {
    return axios.get<StudySummaryModel>(this.URL + '/summary')
      .then((response) => response && response.data || null);
  }

  // 본인 studysummary 등록 - 로그인시 skprofile에 생성된 studySummary update
  modifyStudySummary(nameValues : NameValueList) {
    return axios.put<void>(this.URL + `/summary`, nameValues);
  }

  modifyStudySummaryFirstTime(nameValues : NameValueList) {
    return axios.put<void>(this.URL + `/summary/firsttime`, nameValues);
  }

  // mySUNI에서 본인 증명사진 base64 데이터 저장
  modifyPhotoUrlByProfileId(profileId: string, nameValues : NameValueList) {
    return axios.put<void>(this.URL + `/photoUrl/${profileId}`, nameValues);
  }

}

Object.defineProperty(SkProfileApi, 'instance', {
  value: new SkProfileApi(),
  writable: false,
  configurable: false,
});
