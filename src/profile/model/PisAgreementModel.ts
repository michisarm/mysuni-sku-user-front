import { decorate, observable } from 'mobx';

export class PisAgreementModel {
  signed: boolean = false;
  date: string = '';
  imageFileBoxId: string = '';           // 이미지파일
  signImageFileBoxId:string='';

  constructor(pisAgreement?: PisAgreementModel) {
    if (pisAgreement) Object.assign(this, { ...pisAgreement });
  }
}

decorate(PisAgreementModel, {
  signed: observable,
  date: observable,
  imageFileBoxId: observable,
  signImageFileBoxId: observable,
});
