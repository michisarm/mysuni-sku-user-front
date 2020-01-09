import { decorate, observable } from 'mobx';
import { tenantInfo } from '@nara.platform/dock';
import { CubeType } from 'shared';


class MyFeedRdoModel {
  //
  limit: number = 0;
  offset: number = 0;
  read: boolean = false;


  constructor(myTrainingRdo?: MyFeedRdoModel) {
    //
    if (myTrainingRdo) {
      Object.assign(this, { ...myTrainingRdo });
    }
  }

  static new(limit: number, offset: number, read: boolean) {
    //
    return new MyFeedRdoModel({
      limit,
      offset,
      read
    });
  }

  static newDefault(limit: number, offset: number) {
    //
    const read: boolean = false;
    return new MyFeedRdoModel({
      limit,
      offset,
      read
    });
  }


}

decorate(MyFeedRdoModel, {
  limit: observable,
  offset: observable,
  read: observable
});

export default MyFeedRdoModel;
