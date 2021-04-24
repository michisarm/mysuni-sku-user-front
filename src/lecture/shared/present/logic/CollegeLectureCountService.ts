import {
  IObservableArray,
  action,
  computed,
  observable,
  runInAction,
} from 'mobx';
import { autobind, CachingFetch, IdName } from '@nara.platform/accent';

import { IdNameCount } from 'shared/model';
import LectureFlowApi from '../apiclient/LectureFlowApi';
import CollegeLectureCountRdo from '../../../model/CollegeLectureCountRdo';
import { findAvailableColleges } from '../../../../college/api/collegeApi';

@autobind
class CollegeLectureCountService {
  //
  static instance: CollegeLectureCountService;

  private lectureFlowApi: LectureFlowApi;

  @observable
  _collegeLectureCounts: CollegeLectureCountRdo[] = [];

  collegeLectureCountsCachingFetch: CachingFetch = new CachingFetch();

  @observable
  _channelCounts: IdName[] = [];

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
    console.log('channelCounts', this._channelCounts);
    return (this._channelCounts as IObservableArray).peek();
  }

  @computed
  get totalChannelCount() {
    let total = 0;
    this._collegeLectureCounts.map(college => {
      total += college.channels.length;
    });
    return total;
  }

  getCollegesByChannelName(name: string) {
    return this._collegeLectureCounts.map(college => {
      const selectedChannels = college.channels.filter(channel =>
        channel.name.includes(name)
      );
      return selectedChannels.length > 0 ? college : null;
    });
  }

  @action
  clearAll() {
    //
    runInAction(() => (this._collegeLectureCounts = []));
    runInAction(() => (this._channelCounts = []));
  }

  // CollegeLectureCounts ----------------------------------------------------------------------------------------------

  @action
  async findCollegeLectureCounts() {
    const collegeLectureCounts = await findAvailableColleges();
    if (collegeLectureCounts !== undefined) {
      sessionStorage.setItem('category', JSON.stringify(collegeLectureCounts));
      runInAction(() => (this._collegeLectureCounts = collegeLectureCounts));
    }
    return this.collegeLectureCounts;
  }

  // ChannelCounts -----------------------------------------------------------------------------------------------------

  @action
  async setChannelCounts(channelsCounts: IdName[]) {
    //
    runInAction(() => (this._channelCounts = channelsCounts));
    return channelsCounts;
  }
}

CollegeLectureCountService.instance = new CollegeLectureCountService(
  LectureFlowApi.instance
);

export default CollegeLectureCountService;
