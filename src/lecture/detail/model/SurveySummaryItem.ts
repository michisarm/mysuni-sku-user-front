export type LectureSurveyItemType =
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
  numberCountMap: Record<number, number>;
  rowNumber: string;
}
export default interface SurveySummaryItem {
  answerItemType: LectureSurveyItemType;
  numberCountMap: Record<number, number>;
  sentences: Sentences[];
  sentencesMap: Record<string, number>;
  matrixItems: MatrixItem[];
  criteriaItemCountMap: Record<number, number>;
}
