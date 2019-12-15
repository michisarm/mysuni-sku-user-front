import { action, configure, observable, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { IdNameList } from 'shared';
import CollegeApi from '../apiclient/CollegeApi';
import { CollegeModel } from '../../model/CollegeModel';
import { JobGroupModel } from '../../model/JobGroupModel';
import { ChannelViewModel } from '../../model/ChannelViewModel';

configure({
  enforceActions: 'observed',
});

@autobind
export default class CollegeService {
  //
  static instance: CollegeService;

  collegeApi: CollegeApi;

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
  selectChannels: ChannelViewModel [] = [];

  @observable
  favoriteChannels : ChannelViewModel [] = [];

  constructor(collegeApi: CollegeApi) {
    this.collegeApi = collegeApi;
  }

  @action
  async findCollege(collegeId: string) {
    //
    const college = await this.collegeApi.findCollege(collegeId);
    if (college) return runInAction(() => this.college = new CollegeModel(college));
    return null;
  }

  @action
  async findAllColleges() {
    //
    const colleges = await this.collegeApi.findAllColleges();
    return runInAction(() => this.colleges = colleges);
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
  setChannels() {
    const channels = this.college.channels;

    this.selectChannels = [];

    channels.map((channel) => {
      this.selectChannels.push({ channelId: channel.id, name: channel.name, checked: false });
    });
  }

  @action
  selectChannel(channelId: string, name:string, checked: boolean) {

    this.selectChannels.filter((channel) => {
      if (channel.channelId === channelId) channel.checked = checked;
    });

    if (checked) this.favoriteChannels.push({ channelId, name, checked });
    else this.favoriteChannels = this.favoriteChannels.filter(channel => channel.channelId !== channelId);
  }

  @action
  deselectChannel(channelId : string) {
    this.selectChannels.filter((channel) => {
      if (channel.channelId === channelId) channel.checked = false;
    });

    this.favoriteChannels = this.favoriteChannels.filter(channel => channel.channelId !== channelId);
  }

  @action
  setFavoriteChannel() {
    const selectChannels = this.selectChannels;

    selectChannels.map((channel) => {
      if (channel.checked) this.favoriteChannels.push(channel);
    });
  }

  @action
  getFavoriteChannels() : IdNameList {
    const list : IdNameList = new IdNameList();
    this.favoriteChannels.map((channel) => {
      list.idNames.push({ id: channel.channelId, name: channel.name });
    });
    return list;
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

}

Object.defineProperty(CollegeService, 'instance', {
  value: new CollegeService(CollegeApi.instance),
  writable: false,
  configurable: false,
});
