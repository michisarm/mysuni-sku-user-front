import { IObservableArray, observable, action, runInAction, computed } from 'mobx';
import { autobind } from '@nara.platform/accent';
import _ from 'lodash';
import { IdNameList } from 'shared';
import CollegeApi from '../apiclient/CollegeApi';
import ChannelApi from '../apiclient/ChannelApi';
import { CollegeModel } from '../../model/CollegeModel';
import { JobGroupModel } from '../../model/JobGroupModel';
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
  colleges: CollegeModel[] = [];

  @observable
  mainCollege: CollegeModel = new CollegeModel();

  @observable
  subCollege: CollegeModel = new CollegeModel();

  @observable
  jobGroups: JobGroupModel[] = [];

  @observable
  jobGroup: JobGroupModel = new JobGroupModel();

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


  constructor(collegeApi: CollegeApi = CollegeApi.instance, channelApi: ChannelApi = ChannelApi.instance) {
    this.collegeApi = collegeApi;
    this.channelApi = channelApi;
  }

  @computed
  get channels() {
    //
    const channels = this._channels as IObservableArray;
    return channels ? channels.peek() : [];
  }

  @action
  async findCollege(collegeId: string) {
    //
    const college = await this.collegeApi.findCollege(collegeId);
    if (college) {
      return runInAction(() => {
        this.college = new CollegeModel(college);
        return this.college;
      });
    }
    return undefined;
  }

  @action
  async findAllColleges() {
    //
    const colleges = await this.collegeApi.findAllColleges();
    return runInAction(() => this.colleges = colleges);
  }

  @action
  setCollege(colege: CollegeModel) {
    this.college = colege;
  }

  @action
  clearCollege() {
    //
    this.college = new CollegeModel();
  }

  @action
  async findAllJobGroups() {
    const jobGroups = await this.collegeApi.findAllJobGroups();
    return runInAction(() => this.jobGroups = jobGroups);
  }

  @action
  async findJobGroupById(jobGroupId: string) {
    const jobGroup = await this.collegeApi.findJobGroupById(jobGroupId);
    return runInAction(() => this.jobGroup = new JobGroupModel(jobGroup));
  }

  @action
  async findMainCollege(collegeId: string) {
    //
    const college = await this.collegeApi.findCollege(collegeId);
    if (college) return runInAction(() => this.mainCollege = new CollegeModel(college));
    return null;
  }

  @action
  async findSubCollege(collegeId: string) {
    //
    const college = await this.collegeApi.findCollege(collegeId);
    if (college) return runInAction(() => this.subCollege = new CollegeModel(college));
    return null;
  }

  @action
  clearMainCollege() {
    //
    this.mainCollege = new CollegeModel();
    // this.College = {} as CollegeModel;
  }

  @action
  clearSubCollege() {
    //
    this.subCollege = new CollegeModel();
    // this.College = {} as CollegeModel;
  }

  // Panopto ----------------------------------------------------------------------------------------------------------

  @action
  clearCollegeForPanopto() {
    //
    this.collegeForPanopto = new CollegeModel();
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
    if (channels && channels.length > 0) {
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
      this.college.channels.push({ ...channel, id: channel.id, channelId: channel.id, name: channel.name, checked: false });
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
  // Channel -----------------------------------------------------------------------------------------------------------

  @action
   async findAllChannel() {
     const channels = await this.channelApi.findAllChannel();
     runInAction(() => this._channels = channels.map(channel => new ChannelModel(channel)));
   }

  @action
  async findChannelById(channelId: string) {
    const channel = await this.channelApi.findChannel(channelId);
    runInAction(() => this.channel = new ChannelModel(channel));
  }

  //channel 이름 검색 추가
  @action
  async  findChannelByName(name:string) {
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
      this.college = new CollegeModel(college);
      const channel = this.college.channels
        .find((channel) => channel.id === channelId);

      if (channel) {
        this.channel = new ChannelModel(channel);
      }
    });
  }

  @computed
  get favoriteChannelIdNames() : IdNameList {
    const list : IdNameList = new IdNameList();
    this.favoriteChannels.map((channel) => {
      list.idNames.push({ id: channel.id, name: channel.name, active: false });
    });
    return list;
  }
}

Object.defineProperty(CollegeService, 'instance', {
  value: new CollegeService(CollegeApi.instance, ChannelApi.instance),
  writable: false,
  configurable: false,
});
