import { decorate, observable } from 'mobx';

export class OpenResponse {
  //
  email: string = '';
  name: string = '';
  remark: string = '';
  accepted: boolean = false;
  time: number = 0;

  constructor(openResponse?: OpenResponse) {
    //
    if (openResponse) Object.assign(this, { ...openResponse });
  }
}

decorate(OpenResponse, {
  email: observable,
  name: observable,
  remark: observable,
  accepted: observable,
  time: observable,
});
