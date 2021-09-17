import { decorate, observable } from 'mobx';

export default class LatestOperatorSentEmail {
  emailTemplate: string = '';
  id: string = '';
  questionId: string = '';
  receiver: string = '';
  receiverType: string = '';
  registeredTime: number = 0;
  sender: string = '';

  constructor(latestOperatorSentEmail?: LatestOperatorSentEmail) {
    if (latestOperatorSentEmail) {
      Object.assign(this, { ...latestOperatorSentEmail });
    }
  }
}

decorate(LatestOperatorSentEmail, {
  emailTemplate: observable,
  id: observable,
  questionId: observable,
  receiver: observable,
  receiverType: observable,
  registeredTime: observable,
  sender: observable,
});
