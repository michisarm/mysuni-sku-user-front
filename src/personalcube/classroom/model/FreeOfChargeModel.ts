import { decorate, observable } from 'mobx';

export class FreeOfChargeModel {
  //
  freeOfCharge: boolean = false;    //유무료
  chargeAmount: number = 0;       // 비용

  constructor(freeOfCharge?: FreeOfChargeModel) {
    if (freeOfCharge) {
      Object.assign(this, freeOfCharge);
    }
  }
}

decorate(FreeOfChargeModel, {
  freeOfCharge: observable,
  chargeAmount: observable,
});

