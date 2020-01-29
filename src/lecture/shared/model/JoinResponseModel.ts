
import { decorate, observable } from 'mobx';

class JoinResponseModel {
  //
  email: string = '';
  name: string = '';
  remark: string = '';
  accepted: boolean = false;
  time: number = 0;

  constructor(response?: JoinResponseModel) {
    if (response) {
      Object.assign(this, response);
    }
  }
}

decorate(JoinResponseModel, {
  email: observable,
  name: observable,
  remark: observable,
  accepted: observable,
  time: observable,
});

export default JoinResponseModel;
