import { decorate, observable } from 'mobx';
import { tenantInfo } from '@nara.platform/dock';
import { CubeType } from 'shared';


class MyTrainingRdoModel {
  //
  limit: number = 0;
  offset: number = 0;
  denizenKey?: string;
  cubeType?: CubeType;
  state?: string;
  required?: boolean;
  channelIds?: string[];


  constructor(myTrainingRdo?: MyTrainingRdoModel) {
    //
    if (myTrainingRdo) {
      Object.assign(this, { ...myTrainingRdo });
    }
  }

  static new(limit: number, offset: number, channelIds: string[]) {
    //
    return new MyTrainingRdoModel({
      limit,
      offset,
      denizenKey: tenantInfo.getTenantId(),
      channelIds,
    });
  }

  static newWithCubeType(cubeType: CubeType, limit: number, offset: number) {
    //
    return new MyTrainingRdoModel({
      limit,
      offset,
      denizenKey: tenantInfo.getTenantId(),
      cubeType,
    });
  }

  static newWithState(state: string, limit: number, offset: number, channelIds: string[]) {
    //
    return new MyTrainingRdoModel({
      limit,
      offset,
      denizenKey: tenantInfo.getTenantId(),
      state,
      channelIds,
    });
  }

  static newWithRequired(limit: number, offset: number, channelIds: string[]) {
    //
    return new MyTrainingRdoModel({
      limit,
      offset,
      denizenKey: tenantInfo.getTenantId(),
      required: true,
      channelIds,
    });
  }
}

decorate(MyTrainingRdoModel, {
  limit: observable,
  offset: observable,
  denizenKey: observable,
  state: observable,
  required: observable,
  cubeType: observable,
  channelIds: observable,
});

export default MyTrainingRdoModel;