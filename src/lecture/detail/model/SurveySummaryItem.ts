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
export default interface SurveySummaryItem {
  answerItemType: LectureSurveyItemType;
  numberCountMap: Record<string, number>;
  sentences: Sentences[];
  sentencesMap: Record<string, number>;
  matrixItems: MatrixItem[];
  criteriaItemCountMap: Record<string, number>;
}
