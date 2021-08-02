import { axiosApi as axios, NameValueList } from '@nara.platform/accent';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import SkProfileModel from '../../model/SkProfileModel';
import StudySummaryModel from '../../model/StudySummaryModel';
import SkProfileUdo from '../../model/SkProfileUdo';
import { PisAgreementSdo } from '../../model/PisAgreementSdo';
import { CpPisAgreementModel } from '../../model/CpPisAgreementModel';
import ProfileInfoModel from '../../../../src/layout/UserApp/model/ProfileInfoModel';

const BASE_URL = '/api/profile/profiles';

export function registerPisAgreement(pisAgreementSdo: PisAgreementSdo) {
  const url = '/api/profile/pisAgreements';
  return axios.post(url, pisAgreementSdo).then(AxiosReturn);
}

export function findMyPisAgreement(agreementFormId: string, serviceId: string) {
  const url = `/api/profile/pisAgreements/myPisAgreement/${agreementFormId}/${serviceId}`;
  return axios.get<CpPisAgreementModel>(url).then(AxiosReturn);
}

export function findJsonUserGroup() {
  const url = `api/user/users/jsonUserGroup`;
  // const url = `${BASE_URL}/jsonUserGroup`;
  return axios.get(url).then((response) => (response && response.data) || null);
}

export function findUserProfile(
  profileId: string
): Promise<ProfileInfoModel | undefined> {
  // const url = `${BASE_URL}/findProfile/${profileId}`;
  const url = `api/user/users/${profileId}`;
  return axios.get<ProfileInfoModel>(url).then(AxiosReturn);
}

export default class SkProfileApi {
  //
  URL = '/api/profile/profiles';

  static instance: SkProfileApi;

  // User 본인 상세보기
  findSkProfile() {
    return axios
      // .get<SkProfileModel>(`${this.URL}`)
      .get<SkProfileModel>(`/api/user/users`)
      .then((response) => (response && response.data) || null);
  }

  // 본인 정보 수정
  modifySkProfile(skProfileUdo: SkProfileUdo) {
    return axios.put<void>('/api/user/users', skProfileUdo);
    // return axios.put<void>(this.URL, skProfileUdo);
  }

  // 본인 StudySummary 조회
  findStudySummary() {
    return axios
      // .get<StudySummaryModel>(this.URL + '/summary')
      .get<StudySummaryModel>('api/user/users/additionalInfo')
      .then((response) => (response && response.data) || null);
  }

  // 본인 studysummary 등록 - 로그인시 skprofile에 생성된 studySummary update
  modifyStudySummary(nameValues: NameValueList) {
    // return axios.put<void>(this.URL + `/summary`, nameValues);
    return axios.put<void>('api/user/users/additionalInfo', nameValues);
  }

  modifyStudySummaryFirstTime(nameValues: NameValueList) {
    return axios.put<void>(this.URL + `/summary/firsttime`, nameValues);
  }

  // mySUNI에서 본인 증명사진 base64 데이터 저장
  modifyPhotoUrlByProfileId(profileId: string, nameValues: NameValueList) {
    // return axios.put<void>(this.URL + `/photoUrl/${profileId}`, nameValues);
    return axios.put<void>('api/user/users/', nameValues);
  }

  findProfiles(denizenKeys: string[]) {
    return axios
      // .post<string[]>(this.URL + '/byDenizenKeys', denizenKeys) 
      .post<string[]>('api/user/users/byDenizenIds', denizenKeys)
      .then((response: any) => (response && response.data) || []);
  }
}

Object.defineProperty(SkProfileApi, 'instance', {
  value: new SkProfileApi(),
  writable: false,
  configurable: false,
});
