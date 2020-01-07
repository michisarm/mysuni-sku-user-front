import { decorate, observable } from 'mobx';
import { tenantInfo } from '@nara.platform/dock';
import { CubeType } from 'shared';
import OrderByType from './OrderByType';


class LectureRdoModel {
  //
  college: string = '';
  channel: string = '';
  orderBy: OrderByType = OrderByType.Time;
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

  static newWithCollege(collegeId: string, limit: number, offset: number, orderBy: OrderByType) {
    //
    return new LectureRdoModel({
      college: collegeId,
      channel: '',
      orderBy,
      limit,
      offset,
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
    });
  }

  static newCommunity(limit: number, offset: number) {
    return new LectureRdoModel({
      college: '',
      channel: '',
      orderBy: OrderByType.Time,
      creatorId: tenantInfo.getTenantId(),
      cubeType: CubeType.Community,
      limit,
      offset,
    });
  }

  static newRecommend(limit: number, offset: number, channel?: string, orderBy?: OrderByType) {
    return new LectureRdoModel({
      college: '',
      channel: channel || '',
      orderBy: orderBy ? orderBy : OrderByType.Time,
      limit,
      offset,
    });
  }

  static newShared(limit: number, offset: number) {
    return new LectureRdoModel({
      college: '',
      channel: '',
      orderBy: OrderByType.Time,
      creatorId: tenantInfo.getTenantId(),
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
