import { decorate, observable } from 'mobx';
import { patronInfo } from '@nara.platform/dock';
import { CubeType } from 'shared';
import OrderByType from './OrderByType';


class LectureRdoModel {
  //
  college: string = '';
  channel: string = '';
  orderBy: OrderByType = OrderByType.Time;
  limit: number = 0;
  offset: number = 0;
  channelLimit: number = 0;
  channelOffset: number = 0;

  cubeType?: CubeType;
  creatorId?: string;


  constructor(lectureRdo?: LectureRdoModel) {
    //
    if (lectureRdo) {
      Object.assign(this, { ...lectureRdo });
    }
  }

  static newWithCollege(collegeId: string, limit: number, offset: number, orderBy: OrderByType) {
    //
    return new LectureRdoModel({
      college: collegeId,
      channel: '',
      orderBy,
      limit,
      offset,
      channelLimit: 0,
      channelOffset: 0,
    });
  }

  static newWithChannel(channelId: string, limit: number, offset: number, orderBy: OrderByType) {
    //
    return new LectureRdoModel({
      college: '',
      channel: channelId,
      orderBy,
      limit,
      offset,
      channelLimit: 0,
      channelOffset: 0,
    });
  }

  static newCommunity(limit: number, offset: number) {
    return new LectureRdoModel({
      college: '',
      channel: '',
      orderBy: OrderByType.Time,
      creatorId: patronInfo.getPatronId(),
      cubeType: CubeType.Community,
      limit,
      offset,
      channelLimit: 0,
      channelOffset: 0,
    });
  }

  static newRecommend(channelLimit: number, channelOffset: number, limit: number, offset: number, channel?: string, orderBy?: OrderByType) {
    return new LectureRdoModel({
      college: '',
      channel: channel || '',
      orderBy: orderBy || OrderByType.Time,
      channelLimit,
      channelOffset,
      limit,
      offset,
    });
  }

  static newShared(limit: number, offset: number) {
    return new LectureRdoModel({
      college: '',
      channel: '',
      orderBy: OrderByType.Time,
      creatorId: patronInfo.getPatronId(),
      limit,
      offset,
      channelLimit: 0,
      channelOffset: 0,
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
