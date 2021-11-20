import { decorate, observable } from 'mobx';

export class CountByCollegeIdModel {
  //
  collegeId: string = '';
  count: number = 0;
  channelId: string = '';

  constructor(model?: CountByCollegeIdModel) {
    //
    if (model) {
      Object.assign(this, { ...model });
    }
  }
}

decorate(CountByCollegeIdModel, {
  collegeId: observable,
  count: observable,
  channelId: observable,
});
