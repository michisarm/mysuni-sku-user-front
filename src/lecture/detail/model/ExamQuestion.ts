import QuestionItem from './QuestionItem';
import QuestionType from './QuestionType';

export default interface ExamQuestion {
  essay: boolean;
  groupName: string;
  id: string;
  imagePath: string;
  items: QuestionItem[];
  mandatory: boolean;
  paperId: string;
  point: number;
  question: string;
  questionAnswer: QuestionAnswer;
  questionType: QuestionType;
  sequence: number;
}

export interface QuestionAnswer {
  answer: string;
  explanation: string;
}
