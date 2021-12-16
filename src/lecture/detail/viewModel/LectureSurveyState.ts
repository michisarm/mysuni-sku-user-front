import LangStrings from '../model/LangStrings';
import { State } from './LectureState';
import { LectureSurveyItemType } from './LectureSurvey';

export interface LectureSurveyAnswerItem {
  questionNumber: string;
  answerItemType?: LectureSurveyItemType;
  criteriaItem?: CriteriaItem | null;
  itemNumbers?: string[];
  sentence?: string | null;
  matrixItem?: MatrixItem[] | null;
}

export interface CriteriaItem {
  names: LangStrings;
  value?: number;
  index: number;
}

export interface MatrixItem {
  rowNumber: string;
  columnSelectedNumber: string;
}

export default interface LectureSurveyState {
  evaluationSheetId?: string;
  answerSheetId?: string;
  state: State;
  answerItem: LectureSurveyAnswerItem[];
  surveyCaseId: string;
  serviceId: string;
  round: number;
}
