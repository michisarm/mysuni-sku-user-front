import { autobind } from "@nara.platform/accent";
import { observable, computed, action } from "mobx";

@autobind
class FilterBoxService {
  static instance: FilterBoxService;

  @observable
  private _filterCount: number = 0;

  @computed get filterCount() {
    return this._filterCount;
  }

  @action
  setFilterCount(next: number) {
    this._filterCount = next;
  }

  @observable
  private _openFilter: boolean = false;

  @computed get openFilter() {
    return this._openFilter;
  }

  @action
  setOpenFilter(next: boolean) {
    this._openFilter = next;
  }

  @action
  toggleOpenFilter() {
    this._openFilter = !this._openFilter;
  }

  @action
  clearFilterBox() {
    this._filterCount = 0;
    this._openFilter = false;
  }
}

export default FilterBoxService;

Object.defineProperty(FilterBoxService, 'instance', {
  value: new FilterBoxService(),
  writable: false,
  configurable: false,
})