import { decorate, observable } from 'mobx';

export class OpenResponseModel {
  //
  email: string = '';
  name: string = '';
  remark: string = '';
  accepted: boolean = false;
  time: number = 0;

  constructor(openResponse?: OpenResponseModel) {
    //
    if (openResponse) Object.assign(this, { ...openResponse });
  }
}

decorate(OpenResponseModel, {
  email: observable,
  name: observable,
  remark: observable,
  accepted: observable,
  time: observable,
});
