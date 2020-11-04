import LangStrings from '../model/LangStrings';

export type LectureSurveyItemType =
  | 'Criterion'
  | 'Choice'
  | 'Essay'
  | 'Date'
  | 'Boolean'
  | 'Matrix';

export interface LectureSurveyItem {
  title: string;
  image?: string;
  no: number;
  id: string;
  type: LectureSurveyItemType;
  isRequired: boolean;
  canMultipleAnswer?: boolean;
  maxLength?: number;
  choices?: LectureSurveyItemChoice[];
  rows?: LectureSurveyItemChoice[];
  columns?: LectureSurveyItemChoice[];
  questionNumber: string;
}

export interface LectureSurveyItemChoice {
  title: string;
  image?: string;
  no: number;
  index?: number;
  names?: LangStrings;
}

export default interface LectureSurvey {
  id: string;
  title: string;
  surveyItems: LectureSurveyItem[];
}
