
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
export default interface SurveySummaryItem {  
  answerItemType: LectureSurveyItemType;
  numberCountMap: Map<string, number>;
  sentences: Sentences[];
  sentencesMap: Map<string, number>;
  matrixItems: MatrixItem[];
  criteriaItemCountMap: Map<string, number>;
}
