import { autobind } from '@nara.platform/accent';
import { observable, computed, action, runInAction } from 'mobx';
import MyTrainingApi from '../apiclient/MyTrainingApi';
import FilterCountViewModel from '../../model/FilterCountViewModel';
import MyTrainingFilterRdoModel from '../../model/MyTrainingFilterRdoModel';
import { MyPageContentType } from '../../ui/model/MyPageContentType';
import { MyLearningContentType } from '../../ui/model/MyLearningContentType';
import InMyLectureApi from '../apiclient/InMyLectureApi';
import {
  findCollegeAndCardCount,
  findCardTypeAndCardCount,
} from '../../../lecture/detail/api/cardApi';
import InMyLectureFilterRdoModel from '../../model/InMyLectureFilterRdoModel';
import { getTotalFilterCountView } from '../../../lecture/model/CardTypeAndCardCount';

@autobind
class FilterCountService {
  static instance: FilterCountService;

  private myTrainingApi: MyTrainingApi;
  private inMyLectureApi: InMyLectureApi;

  constructor(myTrainingApi: MyTrainingApi, inMyLectureApi: InMyLectureApi) {
    this.myTrainingApi = myTrainingApi;
    this.inMyLectureApi = inMyLectureApi;
  }

  @observable
  _filterCountViews: FilterCountViewModel[] = [];

  @computed get filterCountViews() {
    return this._filterCountViews;
  }

  @observable
  _totalFilterCountView: FilterCountViewModel = new FilterCountViewModel();

  @computed get totalFilterCountView() {
    return this._totalFilterCountView;
  }

  @action
  async findAllFilterCountViews(
    contentType: MyLearningContentType | MyPageContentType
  ) {
    const response = await this.findByContentType(contentType);

    if (response) {
      if (contentType === MyLearningContentType.Required) {
        let totalCollegeCount = 0;

        const filterCountViews = response.map((collegeAndCardCount: any) => {
          totalCollegeCount += collegeAndCardCount.count;
          return new FilterCountViewModel({
            collegeId: collegeAndCardCount.collegeId,
            college: collegeAndCardCount.count,
          } as FilterCountViewModel);
        });

        const cardTypeAndCardCounts = await findCardTypeAndCardCount();

        if (cardTypeAndCardCounts && cardTypeAndCardCounts.length > 0) {
          const totalFilterCountView = getTotalFilterCountView(
            cardTypeAndCardCounts
          );
          totalFilterCountView.college = totalCollegeCount;

          runInAction(() => {
            this._filterCountViews = filterCountViews;
            this._totalFilterCountView = totalFilterCountView;
          });
        }
      } else {
        const filterCountViews = response.map(
          (filterCountView: any) => new FilterCountViewModel(filterCountView)
        );
        const totalFilterCountView = FilterCountViewModel.getTotalFilterCountView(
          filterCountViews
        );

        runInAction(() => {
          this._filterCountViews = filterCountViews;
          this._totalFilterCountView = totalFilterCountView;
        });
      }
    }
  }

  @action
  clearAllFilterCountViews() {
    this._filterCountViews = [];
    this._totalFilterCountView = new FilterCountViewModel();
  }

  private async findByContentType(
    contentType: MyLearningContentType | MyPageContentType
  ) {
    switch (contentType) {
      case MyLearningContentType.InMyList: {
        const filterRdo = new InMyLectureFilterRdoModel();
        return this.inMyLectureApi.findAllFilterCountViews(filterRdo);
      }
      case MyLearningContentType.Required: {
        return findCollegeAndCardCount();
      }
      default: {
        const filterRdo = MyTrainingFilterRdoModel.create(contentType);
        return this.myTrainingApi.findAllFilterCountViews(filterRdo);
      }
    }
  }
}

export default FilterCountService;

Object.defineProperty(FilterCountService, 'instance', {
  value: new FilterCountService(
    MyTrainingApi.instance,
    InMyLectureApi.instance
  ),
  writable: false,
  configurable: false,
});
