import { observable, action, runInAction, computed } from 'mobx';
import {
  autobind,
  NameValueList,
  CachingFetch,
  IdName,
} from '@nara.platform/accent';

import _ from 'lodash';
import SkProfileApi from '../apiclient/SkProfileApi';
import SkProfileModel from '../../model/SkProfileModel';
import StudySummaryModel from '../../model/StudySummaryModel';
import SkProfileUdo from '../../model/SkProfileUdo';
import { findAllCollegeCache } from '../../../college/present/apiclient/CollegeApi';

@autobind
class SkProfileService {
  //
  static instance: SkProfileService;

  skProfileApi: SkProfileApi;

  @observable
  skProfile: SkProfileModel = new SkProfileModel();

  skProfileCachingFetch: CachingFetch = new CachingFetch();

  @observable
  studySummary: StudySummaryModel = new StudySummaryModel();

  studySummaryCachingFetch: CachingFetch = new CachingFetch();

  @observable
  reAgree: boolean = false;

  constructor(skProfileApi: SkProfileApi) {
    //
    this.skProfileApi = skProfileApi;
  }

  @computed
  get profileMemberName() {
    return this.skProfile.member.name;
  }

  @computed
  get profileMemberEmail() {
    return this.skProfile.member.email;
  }

  @computed
  get profileMemberCompanyCode() {
    return this.skProfile.member.companyCode;
  }

  @computed
  get studySummaryFavoriteChannels() {
    //
    const { favoriteChannels } = this.studySummary;
    return (favoriteChannels && favoriteChannels.idNames) || [];
  }

  // SkProfile ---------------------------------------------------------------------------------------------------------

  @action
  setReagree(agree: boolean) {
    this.reAgree = agree;
  }

  @action
  clearSkProfile() {
    this.skProfile = new SkProfileModel();
  }

  @action
  async findSkProfile() {
    //
    const fetched = this.skProfileCachingFetch.fetch(
      () => this.skProfileApi.findSkProfile(),
      skProfile =>
        runInAction(() => (this.skProfile = new SkProfileModel(skProfile)))
    );
    return fetched
      ? this.skProfileCachingFetch.inProgressFetching
      : this.skProfile;
  }

  modifySkProfile(skProfileUdo: SkProfileUdo) {
    return this.skProfileApi.modifySkProfile(skProfileUdo);
  }

  @action
  setFavoriteJobGroupProp(name: string, value: any) {
    this.skProfile.member.favoriteJobGroup = _.set(
      this.skProfile.member.favoriteJobGroup,
      name,
      value
    );
  }

  @action
  setCurrentJobGroupProp(name: string, value: any) {
    this.skProfile.member.currentJobGroup = _.set(
      this.skProfile.member.currentJobGroup,
      name,
      value
    );
  }

  // StudySummary ------------------------------------------------------------------------------------------------------

  @action
  async findStudySummary() {
    //
    const fetched = this.studySummaryCachingFetch.fetch(
      () => this.skProfileApi.findStudySummary(),
      async (studySummary: StudySummaryModel) => {
        const collegeData = await findAllCollegeCache();

        if (collegeData !== undefined && studySummary !== undefined) {
          const channels = studySummary.favoriteChannels.idNames
            .map(idName => {
              const channelId = idName.id;
              const college = collegeData.find(c =>
                c.channels.some(d => d.id === channelId)
              );
              if (college !== undefined) {
                const channel = college.channels.find(c => c.id === channelId);
                if (channel !== undefined) {
                  idName.name = channel.name;
                  return idName;
                }
              }
            })
            .filter(c => c !== undefined) as IdName[];

          const colleges = studySummary.favoriteColleges.idNames
            .map(idName => {
              const collegeId = idName.id;
              const college = collegeData.find(c => c.id === collegeId);
              if (college !== undefined) {
                idName.name = college.name;
                return idName;
              }
            })
            .filter(c => c !== undefined) as IdName[];

          studySummary.favoriteChannels.idNames = channels;
          studySummary.favoriteColleges.idNames = colleges;
          runInAction(
            () => (this.studySummary = new StudySummaryModel(studySummary))
          );
        }
      }
    );

    return fetched
      ? this.studySummaryCachingFetch.inProgressFetching
      : this.studySummary;
  }

  modifyStudySummary(nameValues: NameValueList) {
    return this.skProfileApi.modifyStudySummary(nameValues);
  }

  modifyStudySummaryFirstTime(nameValues: NameValueList) {
    return this.skProfileApi.modifyStudySummaryFirstTime(nameValues);
  }

  /**
   * mySUNI에서 본인 증명사진 base64 데이터 저장
   */
  modifyPhotoImageByProfileId(
    profileId: string,
    photoType: string,
    photoImage: string
  ) {
    let asNameValues = {} as NameValueList;

    if (!photoType || photoType === '0') {
      asNameValues = {
        nameValues: [
          {
            name: 'photoType',
            value: '0', // 0 - 타시스템인 IM으로부터 인터페이스 받은 증명사진을 보여줌.
          },
        ],
      };
    } else if (photoType && photoType === '1') {
      asNameValues = {
        nameValues: [
          {
            name: 'photoType',
            value: '1', // 1 - mySUNI에서 사용자가 등록한 증명사진를 보여줌.
          },
          {
            name: 'photoImage',
            value: photoImage,
          },
        ],
      };
    }

    return this.skProfileApi.modifyPhotoUrlByProfileId(profileId, asNameValues);
  }

  @action
  setStudySummaryProp(name: string, value: any) {
    this.studySummary = _.set(this.studySummary, name, value);
  }

  @action
  setMemberProp(name: string, value: string | {} | string[]) {
    this.skProfile.member = _.set(this.skProfile.member, name, value);
  }

  @action
  setProfileProp(name: string, value: string | {} | string[] | number) {
    this.skProfile = _.set(this.skProfile, name, value);
  }
}

Object.defineProperty(SkProfileService, 'instance', {
  value: new SkProfileService(SkProfileApi.instance),
  writable: false,
  configurable: false,
});

export default SkProfileService;
