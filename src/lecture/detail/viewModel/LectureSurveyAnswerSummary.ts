type LectureSurveyItemType =
  | 'Criterion'
  | 'Choice'
  | 'Essay'
  | 'Date'
  | 'Boolean'
  | 'Matrix'
  | 'Review';

export interface Sentences {
  sentence: string;
}
export interface MatrixItem {
  numberCountMap: Record<number, number>;
  rowNumber: string;
}
export interface LectureSurveySummaryItem {
  answerItemType: LectureSurveyItemType;
  numberCountMap?: Record<string, number>;
  sentences?: Sentences[];
  sentencesMap?: Record<string, number>;
  matrixItems?: MatrixItem[];
  criteriaItemCountMap?: Record<string, number>;
}
export default interface LectureSurveyAnswerSummaryList {
  id: string;
  answerItemType: LectureSurveyItemType;
  questionNumber: string;
  summaryItems: LectureSurveySummaryItem;
}
