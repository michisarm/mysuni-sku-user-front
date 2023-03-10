import { decorate, observable } from 'mobx';
import { patronInfo } from '@nara.platform/dock';


class CommunityLectureRdoModel {
  //
  createAudienceKey: string = '';
  limit: number = 0;
  offset: number = 0;


  constructor(lectureRdo?: CommunityLectureRdoModel) {
    //
    if (lectureRdo) {
      Object.assign(this, { ...lectureRdo });
    }
  }

  static new(limit: number, offset: number) {
    return new CommunityLectureRdoModel({
      createAudienceKey: patronInfo.getPatronId() || '',
      limit,
      offset,
    });
  }
}

decorate(CommunityLectureRdoModel, {
  createAudienceKey: observable,
  limit: observable,
  offset: observable,
});

export default CommunityLectureRdoModel;
