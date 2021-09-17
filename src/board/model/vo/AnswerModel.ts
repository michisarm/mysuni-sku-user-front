import { PolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { decorate, observable } from 'mobx';

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

decorate(AnswerModel, {
  content: observable,
  depotId: observable,
  id: observable,
  memo: observable,
  modifiedTime: observable,
  modifier: observable,
  modifierName: observable,
  operatorMailSentTime: observable,
  questionId: observable,
  registeredTime: observable,
  registrant: observable,
  registrantName: observable,
  satisfactionComment: observable,
  satisfactionPoint: observable,
  satisfactionRegisteredTime: observable,
});
