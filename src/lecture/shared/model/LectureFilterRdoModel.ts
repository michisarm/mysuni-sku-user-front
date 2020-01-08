import { decorate, observable } from 'mobx';
import { DenizenKey } from '@nara.platform/accent';
import OrderByType from './OrderByType';


class LectureFilterRdoModel {
  //
  denizenKey?: DenizenKey = {} as DenizenKey;
  orderBy: OrderByType = OrderByType.Time;
  companyCode?: string;
  offset: number = 0;
  limit: number = 0;
  channelIds?: string[];


  constructor(lectureRdo?: LectureFilterRdoModel) {
    //
    if (lectureRdo) {
      Object.assign(this, { ...lectureRdo });
    }
  }

  static new(limit: number, offset: number, channelIds?: string[]) {
    //
    return new LectureFilterRdoModel({
      orderBy: OrderByType.Time,
      limit,
      offset,
      channelIds,
    });
  }
}

decorate(LectureFilterRdoModel, {
  orderBy: observable,
  limit: observable,
  offset: observable,
});

export default LectureFilterRdoModel;
