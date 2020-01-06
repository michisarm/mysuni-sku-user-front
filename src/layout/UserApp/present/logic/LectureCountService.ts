
import { observable, action, computed, runInAction } from 'mobx';
import _ from 'lodash';
import { CollegeModel, ChannelModel } from 'college';
import LectureApi from '../apiclient/LectureApi';
import ChannelCountRdo from '../../model/ChannelCountRdo';
import CollegeCountModel from '../../model/CollegeCountModel';


class LectureCountService {
  //
  static instance: LectureCountService;

  private lectureApi: LectureApi;

  @observable
  _channels: ChannelCountRdo[] = [];

  @observable
  _collegeCountList: CollegeCountModel[] = [];


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

  @computed
  get collegeCountList() {
    //
    const collegeCountList = this._collegeCountList as any;
    return collegeCountList.peek();
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


  @action
  async findCollegesCount(colleges: CollegeModel[]) {
    //
    const promises = colleges.map((college) =>
      this.lectureApi.findLectureCountByChannels(college.collegeId, college.channels)
    );
    const responseCollegeCountList = await Promise.all(promises);

    const collegeCountList = responseCollegeCountList.map((channelCountList, index) => (
      new CollegeCountModel({
        collegeId: colleges[index].collegeId,
        name: colleges[index].name,
        lectureCount: channelCountList.reduce((prev, channelCount) => prev + channelCount.lectureCount, 0),
        channelCountList,
      })
    ));

    runInAction(() => this._collegeCountList = collegeCountList);
    return collegeCountList;
  }

  getCollegeCount(collegeId: string) {
    //
    const collegeCount = this._collegeCountList.find((collegeCount) => collegeCount.collegeId === collegeId);

    if (!collegeCount) {
      return 0;
    }
    return collegeCount.lectureCount;
  }
}

LectureCountService.instance = new LectureCountService(LectureApi.instance);

export default LectureCountService;
