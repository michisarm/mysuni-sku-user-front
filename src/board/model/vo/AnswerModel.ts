import { PolyglotString } from '../../../shared/viewmodel/PolyglotString';

export default class AnswerModel {
  //
  content: string = '';
  depotId: string = '';
  id: string = '';
  memo: string = '';
  modifiedTime: number = 0;
  modifier: string = '';
  modifierName: PolyglotString | null = null;
  operatorMailSentTime: number = 0;
  questionId: string = '';
  registeredTime: number = 0;
  registrant: string = '';
  registrantName: PolyglotString | null = null;
  satisfactionComment: string = '';
  satisfactionPoint: number = 0;
  satisfactionRegisteredTime: number = 0;

  constructor(answerModel?: AnswerModel) {
    //
    if (answerModel) {
      Object.assign(this, { ...answerModel });
    }
  }
}
