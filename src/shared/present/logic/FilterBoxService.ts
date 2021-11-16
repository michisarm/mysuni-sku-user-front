import { autobind } from '@nara.platform/accent';
import { LectureApi } from 'lecture';
import { action, computed, observable, runInAction } from 'mobx';
import FilterViewModel from 'myTraining/model/filter/FilterViewModel';
import { getParsingLearningType } from 'myTraining/model/filter/ParsingLearningType';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';
import {
  FilterCondition,
  initialCondition,
} from '../../../myTraining/model/FilterCondition';

@autobind
class FilterBoxService {
  static instance: FilterBoxService;

  private lectureApi: LectureApi;

  constructor(lectureApi: LectureApi) {
    this.lectureApi = lectureApi;
  }

  @observable
  private _conditions: FilterCondition = initialCondition;

  @computed get conditions() {
    return this._conditions;
  }

  @action setConditions(next: FilterCondition) {
    return (this._conditions = next);
  }

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

  @observable
  private _showResult: boolean = false;

  @computed get showResult() {
    return this._showResult;
  }

  @action setShowResult(next: boolean) {
    return (this._showResult = next);
  }

  @action
  clear() {
    this._conditions = initialCondition;
    this._filterCount = 0;
    this._openFilter = false;
    this._showResult = false;
  }

  @observable
  _filterCountViews: FilterViewModel = new FilterViewModel();

  @computed
  get filterCountViews() {
    //
    return this._filterCountViews;
  }

  @action
  async findAllFilterCountViews(
    contentType: MyLearningContentType | MyPageContentType
  ) {
    const parsingCardType = getParsingLearningType(contentType);

    const resultByCardType =
      (parsingCardType &&
        (await this.lectureApi.findCardTypeAndCardCount(parsingCardType))) ||
      [];

    const resultByCollegeId =
      (parsingCardType &&
        (await this.lectureApi.findCollegeAndCardCount(parsingCardType))) ||
      [];

    runInAction(() => {
      this._filterCountViews = FilterViewModel.getTotalFilterCountView(
        resultByCardType,
        resultByCollegeId
      );
    });
  }
}

export default FilterBoxService;

Object.defineProperty(FilterBoxService, 'instance', {
  value: new FilterBoxService(LectureApi.instance),
  writable: false,
  configurable: false,
});
