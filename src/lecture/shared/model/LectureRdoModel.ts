
import { decorate, observable } from 'mobx';


class LectureRdoModel {
  //
  college: string = '';
  channel: string = '';
  limit: number = 0;
  offset: number = 0;


  constructor(lectureRdo?: LectureRdoModel) {
    //
    if (lectureRdo) {
      Object.assign(this, { ...lectureRdo });
    }
  }

  static newWithCollege(collegeId: string, limit: number, offset: number) {
    //
    return new LectureRdoModel({
      college: collegeId,
      channel: '',
      limit,
      offset,
    });
  }

  static newWithChannel(channelId: string, limit: number, offset: number) {
    //
    return new LectureRdoModel({
      college: '',
      channel: channelId,
      limit,
      offset,
    });
  }
}

decorate(LectureRdoModel, {
  college: observable,
  channel: observable,
  limit: observable,
  offset: observable,
});

export default LectureRdoModel;
