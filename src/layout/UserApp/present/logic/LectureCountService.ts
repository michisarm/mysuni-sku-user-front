
import { observable, action, computed, runInAction } from 'mobx';
import _ from 'lodash';
import { ChannelModel } from 'college';
import LectureApi from '../apiclient/LectureApi';
import ChannelCountRdo from '../../model/ChannelCountRdo';


class LectureCountService {
  //
  static instance: LectureCountService;

  private lectureApi: LectureApi;

  @observable
  _channels: ChannelCountRdo[] = [];


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
  get collegeLectureCount() {
    //
    if (this._channels.length > 0) {
      return this._channels.reduce((prev, current) => prev + current.lectureCount, 0);
    }
    else {
      return 0;
    }
  }

  @action
  clear() {
    //
    this._channels = [];
  }

  @action
  async findLectureCountByCollegeId(collegeId: string, channels: ChannelModel[]) {
    //
    const lectureCountList = await this.lectureApi.findLectureCountByChannels(collegeId, channels);

    const filteredChannels = lectureCountList
      .map((lectureCount) => new ChannelCountRdo(lectureCount));

    runInAction(() => this._channels = filteredChannels);
    return filteredChannels;
  }

  @action
  setChannelsProp(index: number, name: string, value: any) {
    this._channels[index] = _.set(this._channels[index], name, value);
  }
}

LectureCountService.instance = new LectureCountService(LectureApi.instance);

export default LectureCountService;
