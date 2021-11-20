import {
  IObservableArray,
  action,
  computed,
  observable,
  runInAction,
} from 'mobx';
import { autobind, IdName } from '@nara.platform/accent';
import CollegeLectureCountRdo from '../../../model/CollegeLectureCountRdo';
import { findAvailableColleges } from '../../../../college/api/collegeApi';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';

@autobind
class CollegeLectureCountService {
  static instance: CollegeLectureCountService;

  @observable
  private _collegeLectureCounts: CollegeLectureCountRdo[] = [];

  @observable
  private _channelCounts: IdName[] = [];

  @observable
  private _categoryColleges: CollegeLectureCountRdo[] = [];

  @computed
  get collegeLectureCounts() {
    return (this._collegeLectureCounts as IObservableArray).peek();
  }

  @computed
  get channelCounts() {
    return (this._channelCounts as IObservableArray).peek();
  }

  @computed get categoryColleges() {
    return this._categoryColleges;
  }

  @computed
  get totalChannelCount() {
    let total = 0;
    this._collegeLectureCounts.map((college) => {
      total += college.channelIds.length;
    });
    return total;
  }

  //@Deprecated
  // getCollegesByChannelName(name: string) {
  //   return this._collegeLectureCounts.map((college) => {
  //     const selectedChannels = college.channels.filter((channel) =>
  //       parsePolyglotString(
  //         channel.name,
  //         getDefaultLang(channel.langSupports)
  //       ).includes(name)
  //     );
  //     return selectedChannels.length > 0 ? college : null;
  //   });
  // }

  @action
  clearAll() {
    runInAction(() => (this._collegeLectureCounts = []));
    runInAction(() => (this._channelCounts = []));
  }

  @action
  async findCollegeLectureCounts() {
    const collegeLectureCounts = await findAvailableColleges();
    if (collegeLectureCounts !== undefined) {
      runInAction(() => (this._collegeLectureCounts = collegeLectureCounts));
    }
    return this.collegeLectureCounts;
  }

  @action setCollegeLectureCounts(
    collegeLectureCounts: CollegeLectureCountRdo[]
  ) {
    this._collegeLectureCounts = collegeLectureCounts;
  }

  @action
  setChannelCounts(channelsCounts: IdName[]) {
    runInAction(() => (this._channelCounts = channelsCounts));
    return channelsCounts;
  }

  @action
  setCategoryColleges(categoryColleges: CollegeLectureCountRdo[]) {
    this._categoryColleges = categoryColleges;
  }
}

export default CollegeLectureCountService;

Object.defineProperty(CollegeLectureCountService, 'instance', {
  value: new CollegeLectureCountService(),
  writable: false,
  configurable: false,
});
