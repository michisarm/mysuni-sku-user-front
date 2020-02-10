
import { decorate, observable } from 'mobx';


class PisAgreementModel {
  //
  signed: boolean = false;
  date: string = '';

  imageFileBoxId: string = '';           // 이미지파일
  signImageFileBoxId: string = '';

  constructor(pisAgreement?: PisAgreementModel) {
    if (pisAgreement) {
      Object.assign(this, { ...pisAgreement });
    }
  }
}

decorate(PisAgreementModel, {
  signed: observable,
  date: observable,
  imageFileBoxId: observable,
  signImageFileBoxId: observable,
});

export default PisAgreementModel;
