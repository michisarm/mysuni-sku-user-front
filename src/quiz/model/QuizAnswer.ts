import { AnswerItem } from './QuizAnswerItem';

export interface UserAnswer {
  email: string;
  memberId: string;
  quizQuestionAnswerItems: AnswerItem[]
  quizQuestionId: string
}
