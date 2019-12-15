
import { decorate, observable } from 'mobx';
import { IdNameList } from 'shared';
import { LearningTimeModel } from './LearningTimeModel';
import { LectureSummary } from './LectureSummary';

export  class StudySummary {
  favoriteChannels : IdNameList = {} as IdNameList;
  favoritecColleges : IdNameList = {} as IdNameList;
  favoriteLearningType : IdNameList = {} as IdNameList;

  learningTime : LearningTimeModel = new LearningTimeModel();
  lectureSummary : LectureSummary = new LectureSummary();
  stampCount : number=0;
  joinedCommunity : number=0;

  constructor(studySummary? : StudySummary) {
    if (studySummary) {
      const learningTime = studySummary.learningTime && new LearningTimeModel(studySummary.learningTime) || '';
      const lectureSummary = studySummary.lectureSummary && new LectureSummary((studySummary.lectureSummary)) || '';

      Object.assign(this, { ...studySummary, learningTime, lectureSummary });
    }
  }
}

decorate(StudySummary, {
  favoriteChannels: observable,
  favoritecColleges: observable,
  favoriteLearningType: observable,
  learningTime: observable,
  lectureSummary: observable,
  stampCount: observable,
  joinedCommunity: observable,
});
