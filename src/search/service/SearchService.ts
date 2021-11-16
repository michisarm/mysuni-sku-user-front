import { autobind } from '@nara.platform/accent';
import { action, observable, runInAction } from 'mobx';
import SearchInfoModel from '../model/SeachInfoModel';
import _ from 'lodash';
import { searchAutoComplete } from '../api/searchApi';

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

  @observable
  autoCompleteValues: string[] = [];

  @action
  async findAutoCompleteValues(value: string): Promise<void> {
    //
    const values = await searchAutoComplete(value);
    runInAction(() => {
      if (values.error) {
        this.autoCompleteValues = [];
      } else {
        // 최대 10개만 보여줌
        this.autoCompleteValues =
          values?.suggestions?.flat(Infinity).slice(0, 10) || [];
      }
    });
  }

  @action
  clearAutoCompleteValues(): void {
    //
    this.autoCompleteValues = [];
  }
}

SearchService.instance = new SearchService();
export default SearchService;
