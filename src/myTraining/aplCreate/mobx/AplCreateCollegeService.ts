import { autobind } from '@nara.platform/accent';
import { action, computed, observable } from 'mobx';

@autobind
export default class AplCreateCollegeService {
  static instance: AplCreateCollegeService;

  @observable private _collegeOptions: any = [];

  @computed get collegeOptions() {
    return this._collegeOptions;
  }

  @action setCollegeOptions(next: any) {
    this._collegeOptions = next;
  }

  @observable private _channelOptions: any = [];

  @computed get channelOptions() {
    return this._channelOptions;
  }

  @action setChannelOptions(next: any) {
    this._channelOptions = next;
  }
}

Object.defineProperty(AplCreateCollegeService, 'instance', {
  value: new AplCreateCollegeService(),
  writable: false,
  configurable: false,
});
