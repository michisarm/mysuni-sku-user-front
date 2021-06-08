import AnswerSheet from './AnswerSheet';
import ExamPaper from './ExamPaper';
import ExamQuestion from './ExamQuestion';

export default interface AnswerSheetDetail {
  answerSheet: AnswerSheet;
  examPaper: ExamPaper;
  examQuestions: ExamQuestion[];
}
