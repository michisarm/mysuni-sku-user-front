import QuizMessage from "./QuizMessage";
import QuizQuestions, { getEmptyQuizQuestions } from "./QuizQuestions";

export default interface QuizTableList {
  endTime: number;
  name: string;
  quizQuestions?: QuizQuestions[];
  resultAlertMessage?: QuizMessage;
  showTime: number;
}

export function getEmptyQuizTable(): QuizTableList {
  return {
    showTime: 0,
    endTime: 0,
    name: '',
    quizQuestions: [getEmptyQuizQuestions()],
    resultAlertMessage: {
      img: '',
      message: ''
    },
  }
}
