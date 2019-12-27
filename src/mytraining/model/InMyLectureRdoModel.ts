
import { decorate, observable } from 'mobx';


class InMyLectureRdoModel {
  //
  limit: number = 0;
  offset: number = 0;


  constructor(inMyLectureRdo?: InMyLectureRdoModel) {
    //
    if (inMyLectureRdo) {
      Object.assign(this, { ...inMyLectureRdo });
    }
  }

  static new(limit: number, offset: number) {
    //
    return new InMyLectureRdoModel({
      limit,
      offset,
    });
  }
}

decorate(InMyLectureRdoModel, {
  limit: observable,
  offset: observable,
});

export default InMyLectureRdoModel;
