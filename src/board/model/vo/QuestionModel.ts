import { RequestChannel } from './RequestChannel';
import { QnaState } from './QnaState';
import { decorate, observable } from 'mobx';

export default class QuestionModel {
  //
  content: string = '';
  denizenId: string = '';
  depotId: string = '';
  id: string = '';
  mainCategoryId: string = '';
  modifiedTime: number = 0;
  operatorIds: string[] = [];
  registeredTime: number = 0;
  relatedCardId: string = '';
  relatedQuestionId: string = '';
  requestChannel: RequestChannel = RequestChannel.QnA;
  state: QnaState = QnaState.QuestionReceived;
  subCategoryId: string = '';
  title: string = '';

  constructor(questionModel?: QuestionModel) {
    //
    if (questionModel) {
      //
      Object.assign(this, { ...questionModel });
    }
  }
}

decorate(QuestionModel, {
  content: observable,
  denizenId: observable,
  depotId: observable,
  id: observable,
  mainCategoryId: observable,
  modifiedTime: observable,
  operatorIds: observable,
  registeredTime: observable,
  relatedCardId: observable,
  relatedQuestionId: observable,
  requestChannel: observable,
  state: observable,
  subCategoryId: observable,
  title: observable,
});
