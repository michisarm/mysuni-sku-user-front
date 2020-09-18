export class AplXlsxModel {
  //
  No: string = '';
  교육명: string = '';
  교육형태: string = '';
  Channel: string = '';
  교육기간: string = '';
  교육시간: string = '';
  상태: string = '';
  생성자: string = '';
  승인일자: string = '';

  constructor(aplXlsx: AplXlsxModel) {
    //
    if (aplXlsx) {
      Object.assign(this, { ...aplXlsx });
    }
  }
}

