
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

export interface LectureSurveySummaryItem {  
  answerItemType: LectureSurveyItemType;
  numberCountMap: NumberCount;
}

export interface LectureSurveyAnswer {
  id: string;
  answerItemType: LectureSurveyItemType;
  questionNumber: string;
  summaryItems: LectureSurveySummaryItem;
}

export interface LectureSurveyAnswerSummary {
  surveyAnswers: LectureSurveyAnswer[];
}


export default interface LectureSurveyAnswerSummaryList {
  id: string;
  answerItemType: LectureSurveyItemType;
  questionNumber: string;
  summaryItems: LectureSurveySummaryItem;
}