import { CountByCardTypeModel } from './CountByCardTypeModel';
import { CountByCollegeIdModel } from './CountByCollegeIdModel';
import { computed, decorate, observable } from 'mobx';
import { CardTypeInFilter } from './CardTypeInFilter';

class FilterCountViewModel {
  //
  totalCountByCardType: number = 0;
  totalCountByCollegeId: number = 0;
  cardTypeCountList: CountByCardTypeModel[] = [];
  collegeCountList: CountByCollegeIdModel[] = [];

  public constructor(filterCountView?: FilterCountViewModel) {
    if (filterCountView) {
      Object.assign(this, { ...filterCountView });

      this.cardTypeCountList =
        (filterCountView.cardTypeCountList &&
          filterCountView.cardTypeCountList.length > 0 && [
            ...filterCountView.cardTypeCountList,
          ]) ||
        [];
      this.collegeCountList =
        (filterCountView.collegeCountList &&
          filterCountView.collegeCountList.length > 0 && [
            ...filterCountView.collegeCountList,
          ]) ||
        [];
    }
  }

  @computed
  getCountByCollegeId(collegeId: string) {
    //
    return this.collegeCountList.find(
      (countModel) => countModel.collegeId === collegeId
    )?.count;
  }

  @computed
  getCountFromLearningType = (learningType: string) => {
    switch (learningType) {
      case 'Course':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.Course
        )?.count;
      case 'Video':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.Video
        )?.count;
      case 'Audio':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.Audio
        )?.count;
      case 'e-Learning':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.ELearning
        )?.count;
      case 'Classroom':
        return this.cardTypeCountList.find(
          (countModel) =>
            countModel.cardType === CardTypeInFilter.ClassRoomLecture
        )?.count;
      case 'Community':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.Community
        )?.count;
      case 'Task':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.Task
        )?.count;
      case 'Web Page':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.WebPage
        )?.count;
      case 'Documents':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.Documents
        )?.count;
      case 'Experiential':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.Experiential
        )?.count;
      case 'Cohort':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.Cohort
        )?.count;
      case 'Discussion':
        return this.cardTypeCountList.find(
          (countModel) => countModel.cardType === CardTypeInFilter.Discussion
        )?.count;
      default:
        return 0;
    }
  };

  public static getTotalFilterCountView = (
    cardTypeCountList: CountByCardTypeModel[],
    collegeCountList: CountByCollegeIdModel[]
  ): FilterCountViewModel => {
    let totalCountByCardType = 0;
    cardTypeCountList.length > 0 &&
      cardTypeCountList.forEach(
        (countModel) => (totalCountByCardType += countModel.count)
      );

    let totalCountByCollegeId = 0;
    collegeCountList.length > 0 &&
      collegeCountList.forEach(
        (countModel) => (totalCountByCollegeId += countModel.count)
      );

    cardTypeCountList = [...cardTypeCountList];
    collegeCountList = [...collegeCountList];

    const result = new FilterCountViewModel();
    result.cardTypeCountList = cardTypeCountList;
    result.collegeCountList = collegeCountList;
    result.totalCountByCardType = totalCountByCardType;
    result.totalCountByCollegeId = totalCountByCollegeId;

    return result;
  };
}

export default FilterCountViewModel;

decorate(FilterCountViewModel, {
  totalCountByCardType: observable,
  totalCountByCollegeId: observable,
  cardTypeCountList: observable,
  collegeCountList: observable,
});
