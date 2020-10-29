class MyTrainingStampXlsxModel {
  //
  No: string = '';
  college: string = '';
  과정명: string = '';
  스탬프: number = 0;
  획득일자: string = '';

  constructor(stampXlsxModel: MyTrainingStampXlsxModel) {
    //
    if (stampXlsxModel) {
      Object.assign(this, { ...stampXlsxModel });
    }
  }
}

export default MyTrainingStampXlsxModel;
