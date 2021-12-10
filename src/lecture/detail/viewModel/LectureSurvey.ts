import LangStrings from '../model/LangStrings';
import { MatrixItem, Sentences } from './LectureSurveyAnswerSummary';

export type LectureSurveyItemType =
  | 'Criterion'
  | 'Choice'
  | 'Essay'
  | 'Date'
  | 'Boolean'
  | 'Matrix'
  | 'ChoiceFixed'
  | 'Review';

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
  matrixItems?: MatrixItem[];
  sentencesMap?: Record<string, number>;
  questionNumber: string;
  visible: boolean;
  numberCountMap?: Record<string, number>;
}

export interface LectureSurveyItemChoice {
  title: string;
  image?: string;
  no: number;
  index?: number;
  names?: LangStrings;
  count?: number;
}

export default interface LectureSurvey {
  id: string;
  title: string;
  surveyItems: LectureSurveyItem[];
  surveyId: string;
  surveyCaseId: string;
  userViewResult: boolean;
}
