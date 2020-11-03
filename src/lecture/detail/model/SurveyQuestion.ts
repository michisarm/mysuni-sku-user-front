// 간략화 되었음

import LangStrings from './LangStrings';
import AnswerItems from './AnswerItems';
import Sequence from './Sequence';
type LectureSurveyItemType =
  | 'Criterion'
  | 'Choice'
  | 'Essay'
  | 'Date'
  | 'Boolean'
  | 'Matrix';
// Question
export default interface Question {
  id: string;
  sentences: LangStrings;
  sequence: Sequence;
  questionItemType: LectureSurveyItemType;
  answerItems: AnswerItems;
  optional?: boolean;
  sentencesImageUrl?: string;
}
