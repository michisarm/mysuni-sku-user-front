import { axiosApi as axios, NameValueList } from '@nara.platform/accent';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import TempProfileModel from '../../model/TempProfileModel';
import StudySummaryModel from '../../model/StudySummaryModel';
import SkProfileUdo from '../../model/SkProfileUdo';
import { PisAgreementSdo } from '../../model/PisAgreementSdo';
import { CpPisAgreementModel } from '../../model/CpPisAgreementModel';
import ProfileInfoModel from '../../../../src/layout/UserApp/model/ProfileInfoModel';
import CommunityProfileModel from '../../model/CommunityProfileModel';
import AdditionalUserInfoModel from 'profile/model/AdditionalUserInfoModel';

const BASE_URL = '/api/profile/profiles';

export function registerPisAgreement(pisAgreementSdo: PisAgreementSdo) {
  const url = '/api/user/users/pisAgreement';

  return axios.post(url, pisAgreementSdo).then(AxiosReturn);
}

export function findMyPisAgreement(agreementFormId: string, serviceId: string) {
  const url = `/api/user/users/pisAgreement/my?aggrementFormId=${agreementFormId}&serviceId=${serviceId}`;
  return axios.get<CpPisAgreementModel>(url).then(AxiosReturn);
}

export function findJsonUserGroup() {
  const url = `/api/user/users/jsonUserGroup`;

  return axios.get(url).then((response) => (response && response.data) || null);
}

export function findUserProfile(
  profileId: string
): Promise<ProfileInfoModel | undefined> {
  const url = `/api/user/users/${profileId}`;
  return axios.get<ProfileInfoModel>(url).then(AxiosReturn);
}

export default class SkProfileApi {
  //
  URL = '/api/profile/profiles';
  COMMUNITY_URL = '/api/community/profiles';

  static instance: SkProfileApi;

  // User 본인 상세보기
  findSkProfile(): Promise<TempProfileModel> {
    return axios
      .get<TempProfileModel>(`/api/user/users/withAdditionalInfo`)
      .then((response) => (response && response.data) || null);
  }

  // User 본인 상세보기
  findCommunityProfile() {
    return axios
      .get<CommunityProfileModel>(`${this.COMMUNITY_URL}`)
      .then((response) => (response && response.data) || null);
  }

  // 본인 정보 수정
  modifySkProfile(nameValues: NameValueList) {
    return axios.put<void>('/api/user/users', nameValues);
    // return axios.put<void>(this.URL, skProfileUdo);
  }

  // 본인 StudySummary 조회
  findStudySummary() {
    return axios
      .get<AdditionalUserInfoModel>('/api/user/users/additionalInfo')
      .then((response) => (response && response.data) || null);
  }

  // 본인 studysummary 등록 - 로그인시 skprofile에 생성된 studySummary update
  modifyStudySummary(nameValues: NameValueList) {
    // return axios.put<void>(this.URL + `/summary`, nameValues);
    return axios.put<void>('/api/user/users/additionalInfo', nameValues);
  }

  modifyStudySummaryFirstTime(nameValues: NameValueList) {
    return axios.put<void>(this.URL + `/summary/firsttime`, nameValues);
  }

  // mySUNI에서 본인 증명사진 base64 데이터 저장
  modifyPhotoUrlByProfileId(profileId: string, nameValues: NameValueList) {
    // return axios.put<void>(this.URL + `/photoUrl/${profileId}`, nameValues);
    return axios.put<void>('/api/user/users/', nameValues);
  }

  findProfiles(denizenKeys: string[]) {
    return (
      axios
        // .post<string[]>(this.URL + '/byDenizenKeys', denizenKeys)
        .post<string[]>('/api/user/users/byDenizenIds', denizenKeys)
        .then((response: any) => (response && response.data) || [])
    );
  }
}

Object.defineProperty(SkProfileApi, 'instance', {
  value: new SkProfileApi(),
  writable: false,
  configurable: false,
});
