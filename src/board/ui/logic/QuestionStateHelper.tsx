import * as React from 'react';
import { QnaState } from '../../model/vo/QnaState';
import { ReactNode } from 'react';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

function getQuestionStateReactNode(state: QnaState) {
  //TODO:다국어처리 필요
  if(QnaState.QuestionReceived === state) {
    return <PolyglotText id="QuestionSate.QuestionReceived" defaultString="답변대기" />
  } else if (QnaState.AnswerWaiting === state) {
    return <PolyglotText id="QuestionSate.AnswerWaiting" defaultString="답변대기" />
  } else if (QnaState.AnswerCompleted === state) {
    return <PolyglotText id="QuestionSate.AnswerCompleted" defaultString="답변완료" />
  } else {
    return <></>
  }
}

export { getQuestionStateReactNode }
