
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
    // alert('CollegeLectureCountService');
    const category = sessionStorage.getItem('category');
    if (category !== null) {
      this._collegeLectureCounts = JSON.parse(category);
      return this.collegeLectureCountsCachingFetch.inProgressFetching;
    } else {
      const fetched = this.collegeLectureCountsCachingFetch.fetch(
        () => this.lectureFlowApi.findCollegeLectureCount(),
        (collegeLectureCounts) => runInAction(() => this._collegeLectureCounts = collegeLectureCounts),
      );

      if (this._collegeLectureCounts.length > 0) {
      //   for(let i = 0; i < this._collegeLectureCounts.length; i++) {
      //     let totalCount = 0;
      //
      //     for(let j = 0; j < this._collegeLectureCounts[i].channelCounts.length; j++) {
      //       totalCount += this._collegeLectureCounts[i].channelCounts[j].count;
      //     }
      //
      //     this._collegeLectureCounts[i].totalCount = totalCount;
      //   }

        console.log('JSON.stringify(this._collegeLectureCounts) : ', JSON.stringify(this._collegeLectureCounts));

        sessionStorage.setItem('category', JSON.stringify(this._collegeLectureCounts));
      }

      return fetched ? this.collegeLectureCountsCachingFetch.inProgressFetching : this.collegeLectureCounts;
    }
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
