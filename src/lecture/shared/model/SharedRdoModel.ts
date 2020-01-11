import { decorate, observable } from 'mobx';
import OrderByType from './OrderByType';


class SharedRdoModel {
  //
  college: string = '';
  channelIds?: string[];
  orderBy: OrderByType = OrderByType.Time;
  limit: number = 0;
  offset: number = 0;

  constructor(sharedRdo?: SharedRdoModel) {
    //
    if (sharedRdo) {
      Object.assign(this, { ...sharedRdo });
    }
  }

  static newShared(limit: number, offset: number, channelIds?:string[]) {
    return new SharedRdoModel({
      college: '',
      channelIds,
      orderBy: OrderByType.Time,
      limit,
      offset,
    });
  }
}

decorate(SharedRdoModel, {
  college: observable,
  channelIds: observable,
  limit: observable,
  offset: observable,
});

export default SharedRdoModel;
