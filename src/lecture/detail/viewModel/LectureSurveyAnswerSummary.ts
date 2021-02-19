type LectureSurveyItemType =
  | 'Criterion'
  | 'Choice'
  | 'Essay'
  | 'Date'
  | 'Boolean'
  | 'Matrix';

interface Sentences {
  sentence: string;
}
interface MatrixItem {
  numberCountMap: Record<string, number>;
  rowNumber: number;
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
