
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
  numberCountMap: Map<string, number>;
  rowNumber: number;
}
export interface LectureSurveySummaryItem {  
  answerItemType: LectureSurveyItemType;
  numberCountMap: Map<string, number>;
  sentences: Sentences[];
  sentencesMap: Map<string, number>;
  matrixItems: MatrixItem[];
}
export default interface LectureSurveyAnswerSummaryList {
  id: string;
  answerItemType: LectureSurveyItemType;
  questionNumber: string;
  summaryItems: LectureSurveySummaryItem;
}