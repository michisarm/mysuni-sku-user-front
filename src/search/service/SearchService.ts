import { autobind } from '@nara.platform/accent';
import { action, observable } from 'mobx';
import SearchInfoModel from '../model/SeachInfoModel';
import _ from 'lodash';

@autobind
class SearchService {
  //
  static instance: SearchService;

  constructor() {
    //
  }

  @observable
  searchInfo: SearchInfoModel = new SearchInfoModel();

  @action
  setSearchInfoValue(name: string, value: any): void {
    //
    this.searchInfo = _.set(this.searchInfo, name, value);
  }

  @action
  clearSearchInfo(): void {
    //
    this.searchInfo = new SearchInfoModel();
  }

  @observable
  searchViewFocused: boolean = false;

  @action
  setFocusedValue(value: boolean): void {
    //
    this.searchViewFocused = value;
  }
}

SearchService.instance = new SearchService();
export default SearchService;
