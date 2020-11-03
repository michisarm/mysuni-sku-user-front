import { AnswerItemType } from '../../../survey/answer/model/AnswerItemType';
import LangStrings from '../model/LangStrings';
import { State } from './LectureState';

type LectureSurveyItemType =
  | 'Criterion'
  | 'Choice'
  | 'Essay'
  | 'Date'
  | 'Boolean'
  | 'Matrix';

export interface LectureSurveyAnswerItem {
  questionNumber: string;
  answerItemType?: AnswerItemType;
  criteriaItem?: CriteriaItem;
  itemNumbers?: string[];
  sentence?: string;
  matrixItem?: MatrixItem;
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
  id?: string;
  answerSheetId?: string;
  state: State;
  answerItem: LectureSurveyAnswerItem[];
  surveyCaseId: string;
  serviceId: string;
  round: number;
}
