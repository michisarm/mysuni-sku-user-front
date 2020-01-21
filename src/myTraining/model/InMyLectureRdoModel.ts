
import { decorate, observable } from 'mobx';
import { PatronType } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';


class InMyLectureRdoModel {
  //
  limit: number = 0;
  offset: number = 0;
  serviceId?: string;
  serviceType?: string;
  channelIds?: string[];
  denizenKey?: {
    keyString: string,
    patronType: PatronType
  };

  constructor(inMyLectureRdo?: InMyLectureRdoModel) {
    //
    if (inMyLectureRdo) {
      Object.assign(this, { ...inMyLectureRdo });
    }
  }

  static new(limit: number, offset: number, channelIds: string[]) {
    //
    return new InMyLectureRdoModel({
      limit,
      offset,
      denizenKey: {
        keyString: patronInfo.getPatronId() || '',
        patronType: PatronType.Audience,
      },
      channelIds,
    });
  }

  static newWithSingle(serviceId: string, serviceType: string) {
    //
    return new InMyLectureRdoModel({
      limit: 0,
      offset: 0,
      denizenKey: {
        keyString: patronInfo.getPatronId() || '',
        patronType: PatronType.Audience,
      },
      serviceId,
      serviceType,
    });
  }
}

decorate(InMyLectureRdoModel, {
  limit: observable,
  offset: observable,
  denizenKey: observable,
  serviceId: observable,
  serviceType: observable,
  channelIds: observable,
});

export default InMyLectureRdoModel;
