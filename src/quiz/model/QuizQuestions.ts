import QuizItem, { getEmptyQuizItem } from "./QuizItem";
import QuizMessage from "./QuizMessage";

export default interface QuizQuestions {
  alertMessage: QuizMessage;
  answer: boolean;
  id: string;
  img: string;
  number: number;
  quizId: string;
  quizQuestionItems?: QuizItem[];
  resultView: boolean;
  subText: string;
  text: string;
  type: string;
}

export function getEmptyQuizQuestions(): QuizQuestions {
  return {
    alertMessage: {
      img: '',
      message: '',
    },
    answer: false,
    id: '',
    img: '',
    quizQuestionItems: [getEmptyQuizItem()],
    number: 0,
    quizId: '',
    resultView: false,
    subText: '',
    text: '',
    type: 'SingleChoice'
  }
}