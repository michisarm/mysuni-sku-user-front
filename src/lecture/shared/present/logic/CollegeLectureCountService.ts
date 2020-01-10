
import { IObservableArray, action, computed, observable, runInAction } from 'mobx';
import { autobind, CachingFetch } from '@nara.platform/accent';

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

  collegeLectureCountsCachingFetch: CachingFetch = new CachingFetch();

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
    const fetched = this.collegeLectureCountsCachingFetch.fetch(
      () => this.lectureFlowApi.findCollegeLectureCount(),
      (collegeLectureCounts) => runInAction(() => this._collegeLectureCounts = collegeLectureCounts),
    );

    return fetched ? this.collegeLectureCountsCachingFetch.inProgressFetching : this.collegeLectureCounts;
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
