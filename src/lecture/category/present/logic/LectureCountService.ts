
import { IObservableArray, observable, action, computed, runInAction } from 'mobx';
import _ from 'lodash';
import { ChannelModel } from 'college/model';
import LectureApi from '../../../shared/present/apiclient/LectureApi';
import ChannelCountRdo from '../../../../layout/UserApp/model/ChannelCountRdo';


class LectureCountService {
  //
  static instance: LectureCountService;

  private lectureApi: LectureApi;

  @observable
  _channels: ChannelModel[] = [];

  @observable
  _channelLectureCounts: ChannelCountRdo[] = [];

  @observable
  _categoryType: string = 'CollegeLectures' || 'ChannelsLectures';

  constructor(lectureApi: LectureApi = LectureApi.instance) {
    this.lectureApi = lectureApi;
  }

  @computed
  get channels() {
    //
    const channels = this._channels as IObservableArray;
    return channels.peek();
  }

  @computed
  get categoryType() {
    return this._categoryType;
  }

  @computed
  get allSelected() {
    return this._channels.every((channel) => channel.checked);
  }


  @computed
  get channelLectureCounts() {
    //
    const channelLectureCounts = this._channelLectureCounts as IObservableArray;
    return channelLectureCounts.peek();
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
        checked: false,
      }));

    runInAction(() => {
      this._channels = filteredChannels;
      this._channelLectureCounts = lectureCountList
        .map((lectureCount) => new ChannelCountRdo(lectureCount));
      return channels;
    });

  }

  @action
  setChannelsProp(index: number, name: string, value: any)
  {
    this._channels[index] = _.set(this._channels[index], name, value);

    // channel이 모두 체크이거나, 모두 체크해제인 경우 College Lectures 목록 보여줌.
    if (this._channels.every((channel) => channel.checked) || this._channels.every((channel) => !channel.checked))
    {
      this._categoryType = 'CollegeLectures';
    }
    // Channel을 개별 선택시   Channel 별 Lecture 목록을 보여줌.
    else
    {
      this._categoryType = 'ChannelsLectures';
    }
  }

  @action
  setCategoryType(categoryType: string)
  {
    this._categoryType = categoryType;
  }

}

LectureCountService.instance = new LectureCountService(LectureApi.instance);

export default LectureCountService;
