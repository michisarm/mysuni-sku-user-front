import ExamQuestion from './ExamQuestion';

export default interface ExamPaper {
  id: string;
  title: string;
  year: string;
  authorId: string;
  authorName: string;
  finalCopy: boolean;
  finalCopyKr: string;
  questions: ExamQuestion[];
  questionSequence: number;
  registDate: string;
}
