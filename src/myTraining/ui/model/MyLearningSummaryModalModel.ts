import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';
import { InstructorLearningTimeSummary } from '../../../personalcube/personalcube/model/InstructorLearningTimeSummary';

export interface MyLearningSummaryModalModel {
  //
  totalLearningTime: number;
  displayMySuniLearningTime: number;
  displayMyCompanyLearningTime: number;
  displayMyReplayLearningTime: number;
  myLearningSummary: MyLearningSummaryModel;
  instructTimeSummary?: InstructorLearningTimeSummary;
}

export function initMyLearningSummaryModalModel(): MyLearningSummaryModalModel {
  return {
    totalLearningTime: 0,
    displayMySuniLearningTime: 0,
    displayMyCompanyLearningTime: 0,
    displayMyReplayLearningTime: 0,
    myLearningSummary: new MyLearningSummaryModel(),
  };
}
