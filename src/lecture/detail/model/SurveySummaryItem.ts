
type LectureSurveyItemType =
  | 'Criterion'
  | 'Choice'
  | 'Essay'
  | 'Date'
  | 'Boolean'
  | 'Matrix';

interface NumberCount {
  questionNo: string;
  answer: number;
}
export default interface SurveySummaryItem {  
  answerItemType: LectureSurveyItemType;
  numberCountMap: NumberCount;
}
