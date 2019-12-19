
import { observable, action, computed, runInAction } from 'mobx';
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

  @action
  async findLectureCountByCollegeId(collegeId: string) {
    //
    const lectureCountList = await this.lectureApi.findLectureCountByCollegeId(collegeId);
    const channels = lectureCountList
      .filter((lectureCount) => lectureCount.lectureCount > 0)
      .map((lectureCount) => new ChannelModel({
        id: lectureCount.channel.id,
        name: lectureCount.channel.name,
        channelId: lectureCount.channel.id,
        checked: true,
      }));

    runInAction(() => this._channels = channels);
    return channels;
  }
}

LectureCountService.instance = new LectureCountService(LectureApi.instance);

export default LectureCountService;
