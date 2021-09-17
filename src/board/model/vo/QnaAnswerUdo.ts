import { QnaState } from './QnaState';
import QnAModel from '../QnAModel';

export default class QnaAnswerUdo {
  //
  checkMail: boolean = false;
  content: string = '';
  depotId: string = '';
  memo: string = '';
  questionId: string = '';
  state: QnaState = QnaState.QuestionReceived;

  constructor(qnaAnswerUdo?: QnaAnswerUdo) {
    //
    if (qnaAnswerUdo) {
      //
      Object.assign(this, { ...qnaAnswerUdo });
    }
  }

  static asQnaAnswerUdoByQnaModel(qna: QnAModel): QnaAnswerUdo {
    //
    return {
      checkMail: qna.checkMail,
      content: qna.answer.content,
      depotId: qna.answer.depotId,
      memo: qna.answer.memo,
      questionId: qna.question.id,
      state: qna.question.state,
    };
  }
}
