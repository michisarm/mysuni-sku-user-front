import QuizItem, { getEmptyQuizItem } from "./QuizItem";
import QuizMessage from "./QuizMessage";
import AlertMessage from "./AlertMessage";

export default interface QuizQuestions {
  alertMessage: AlertMessage;
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
      failMessage: '',
      passMessage: '',
      failImg: '',
      passImg: ''
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