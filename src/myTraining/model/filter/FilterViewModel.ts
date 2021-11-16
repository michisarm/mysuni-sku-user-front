import { computed, decorate, observable } from 'mobx';
import { CardTypeInFilter } from './CardTypeInFilter';
import { CountByCardTypeModel } from './CountByCardTypeModel';
import { CountByCollegeIdModel } from './CountByCollegeIdModel';

class FilterViewModel {
  //
  totalCountByCardType: number = 0;
  totalCountByCollegeId: number = 0;
  cardTypeCountList: CountByCardTypeModel[] = [];
  collegeCountList: CountByCollegeIdModel[] = [];

  public constructor(filterCountView?: FilterViewModel) {
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

  getCountByCollegeId(collegeId: string) {
    //
    const findCollegeCount = this.collegeCountList.find(
      (countModel) => countModel.collegeId === collegeId
    );

    return (findCollegeCount && findCollegeCount.count) || 0;
  }

  getCountFromLearningType = (learningType: string) => {
    //

    switch (learningType) {
      case 'Course':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.Course
          )?.count || 0
        );
      case 'Video':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.Video
          )?.count || 0
        );
      case 'Audio':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.Audio
          )?.count || 0
        );
      case 'e-Learning':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.ELearning
          )?.count || 0
        );
      case 'Classroom':
        return (
          this.cardTypeCountList.find(
            (countModel) =>
              countModel.cardType === CardTypeInFilter.ClassRoomLecture
          )?.count || 0
        );
      case 'Community':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.Community
          )?.count || 0
        );
      case 'Task':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.Task
          )?.count || 0
        );
      case 'Web Page':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.WebPage
          )?.count || 0
        );
      case 'Documents':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.Documents
          )?.count || 0
        );
      case 'Experiential':
        return (
          this.cardTypeCountList.find(
            (countModel) =>
              countModel.cardType === CardTypeInFilter.Experiential
          )?.count || 0
        );
      case 'Cohort':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.Cohort
          )?.count || 0
        );
      case 'Discussion':
        return (
          this.cardTypeCountList.find(
            (countModel) => countModel.cardType === CardTypeInFilter.Discussion
          )?.count || 0
        );
      default:
        return 0;
    }
  };

  public static getTotalFilterCountView = (
    cardTypeCountList: CountByCardTypeModel[],
    collegeCountList: CountByCollegeIdModel[]
  ): FilterViewModel => {
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

    const result = new FilterViewModel();
    result.cardTypeCountList = cardTypeCountList;
    result.collegeCountList = collegeCountList;
    result.totalCountByCardType = totalCountByCardType;
    result.totalCountByCollegeId = totalCountByCollegeId;

    return result;
  };
}

export default FilterViewModel;

decorate(FilterViewModel, {
  totalCountByCardType: observable,
  totalCountByCollegeId: observable,
  cardTypeCountList: observable,
  collegeCountList: observable,
});
