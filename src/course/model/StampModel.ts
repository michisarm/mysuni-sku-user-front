import { decorate, observable } from 'mobx';

export class StampModel {
  //
  stampReady: boolean = true;
  stampCount: number = 0;

  constructor(stampModel?: StampModel) {
    if (stampModel) {
      Object.assign(this, { ...stampModel });
    }
  }
}

decorate(StampModel, {
  stampReady: observable,
  stampCount: observable,
});
