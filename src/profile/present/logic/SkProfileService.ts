import { observable, action, runInAction, computed } from 'mobx';
import {
  autobind,
  NameValueList,
  CachingFetch,
  IdNameList,
} from '@nara.platform/accent';
import _ from 'lodash';
import SkProfileApi from '../apiclient/SkProfileApi';
import SkProfileModel from '../../model/SkProfileModel';
import StudySummaryModel from '../../model/StudySummaryModel';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import AdditionalUserInfoModel from 'profile/model/AdditionalUserInfoModel';
import TempProfileModel from 'profile/model/TempProfileModel';
import { setFavoriteChannelIds, getFavoriteChannelIds } from '../../stores';

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
    this.skProfileApi = skProfileApi;
  }

  @computed
  get profileMemberName() {
    let viewProfileName: string = '';

    if (this.skProfile.displayNicknameFirst) {
      viewProfileName = this.skProfile.nickname;
    } else {
      viewProfileName =
        this.skProfile && parsePolyglotString(this.skProfile.name);
    }

    return viewProfileName;
  }

  @computed
  get profileMemberCompanyCode() {
    return this.skProfile.companyCode;
  }

  @computed
  get studySummaryFavoriteChannels() {
    // const { favoriteChannels } = this.studySummary;
    // return (favoriteChannels && favoriteChannels.idNames) || [];
    return [...this.additionalUserInfo.favoriteChannelIds] || [];
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
    const fetched = this.skProfileCachingFetch.fetch(
      () => this.skProfileApi.findSkProfile(),
      (tempProfile: TempProfileModel) => this.divideProfileModel(tempProfile)
    );

    return fetched
      ? this.skProfileCachingFetch.inProgressFetching
      : this.skProfile;
  }

  @action
  async divideProfileModel(user: TempProfileModel) {
    if (
      JSON.stringify(getFavoriteChannelIds()) !==
      JSON.stringify(user.additionalUserInfo.favoriteChannelIds)
    ) {
      setFavoriteChannelIds(user.additionalUserInfo.favoriteChannelIds);
    }

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
          this.skProfile.nickname = skProfile.nickname;
          this.skProfile.departmentName = skProfile.department.name;
          this.skProfile.photoImagePath = skProfile.profileImg;
          this.skProfile.backgroundImagePath = skProfile.profileBgImg;
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
  setFavoriteJobDutyProp(favoriteJobDutyId: string) {
    this.additionalUserInfo.favoriteJobDutyId = favoriteJobDutyId;
  }

  @action
  setUserDefinedFavoriteJobDuty(userDefinedFavoriteJobDuty: string) {
    this.additionalUserInfo.userDefinedFavoriteJobDuty =
      userDefinedFavoriteJobDuty;
  }

  @action
  setCurrentJobGroupProp(currentJobGroupId: string) {
    this.additionalUserInfo.currentJobGroupId = currentJobGroupId;
  }

  @action
  setCurrentJobDutyProp(currentJobDutyId: string) {
    this.additionalUserInfo.currentJobDutyId = currentJobDutyId;
  }

  @action
  setUserDefinedCurrentJobDuty(userDefinedCurrentJobDuty: string) {
    this.additionalUserInfo.userDefinedCurrentJobDuty =
      userDefinedCurrentJobDuty;
  }

  // StudySummary ------------------------------------------------------------------------------------------------------

  @action
  async findStudySummary() {
    const fetched = this.studySummaryCachingFetch.fetch(
      () => this.skProfileApi.findStudySummary(),
      async (additionalUserInfo: AdditionalUserInfoModel) => {
        if (
          JSON.stringify(getFavoriteChannelIds()) !==
          JSON.stringify(additionalUserInfo.favoriteChannelIds)
        ) {
          setFavoriteChannelIds(additionalUserInfo.favoriteChannelIds);
        }

        runInAction(() => (this.additionalUserInfo = additionalUserInfo));
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
  modifyPhotoImageByProfileId(photoImage: string) {
    const params = {
      nameValues: [
        {
          name: 'photoImagePath',
          value: photoImage,
        },
      ],
    };

    return this.skProfileApi.modifySkProfile(params);
  }

  @action
  modifyProfileNickName(nickname: string) {
    //
    this.skProfile = _.set(this.skProfile, 'nickname', nickname);
  }

  @action
  setStudySummaryProp(name: string, value: any) {
    this.studySummary = _.set(this.studySummary, name, value);
  }

  @action
  setProfileProp(value: string) {
    this.skProfile.photoImagePath = value;
  }

  @action
  setAdditionalUserInfo(learningTyps: IdNameList) {
    this.additionalUserInfo.favoriteLearningTypes = learningTyps;
  }
}

Object.defineProperty(SkProfileService, 'instance', {
  value: new SkProfileService(SkProfileApi.instance),
  writable: false,
  configurable: false,
});

export default SkProfileService;
