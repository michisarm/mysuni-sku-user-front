
import { IObservableArray, action, computed, observable, runInAction } from 'mobx';
import { autobind, CachingFetch } from '@nara.platform/accent';

import { IdNameCount } from 'shared/model';
import LectureFlowApi from '../apiclient/LectureFlowApi';
import CollegeLectureCountRdo from '../../../model/CollegeLectureCountRdo';


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
    return (this._collegeLectureCounts as IObservableArray).peek();
  }

  @computed
  get channelCounts() {
    return (this._channelCounts as IObservableArray).peek();
  }

  @computed
  get totalChannelCount() {
    let total = 0;
    this._collegeLectureCounts.map(college => {
      total += college.channelCounts.length;
    });
    return total;
  }

  getCollegesByChannelName(name: string) {
    return this._collegeLectureCounts
      .map(college => {
        const selectedChannels = college.channelCounts.filter(channel => channel.name.includes(name));
        return selectedChannels.length > 0 ? college : null;
      });
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

    if (this._collegeLectureCounts.length > 0) {
      sessionStorage.setItem('category', JSON.stringify(this.collegeLectureCounts));
    }

    return fetched ? this.collegeLectureCountsCachingFetch.inProgressFetching : this.collegeLectureCounts;

    // const category = sessionStorage.getItem('category');
    // if (category !== null) {
    //   // this._collegeLectureCounts = JSON.parse(category);
    //   runInAction(() => this._collegeLectureCounts = JSON.parse(category));
    //   return this.collegeLectureCountsCachingFetch.inProgressFetching;
    // } else {
    //   const fetched = this.collegeLectureCountsCachingFetch.fetch(
    //     () => this.lectureFlowApi.findCollegeLectureCount(),
    //     (collegeLectureCounts) => runInAction(() => this._collegeLectureCounts = collegeLectureCounts),
    //   );
    //
    //   if (this._collegeLectureCounts.length > 0) {
    //     sessionStorage.setItem('category', JSON.stringify(this._collegeLectureCounts));
    //   }
    //
    //   return fetched ? this.collegeLectureCountsCachingFetch.inProgressFetching : this.collegeLectureCounts;
    // }
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
