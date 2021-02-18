
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
export default interface SurveySummaryItem {  
  answerItemType: LectureSurveyItemType;
  numberCountMap: Map<string, number>;
  sentences: Sentences[];
  sentencesMap: Map<string, number>;
}
