import { observable, action, configure, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { NameValueList, OffsetElementList } from '@nara.platform/accent';
import _ from 'lodash';
import { SkProfileModel } from '../../model/SkProfileModel';
import SkProfileApi from '../apiclient/SkProfileApi';
import { SkProfileQueryModel } from '../../model/SkProfileQueryModel';
import { StudySummaryCdoModel } from '../../model/StudySummaryCdoModel';



configure({
  enforceActions: 'observed',
});

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
  studySummary:StudySummaryCdoModel = new StudySummaryCdoModel();


  constructor(skProfileApi: SkProfileApi) {
    this.skProfileApi = skProfileApi;
  }

  registerSkProfile(skProfile: SkProfileModel) {
    //
    this.skProfileApi.registerSkProfile(skProfile);
  }

  registerStudySummary(studySummary : StudySummaryCdoModel) {
    this.skProfileApi.registerStudySummary(studySummary);
  }

  @action
  async findStudySummary(memberId: string) {
    const studySummary = await  this.skProfileApi.findStudySummary(memberId);
    return runInAction(() => this.studySummary = studySummary);
  }

  @action
  async findSkProfile(memberId: string) {
    //
    const skProfile = await this.skProfileApi.findSkProfile(memberId);
    return runInAction(() => this.skProfile = skProfile);
  }

  @action
  async findAllSkProfiles() {
    const skProfiles = await this.skProfileApi.findAllSkProfiles(SkProfileQueryModel.asSkProfileRdo(this.skProfileQuery));
    return runInAction(() => this.skProfiles = skProfiles);
  }

  removeProfile(memberId:string) {
    return this.skProfileApi.removeSkProfile(memberId);
  }

  modifySkProfile(memberId:string, nameValues:NameValueList) {
    return this.skProfileApi.modifySkProfile(memberId, nameValues);
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
  setStudySummaryProp(name:string, value:any) {
    this.studySummary = _.set(this.studySummary, name, value);
  }

  @action
  setFavoriteLearningType(name:string, value:any) {
    this.studySummary.favoriteLearningType = _.set(this.studySummary.favoriteLearningType, name, value);
  }

  @action
  setFavoriteJobGroupProp(name:string, value:any) {
    this.skProfile.favoriteJobGroup = _.set(this.skProfile.favoriteJobGroup, name, value);
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
