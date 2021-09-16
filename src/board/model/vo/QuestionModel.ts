import { RequestChannel } from './RequestChannel';
import { QnaState } from './QnaState';

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
