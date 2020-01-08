
import { IObservableArray, action, computed, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';

import { IdNameCount } from 'shared';
import LectureFlowApi from '../apiclient/LectureFlowApi';
import CollegeLectureCountRdo from '../../model/CollegeLectureCountRdo';


@autobind
class CollegeLectureCountService {
  //
  static instance: CollegeLectureCountService;

  private lectureFlowApi: LectureFlowApi;


  @observable
  _collegeLectureCounts: CollegeLectureCountRdo[] = [];

  @observable
  _channelCounts: IdNameCount[] = [];


  constructor(lectureFlowApi: LectureFlowApi) {
    this.lectureFlowApi = lectureFlowApi;
  }

  @computed
  get collegeLectureCounts() {
    //
    const collegeLectureCounts = this._collegeLectureCounts as IObservableArray;
    return collegeLectureCounts.peek();
  }

  @computed
  get channelCounts() {
    const channelsCounts = this._channelCounts as IObservableArray;
    return channelsCounts.peek();
  }


  @action
  clearAll() {
    //
    runInAction(() => this._collegeLectureCounts = []);
    runInAction(() => this._channelCounts = []);
  }

  // CollegeLectureCounts ----------------------------------------------------------------------------------------------

  @action
  async findCollegeLectureCounts() {
    //
    const collegeLectureCounts  = await this.lectureFlowApi.findCollegeLectureCount();

    runInAction(() => {
      this._collegeLectureCounts = collegeLectureCounts;
    });
    return collegeLectureCounts;
  }

  // ChannelCounts -----------------------------------------------------------------------------------------------------

  @action
  async setChannelCounts(channelsCounts: IdNameCount[]) {
    //
    runInAction(() => this._channelCounts = channelsCounts);
    return channelsCounts;
  }
}

CollegeLectureCountService.instance = new CollegeLectureCountService(LectureFlowApi.instance);

export default CollegeLectureCountService;
