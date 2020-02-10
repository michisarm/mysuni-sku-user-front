
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

  @action
  setStudySummaryProp(name:string, value:any) {
    this.studySummary = _.set(this.studySummary, name, value);
  }
}

Object.defineProperty(SkProfileService, 'instance', {
  value: new SkProfileService(SkProfileApi.instance),
  writable: false,
  configurable: false,
});

export default SkProfileService;
