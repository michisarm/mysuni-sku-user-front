
import { IObservableArray, observable, action, runInAction, computed } from 'mobx';
import { autobind, CachingFetch, axiosApi as axios } from '@nara.platform/accent';

import _ from 'lodash';
import { IdNameList } from 'shared/model';
import CollegeApi from '../apiclient/CollegeApi';
import ChannelApi from '../apiclient/ChannelApi';
import { CollegeModel } from '../../model/CollegeModel';
import ChannelModel from '../../model/ChannelModel';


@autobind
export default class CollegeService {
  //
  static instance: CollegeService;

  collegeApi: CollegeApi;
  channelApi: ChannelApi;

  @observable
  college: CollegeModel = new CollegeModel();

  @observable
  _colleges: CollegeModel[] = [];

  collegesCachingFetch: CachingFetch = new CachingFetch();

  @observable
  _channels: ChannelModel[] = [];

  @observable
  favoriteChannels : ChannelModel [] = [];

  @observable
  channel: ChannelModel = new ChannelModel();

  @observable
  collegesForPanopto: CollegeModel[] = [];

  @observable
  collegeForPanopto: CollegeModel = new CollegeModel();

  @observable
  mainCollege: CollegeModel = new CollegeModel();

  @observable
  mainColleges: CollegeModel[] = [];

  @observable
  banner: any[] = [];

  constructor(collegeApi: CollegeApi = CollegeApi.instance, channelApi: ChannelApi = ChannelApi.instance) {
    this.collegeApi = collegeApi;
    this.channelApi = channelApi;
  }

  @computed
  get colleges(): CollegeModel[] {
    //
    const colleges = this._colleges as IObservableArray;
    return colleges ? colleges.peek() : [];
  }

  @computed
  get channels(): ChannelModel[] {
    //
    const channels = this._channels as IObservableArray;
    return channels ? channels.peek() : [];
  }

  @computed
  get channelIds(): string[] {
    //
    return this.channels.map(channel => channel.channelId);
  }

  @computed
  get favoriteChannelIdNames() : IdNameList {
    const list : IdNameList = new IdNameList();
    this.favoriteChannels.map((channel) => {
      list.idNames.push({ id: channel.id, name: channel.name, active: false });
    });
    return list;
  }

  @computed
  get channelMap() {
    const map = new Map<string, ChannelModel>();
    this._channels.map(channel => map.set(channel.channelId, channel));
    return map;
  }

  @computed
  get totalChannelCount() {
    let total = 0;
    this._colleges.map(college => {
      total += college.channels.length;
    });
    return total;
  }

  // College -----------------------------------------------------------------------------------------------------------

  @action
  clearCollege() {
    //
    this.college = new CollegeModel();
  }

  @action
  async findCollege(collegeId: string) {
    //
    const college = await this.collegeApi.findCollege(collegeId);

    if (!college) {
      return undefined;
    }
    runInAction(() => this.college = college);
    return college;
  }

  @action
  setCollege(college: CollegeModel) {
    this.college = college;
  }

  // Colleges ----------------------------------------------------------------------------------------------------------

  @action
  async findAllColleges() {
    //
    const fetched = this.collegesCachingFetch.fetch(
      () => this.collegeApi.findAllColleges(),
      (colleges) => runInAction(() => this._colleges = colleges),
    );

    return fetched ? this.collegesCachingFetch.inProgressFetching : this.colleges;
  }

  // Panopto ----------------------------------------------------------------------------------------------------------

  @action
  clearCollegeForPanopto() {
    //
    this.collegeForPanopto = new CollegeModel();
  }

  @action
  async findAllCollegesForPanopto() {
    //
    const colleges = await this.collegeApi.findAllCollegesForCreate();
    return runInAction(() => this.collegesForPanopto = colleges);
  }

  @action
  setCollegeForPanopto(selectedCollege: CollegeModel) {
    //
    this.collegeForPanopto = selectedCollege;
  }

  // Channels ----------------------------------------------------------------------------------------------------------

  @action
  setChannels(channels?: ChannelModel[]) {
    //
    if (channels) {
      this._channels = channels.map((channel) => new ChannelModel(channel));
    }
  }

  @action
  setChannelsProp(index: number, name: string, value: any) {
    this._channels[index] = _.set(this._channels[index], name, value);
  }

  // Other Channels ----------------------------------------------------------------------------------------------------

  @action
  setSelectChannels() {
    const channels = this.college.channels;

    channels.map((channel) => {
      this.college.channels.push(new ChannelModel({ ...channel, id: channel.id, channelId: channel.id, name: channel.name, checked: false }));
    });
  }

  @action
  setFavoriteChannel() {
    this.college.channels.map((channel) => {
      if (channel.checked) this.favoriteChannels.push(channel);
    });
  }

  @action
  clearFavoriteChannels() {
    this.favoriteChannels = [];
  }

  // Channels ----------------------------------------------------------------------------------------------------------

  @action
  async findAllChannel() {
    const channels = await this.channelApi.findAllChannel();
    runInAction(() => this._channels = channels.map(channel => new ChannelModel(channel)));
  }

  @action
  async findChannels(collegeId: string) {
    //
    const college = await this.collegeApi.findCollege(collegeId);
    const channels = college.channels.map(channel => new ChannelModel(channel));

    runInAction(() => this._channels = channels);
    return channels;
  }

  @action
  async findChannelById(channelId: string) {
    const channel = await this.channelApi.findChannel(channelId);
    runInAction(() => this.channel = new ChannelModel(channel));
  }

  //channel 이름 검색 추가
  @action
  async findChannelByName(name:string) {
    const channels = await this.channelApi.findChannelByName(name);
    runInAction(() => this._channels = channels.map(channel => new ChannelModel(channel)));
  }

  @action
  async findCollegeAndChannel(collegeId: string, channelId: string) {
    //
    const college = await this.collegeApi.findCollege(collegeId);

    if (!college) {
      return null;
    }
    return runInAction(() => {
      this.college = college;
      const channel = this.college.channels
        .find((channel) => channel.id === channelId);

      if (channel) {
        this.channel = new ChannelModel(channel);
      }
    });
  }

  @action
  async findCollegesForCurrentCineroom() {
    //
    // const colleges = await this.collegeApi.findAllColleges();
    const mainColleges = await this.collegeApi.findCollegesForCurrentCineroom();
    return runInAction(() => this.mainColleges = mainColleges);
  }

  @action
  async findMainCollege(collegeId: string) {
    //
    const mainCollege = await this.collegeApi.findCollege(collegeId);
    if (mainCollege) return runInAction(() => this.mainCollege = new CollegeModel(mainCollege));
    return null;
  }


  @action
  async getBanner() {
    const banner = await this.collegeApi.getBanner();
    if(banner) return runInAction(() => this.banner = banner);
  }

}

Object.defineProperty(CollegeService, 'instance', {
  value: new CollegeService(CollegeApi.instance, ChannelApi.instance),
  writable: false,
  configurable: false,
});
