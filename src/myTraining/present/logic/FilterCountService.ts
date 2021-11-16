import { autobind } from '@nara.platform/accent';
import { LectureApi } from 'lecture';
import { action, computed, observable, runInAction } from 'mobx';
import FilterCountViewModel from 'myTraining/model/filter/FilterCountViewModel';
import { getParsingLearningType } from 'myTraining/model/filter/ParsingLearningType';
import MyTrainingFilterRdoModel from '../../model/MyTrainingFilterRdoModel';
import { MyLearningContentType } from '../../ui/model/MyLearningContentType';
import { MyPageContentType } from '../../ui/model/MyPageContentType';
import MyTrainingApi from '../apiclient/MyTrainingApi';

@autobind
class FilterCountService {
  static instance: FilterCountService;

  private myTrainingApi: MyTrainingApi;
  private lectureApi: LectureApi;

  constructor(myTrainingApi: MyTrainingApi, lectureApi: LectureApi) {
    this.myTrainingApi = myTrainingApi;
    this.lectureApi = lectureApi;
  }

  @observable
  _filterCountViews: FilterCountViewModel = new FilterCountViewModel();

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

    const resultByCardType =
      (parsingCardType &&
        (await this.lectureApi.findCardTypeAndCardCount(parsingCardType))) ||
      [];

    const resultByCollegeId =
      (parsingCardType &&
        (await this.lectureApi.findCollegeAndCardCount(parsingCardType))) ||
      [];

    runInAction(() => {
      this._filterCountViews = FilterCountViewModel.getTotalFilterCountView(
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
    this._filterCountViews = new FilterCountViewModel();
    // this._totalFilterCountView = new FilterCountViewModel();
  }

  private async findByContentType(
    contentType: MyLearningContentType | MyPageContentType
  ) {
    switch (contentType) {
      case MyLearningContentType.InProgress:
      case MyLearningContentType.InMyList:
      case MyLearningContentType.Required:
      case MyLearningContentType.Completed:
      case MyLearningContentType.Retry: {
        return;
      }
      // case MyLearningContentType.InMyList: {
      //   const filterRdo = new InMyLectureFilterRdoModel();
      //   return this.inMyLectureApi.findAllFilterCountViews(filterRdo);
      // }
      // case MyLearningContentType.Required: {
      //   return findCollegeAndCardCount();
      // }
      default: {
        const filterRdo = MyTrainingFilterRdoModel.create(contentType);
        return this.myTrainingApi.findAllFilterCountViews(filterRdo);
      }
    }
  }
}

export default FilterCountService;

Object.defineProperty(FilterCountService, 'instance', {
  value: new FilterCountService(MyTrainingApi.instance, LectureApi.instance),
  writable: false,
  configurable: false,
});
