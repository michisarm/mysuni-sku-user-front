import { decorate, observable } from 'mobx';
import { PatronType } from '@nara.platform/accent';
import { tenantInfo } from '@nara.platform/dock';


class InMyLectureRdoModel {
  //
  limit: number = 0;
  offset: number = 0;
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

  static new(limit: number, offset: number) {
    //
    return new InMyLectureRdoModel({
      limit,
      offset,
      denizenKey: {
        keyString: tenantInfo.getTenantId(),
        patronType: PatronType.Audience,
      },
    });
  }
}

decorate(InMyLectureRdoModel, {
  limit: observable,
  offset: observable,
  denizenKey: observable,
});

export default InMyLectureRdoModel;
