
import { observable, action, runInAction, computed } from 'mobx';
import { autobind, NameValueList, CachingFetch } from '@nara.platform/accent';

import _ from 'lodash';
import SkProfileApi from '../apiclient/SkProfileApi';
import SkProfileModel from '../../model/SkProfileModel';
import StudySummaryModel from '../../model/StudySummaryModel';
import SkProfileUdo from '../../model/SkProfileUdo';


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


  constructor(skProfileApi: SkProfileApi) {
    //
    this.skProfileApi = skProfileApi;
  }

  @computed
  get profileMemberName() {
    return this.skProfile.member.name;
  }

  @computed
  get studySummaryFavoriteChannels() {
    //
    const { favoriteChannels } = this.studySummary;

    return favoriteChannels && favoriteChannels.idNames || [];
  }

  // SkProfile ---------------------------------------------------------------------------------------------------------

  @action
  clearSkProfile() {
    this.skProfile = new SkProfileModel();
  }

  @action
  async findSkProfile() {
    //
    console.log('findSkProfile');
    const fetched = this.skProfileCachingFetch.fetch(
      () => this.skProfileApi.findSkProfile(),
      (skProfile) => runInAction(() => this.skProfile = new SkProfileModel(skProfile)),
    );
    return fetched ? this.skProfileCachingFetch.inProgressFetching : this.skProfile;
  }

  modifySkProfile(skProfileUdo : SkProfileUdo) {
    this.skProfileApi.modifySkProfile(skProfileUdo);
  }

  @action
  setFavoriteJobGroupProp(name:string, value:any) {
    this.skProfile.member.favoriteJobGroup = _.set(this.skProfile.member.favoriteJobGroup, name, value);
  }

  // StudySummary ------------------------------------------------------------------------------------------------------

  @action
  async findStudySummary() {
    //
    const fetched = this.studySummaryCachingFetch.fetch(
      () => this.skProfileApi.findStudySummary(),
      (studySummary) => runInAction(() => this.studySummary = new StudySummaryModel(studySummary)),
    );

    return fetched ? this.studySummaryCachingFetch.inProgressFetching : this.studySummary;
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
  modifyPhotoImageByProfileId(profileId: string, photoType: string, photoImage : string)
  {
    let asNameValues = {} as NameValueList;

    if (!photoType || photoType === '0')
    {
      asNameValues = {
        nameValues: [
          {
            name: 'photoType',
            value: '0', // 0 - 타시스템인 IM으로부터 인터페이스 받은 증명사진을 보여줌.
          },
        ],
      };
    } else if (photoType && photoType === '1')
    {
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
  setStudySummaryProp(name:string, value:any) {
    this.studySummary = _.set(this.studySummary, name, value);
  }

  @action
  setMemberProp(name: string, value: string | {} | string[])
  {
    this.skProfile.member = _.set(this.skProfile.member, name, value);
  }

  @action
  setProfileProp(name: string, value: string | {} | string[] | number)
  {
    // console.log('SkProfileService setProfileProp=', value);
    this.skProfile = _.set(this.skProfile, name, value);
  }
}

Object.defineProperty(SkProfileService, 'instance', {
  value: new SkProfileService(SkProfileApi.instance),
  writable: false,
  configurable: false,
});

export default SkProfileService;
