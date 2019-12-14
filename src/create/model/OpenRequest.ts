import { decorate, observable } from 'mobx';
import { OpenResponse } from './OpenResponse';

export class OpenRequest {
  time: number = 0;
  response: OpenResponse = new OpenResponse();

  constructor(openRequest?: OpenRequest) {
    //
    if (openRequest) {
      const response = openRequest.response && new OpenResponse(openRequest.response) || this.response;
      Object.assign(this, { ...openRequest, response });
    }
  }
}

decorate(OpenRequest, {
  time: observable,
  response: observable,
});
