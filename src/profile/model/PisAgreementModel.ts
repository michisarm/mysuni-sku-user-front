import { decorate, observable } from 'mobx';

export class PisAgreementModel {
  signed: boolean = false;
  date: string = '';
  globalSigned : boolean = false;
  globalDate : string='';

  imageFileBoxId: string = '';           // 이미지파일
  signImageFileBoxId:string='';

  constructor(pisAgreement?: PisAgreementModel) {
    if (pisAgreement) Object.assign(this, { ...pisAgreement });
  }
}

decorate(PisAgreementModel, {
  signed: observable,
  date: observable,
  globalSigned: observable,
  globalDate: observable,
  imageFileBoxId: observable,
  signImageFileBoxId: observable,
});
