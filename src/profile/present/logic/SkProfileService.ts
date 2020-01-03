import { observable, action, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { NameValueList, OffsetElementList } from '@nara.platform/accent';
import _ from 'lodash';
import SkProfileApi from '../apiclient/SkProfileApi';
import { SkProfileQueryModel } from '../../model/SkProfileQueryModel';
import { SkProfileModel } from '../../model/SkProfileModel';
import { StudySummary } from '../../model/StudySummary';
import { SkProfileUdo } from '../../model/SkProfileUdo';

@autobind
export default class SkProfileService {
  //
  static instance: SkProfileService;

  skProfileApi: SkProfileApi;

  @observable
  skProfile: SkProfileModel = new SkProfileModel();

  @observable
  skProfiles: OffsetElementList<SkProfileModel> ={ results: [], totalCount: 0 };

  @observable
  skProfileQuery: SkProfileQueryModel = new SkProfileQueryModel();

  @observable
  studySummary: StudySummary = new StudySummary();

  constructor(skProfileApi: SkProfileApi) {
    this.skProfileApi = skProfileApi;
  }

  registerSkProfile(skProfile: SkProfileModel) {
    //
    this.skProfileApi.registerSkProfile(skProfile);
  }

  @action
  async findSkProfile() {
    //
    const skProfile = await this.skProfileApi.findSkProfile();
    return runInAction(() => this.skProfile = new SkProfileModel(skProfile));
  }

  @action
  async  findSkProfileByAudienceId(audienceId: string) {
    const  skProfile = await  this.skProfileApi.findSkProfileByAudienceId(audienceId);
    return runInAction(() => this.skProfile = new SkProfileModel(skProfile));
  }

  @action
  async  findSkProfileByProfileId(profileId: string) {
    const skProfile = await  this.skProfileApi.findSkProfileByProfileId(profileId);
    return runInAction(() => this.skProfile = new SkProfileModel(skProfile));
  }

  @action
  async findAllSkProfilesBySearchKey() {
    const skProfiles = await this.skProfileApi.findAllSkProfilesBySearchKey(SkProfileQueryModel.asSkProfileRdo(this.skProfileQuery));
    if (skProfiles) {
      skProfiles.results = skProfiles!.results.map(skProfile => new SkProfileModel(skProfile));
      return runInAction(() => this.skProfiles = skProfiles);
    }
    return '';
  }

  @action
  async  findAllSkProfile(offset:number, limit : number) {
    const skProfiles = await  this.skProfileApi.findAllSkProfile(offset, limit);
    if (skProfiles) {
      skProfiles!.results = skProfiles!.results.map(skProfile => new SkProfileModel(skProfile));
      return runInAction(() => this.skProfiles = skProfiles);
    }
    return '';
  }

  modfifySkProfileByProfileId(profileId:string, skProfileUdo : SkProfileUdo) {
    this.skProfileApi.modifySkProfileByProfileId(profileId, skProfileUdo);
  }

  modifySkProfile(skProfileUdo : SkProfileUdo) {
    this.skProfileApi.modifySkProfile(skProfileUdo);
  }

  removeSkProfile(profileId:string) {
    this.skProfileApi.removeSkProfile(profileId);
  }

  @action
  async  findStudySummary() {
    const studySummary = await this.skProfileApi.findStudySummary();
    return runInAction(() => this.studySummary = new StudySummary(studySummary));
  }

  @action
  async  finStudySummaryByProfileId(profileId : string) {
    //profileId skProfile 검색 후 setting 필요한지 테스트 통해서 확인
    const studySummary = await this.skProfileApi.findStudySummaryByProfileId(profileId);
    return runInAction(() => this.studySummary = new StudySummary(studySummary));
  }

  modifyStudySummary(nameValues: NameValueList) {
    return this.skProfileApi.modifyStudySummary(nameValues);
  }

  modifyStudySummaryByProfileId(profileId:string, nameValues : NameValueList) {
    this.skProfileApi.modifyStudySummaryByProfileId(profileId, nameValues);
  }

  @action
  setSkQueryProfileProp(name: string, value: any) {
    this.skProfileQuery = _.set(this.skProfileQuery, name, value);
    if (value instanceof  Date) {
      if (name === 'datePeriod.startDateSub') this.skProfileQuery.datePeriod.startDateSub.setTime(value.getTime());
      if (name === 'datePeriod.endDateSub') this.skProfileQuery.datePeriod.endDateSub.setTime(value.getTime());
    }
  }

  @action
  setSkProfileProp(name:string, value:any) {
    this.skProfile = _.set(this.skProfile, name, value);
  }

  @action
  setStudySummaryProp(name:string, value:any) {
    this.studySummary = _.set(this.studySummary, name, value);
  }

  @action
  setFavoriteJobGroupProp(name:string, value:any) {
    this.skProfile.member.favoriteJobGroup = _.set(this.skProfile.member.favoriteJobGroup, name, value);
  }

  @action
  clearSkProfile() {
    this.skProfile = new SkProfileModel();
  }
}


Object.defineProperty(SkProfileService, 'instance', {
  value: new SkProfileService(SkProfileApi.instance),
  writable: false,
  configurable: false,
});
