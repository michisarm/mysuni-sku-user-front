// 간략화 되었음

import SurveySummaryItem from './SurveySummaryItem';

type LectureSurveyItemType =
  | 'Criterion'
  | 'Choice'
  | 'Essay'
  | 'Date'
  | 'Boolean'
  | 'Matrix';
// Answer
export default interface SurveyAnswerSummaryList {
  id: string;
  answerItemType: LectureSurveyItemType;
  questionNumber: string;
  summaryItems: SurveySummaryItem;
}
