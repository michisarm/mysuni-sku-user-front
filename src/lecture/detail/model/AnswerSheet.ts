import Answer from './Answer';

export default interface AnswerSheet {
  id: string;
  submitted?: boolean;
  answers: Answer[];
  submitAnswers: Answer[];
  finished: boolean;
}