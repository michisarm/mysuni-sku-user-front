import { autobind } from '@nara.platform/accent';
import { LectureApi } from 'lecture';
import { action, computed, observable, runInAction } from 'mobx';
import FileterViewModel from 'myTraining/model/filter/FilterViewModel';
import { getParsingLearningType } from 'myTraining/model/filter/ParsingLearningType';
import { MyLearningContentType } from '../../ui/model/MyLearningContentType';
import { MyPageContentType } from '../../ui/model/MyPageContentType';

@autobind
class FilterCountService {
  static instance: FilterCountService;

  private lectureApi: LectureApi;

  constructor(lectureApi: LectureApi) {
    this.lectureApi = lectureApi;
  }

  @observable
  _filterCountViews: FileterViewModel = new FileterViewModel();

  @computed get filterCountViews() {
    return this._filterCountViews;
  }

  // @observable
  // _totalFilterCountView: FilterCountViewModel = new FilterCountViewModel();

  // @computed get totalFilterCountView() {
  //   return this._totalFilterCountView;
  // }

  @action
  async findAllFilterCountViews(
    contentType: MyLearningContentType | MyPageContentType
  ) {
    const parsingCardType = getParsingLearningType(contentType);

    const hasStamp =
      (contentType === MyPageContentType.EarnedStampList && true) || undefined;

    const resultByCardType =
      (parsingCardType &&
        (await this.lectureApi.findCardTypeAndCardCount(
          parsingCardType,
          hasStamp
        ))) ||
      [];

    const resultByCollegeId =
      (parsingCardType &&
        (await this.lectureApi.findCollegeAndCardCount(
          parsingCardType,
          hasStamp
        ))) ||
      [];

    runInAction(() => {
      this._filterCountViews = FileterViewModel.getTotalFilterCountView(
        resultByCardType,
        resultByCollegeId
      );
    });

    // const response = await this.findByContentType(contentType);
    // if (response) {
    //   if (contentType === MyLearningContentType.Required) {
    //     let totalCollegeCount = 0;

    //     const filterCountViews = response.map((collegeAndCardCount: any) => {
    //       totalCollegeCount += collegeAndCardCount.count;
    //       return new FilterCountViewModel({
    //         collegeId: collegeAndCardCount.collegeId,
    //         college: collegeAndCardCount.count,
    //       } as FilterCountViewModel);
    //     });

    //     const cardTypeAndCardCounts = await findCardTypeAndCardCount();

    //     if (cardTypeAndCardCounts && cardTypeAndCardCounts.length > 0) {
    //       const totalFilterCountView = getTotalFilterCountView(
    //         cardTypeAndCardCounts
    //       );
    //       FilterCountViewModel;
    //       totalFilterCountView.college = totalCollegeCount;

    //       runInAction(() => {
    //         this._filterCountViews = filterCountViews;
    //         this._totalFilterCountView = totalFilterCountView;
    //       });
    //     }
    //   } else {
    //     const filterCountViews = response.map(
    //       (filterCountView: any) => new FilterCountViewModel(filterCountView)
    //     );
    //     const totalFilterCountView =
    //       FilterCountViewModel.getTotalFilterCountView(filterCountViews);

    //     runInAction(() => {
    //       this._filterCountViews = filterCountViews;
    //       this._totalFilterCountView = totalFilterCountView;
    //     });
    //   }
    // }
  }

  @action
  clearAllFilterCountViews() {
    this._filterCountViews = new FileterViewModel();
    // this._totalFilterCountView = new FilterCountViewModel();
  }

  // private async findByContentType(
  //   contentType: MyLearningContentType | MyPageContentType
  // ) {
  //   switch (contentType) {
  //     case MyLearningContentType.InProgress:
  //     case MyLearningContentType.InMyList:
  //     case MyLearningContentType.Required:
  //     case MyLearningContentType.Completed:
  //     case MyLearningContentType.Retry: {
  //       return;
  //     }
  //     // case MyLearningContentType.InMyList: {
  //     //   const filterRdo = new InMyLectureFilterRdoModel();
  //     //   return this.inMyLectureApi.findAllFilterCountViews(filterRdo);
  //     // }
  //     // case MyLearningContentType.Required: {
  //     //   return findCollegeAndCardCount();
  //     // }
  //     default: {
  //       const filterRdo = MyTrainingFilterRdoModel.create(contentType);
  //       return this.myTrainingApi.findAllFilterCountViews(filterRdo);
  //     }
  //   }
  // }
}

export default FilterCountService;

Object.defineProperty(FilterCountService, 'instance', {
  value: new FilterCountService(LectureApi.instance),
  writable: false,
  configurable: false,
});
