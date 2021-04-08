import { AnswerItem } from './QuizAnswerItem';

export interface UserAnswer {
  email: string | null | undefined;
  memberId: string | null | undefined;
  quizQuestionAnswerItems: AnswerItem[]
  quizQuestionId: string
}
