
import { decorate, observable } from 'mobx';
import JoinResponseModel from './JoinResponseModel';

class JoinRequestModel {
  //
  time: number = 0;
  response: JoinResponseModel = new JoinResponseModel();

  constructor(request?: JoinRequestModel) {
    if (request) {
      Object.assign(this, request);
      this.response = request.response && new JoinResponseModel(request.response) || this.response;
    }
  }
}

decorate(JoinRequestModel, {
  time: observable,
  response: observable,
});

export default JoinRequestModel;
