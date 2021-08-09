import { observable, action, runInAction, computed } from 'mobx';
import { autobind, NameValueList, CachingFetch } from '@nara.platform/accent';

import _ from 'lodash';
import SkProfileApi from '../apiclient/SkProfileApi';
import SkProfileModel from '../../model/SkProfileModel';
import StudySummaryModel from '../../model/StudySummaryModel';
import { findAllCollegeCache } from '../../../college/present/apiclient/CollegeApi';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import AdditionalUserInfoModel from 'profile/model/AdditionalUserInfoModel';
import TempProfileModel from 'profile/model/TempProfileModel';

@autobind
class SkProfileService {
  //
  static instance: SkProfileService;

  skProfileApi: SkProfileApi;

  @observable
  skProfile: SkProfileModel = new SkProfileModel();

  @observable
  additionalUserInfo: AdditionalUserInfoModel = new AdditionalUserInfoModel();

  skProfileCachingFetch: CachingFetch = new CachingFetch();

  communityProfileCachingFetch: CachingFetch = new CachingFetch();

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
    //
    let viewProfileName: string = '';

    if (this.skProfile.nameFlag === 'N' && this.skProfile.nickName !== '') {
      viewProfileName = this.skProfile.nickName;
    } else {
      viewProfileName =
        this.skProfile && parsePolyglotString(this.skProfile.name);
    }

    return viewProfileName;
    // return this.skProfile.member.name;
  }

  // 김민준
  // @computed
  // get profileMemberEmail() {
  //   return this.skProfile.member.email;
  // }

  @computed
  get profileMemberCompanyCode() {
    return this.skProfile.companyCode;
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
      (tempProfile: TempProfileModel) => this.divideProfileModel(tempProfile)
      // runInAction(() => (
      //     this.skProfile = new SkProfileModel(tempProfile.user)
      //  ))
      //  &&
      //  runInAction(() => (
      //    this.additionalUserInfo = new AdditionalUserInfoModel(tempProfile.additionalUserInfo)
      //  ))
    );

    return fetched
      ? this.skProfileCachingFetch.inProgressFetching
      : this.skProfile;
  }

  @action
  async divideProfileModel(user: TempProfileModel) {
    await runInAction(() => (this.skProfile = new SkProfileModel(user.user)));

    await runInAction(
      () =>
        (this.additionalUserInfo = new AdditionalUserInfoModel(
          user.additionalUserInfo
        ))
    );
  }

  @action
  async findCommunityProfile() {
    //
    const fetched = this.communityProfileCachingFetch.fetch(
      () => this.skProfileApi.findCommunityProfile(),
      (skProfile) =>
        runInAction(() => {
          this.skProfile = new SkProfileModel(skProfile);
          this.skProfile.name = skProfile.name;
          this.skProfile.nickName = skProfile.nickname;
          this.skProfile.departmentName = skProfile.department.name;
          this.skProfile.photoImage = skProfile.profileImg;
          this.skProfile.bgImage = skProfile.profileBgImg;
        })
    );
    return fetched
      ? this.communityProfileCachingFetch.inProgressFetching
      : this.skProfile;
  }

  modifySkProfile(nameValues: NameValueList) {
    return this.skProfileApi.modifySkProfile(nameValues);
  }

  // 김민준 - 현재 id만 넘어오는 중 (additional)
  @action
  setFavoriteJobGroupProp(favoriteGroupId: string) {
    this.additionalUserInfo.favoriteJobGroupId = favoriteGroupId;
  }

  @action
  setCurrentJobGroupProp(currentJobGroupId: string) {
    this.additionalUserInfo.currentJobGroupId = currentJobGroupId;
  }

  // StudySummary ------------------------------------------------------------------------------------------------------

  @action
  async findStudySummary() {
    //
    const fetched = this.studySummaryCachingFetch.fetch(
      () => this.skProfileApi.findStudySummary(),
      async (studySummary: AdditionalUserInfoModel) => {
        const collegeData = await findAllCollegeCache();
        // if (collegeData !== undefined && studySummary !== undefined) {
        //   studySummary.favoriteChannelIds.forEach((id) => {
        //     const channelId = id;
        //     const college = collegeData.find((c) =>
        //       c.channels.some((d) => d.id === channelId)
        //     );
        //     if (college !== undefined) {
        //       const channel = college.channels.find((c) => c.id === channelId);
        //       if (channel !== undefined) {
        //         idName.name = parsePolyglotString(channel.name);
        //       }
        //     }
        //   });
        //   studySummary.favoriteColleges.idNames.forEach((idName) => {
        //     const collegeId = idName.id;
        //     const college = collegeData.find((c) => c.id === collegeId);
        //     if (college !== undefined) {
        //       idName.name = parsePolyglotString(college.name);
        //     }
        //   });
        // }

        // runInAction(
        //   () => (this.studySummary = new StudySummaryModel(studySummary))
        // );
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

  // @action
  // setMemberProp(name: string, value: string | {} | string[]) {
  //   this.skProfile.member = _.set(this.skProfile.member, name, value);
  // }

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
