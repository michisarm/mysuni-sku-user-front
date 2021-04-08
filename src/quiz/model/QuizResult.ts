export interface QuizResult {
  empty: boolean;
  results: QuizResultItem[];
  totalCount: number;
}

interface QuizResultItem {
  createdTime: number;
  email: string;
  id: string;
  memberId: string;
  quizQuestionAnswerItems: string[];
  quizQuestionId: string;
}
