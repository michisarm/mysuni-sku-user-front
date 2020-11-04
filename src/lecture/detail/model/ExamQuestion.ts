import QuestionItem from './QuestionItem';
import QuestionType from './QuestionType';

export default interface ExamQuestion {
  id: string;
  paperId: string;
  questionNo: string;
  allocatedPoint: number;
  questionType: QuestionType;
  direction: string;
  answer: string;
  items: QuestionItem[];
  questionImgSrc: string;
}
