import { decorate, observable } from 'mobx';
import { tenantInfo } from '@nara.platform/dock';
import { CubeType } from 'shared';


class LectureRdoModel {
  //
  college: string = '';
  channel: string = '';
  limit: number = 0;
  offset: number = 0;
  cubeType?: CubeType;
  creatorId?: string;


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

  static newCommunity(limit: number, offset: number) {
    return new LectureRdoModel({
      college: '',
      channel: '',
      creatorId: tenantInfo.getTenantId(),
      cubeType: CubeType.Community,
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
