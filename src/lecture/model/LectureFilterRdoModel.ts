import { decorate, observable } from 'mobx';
import { DenizenKey } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import OrderByType from './OrderByType';
import SkProfileService from '../../profile/present/logic/SkProfileService';


interface Props {
  skProfileService?: SkProfileService,
}

class LectureFilterRdoModel {
  //
  denizenKey?: DenizenKey = {} as DenizenKey;
  orderBy: OrderByType = OrderByType.Time;
  companyCode?: string;
  offset: number = 0;
  limit: number = 0;
  channelIds?: string[];
  email?: string = patronInfo.getPatronEmail();


  constructor(lectureRdo?: LectureFilterRdoModel) {
    //
    if (lectureRdo) {
      Object.assign(this, { ...lectureRdo });
    }
  }

  static new(limit: number, offset: number, channelIds: string[]) {
    //
    return new LectureFilterRdoModel({
      orderBy: OrderByType.Time,
      limit,
      offset,
      channelIds,
    });
  }

  static newLectures(limit: number, offset: number, order: OrderByType=OrderByType.Time, channelIds: string[] = []) {
    //
    return new LectureFilterRdoModel({
      orderBy: order,
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
