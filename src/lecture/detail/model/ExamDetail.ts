import ExamPaper from './ExamPaper';
import ExamQuestion from './ExamQuestion';

export default interface ExamDetail {
  examPaper: ExamPaper;
  examQuestions: ExamQuestion[];
}
