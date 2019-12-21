
import { observable, action, computed, runInAction } from 'mobx';
import _ from 'lodash';
import { ChannelModel } from 'college';
import { LectureApi } from '../../../shared';


class LectureCountService {
  //
  static instance: LectureCountService;

  private lectureApi: LectureApi;

  @observable
  _channels: ChannelModel[] = [];


  constructor(lectureApi: LectureApi = LectureApi.instance) {
    this.lectureApi = lectureApi;
  }

  @computed
  get channels() {
    //
    const channels = this._channels as any;
    return channels.peek();
  }

  @computed
  get allSelected() {
    return this._channels.every((channel) => channel.checked);
  }

  @action
  async findLectureCountByCollegeId(collegeId: string, channels: ChannelModel[]) {
    //
    const lectureCountList = await this.lectureApi.findLectureCountByChannels(collegeId, channels);
    const filteredChannels = lectureCountList
      .filter((lectureCount) => lectureCount.lectureCount > 0)
      .map((lectureCount) => new ChannelModel({
        id: lectureCount.channelId,
        name: channels.find((channel) => channel.id === lectureCount.channelId)!.name,
        channelId: lectureCount.channelId,
        checked: true,
      }));
    runInAction(() => this._channels = filteredChannels);
    return channels;
  }

  @action
  setChannelsProp(index: number, name: string, value: any) {
    this._channels[index] = _.set(this._channels[index], name, value);
  }
}

LectureCountService.instance = new LectureCountService(LectureApi.instance);

export default LectureCountService;
