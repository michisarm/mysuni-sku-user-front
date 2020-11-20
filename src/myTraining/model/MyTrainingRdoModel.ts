import { decorate, observable } from 'mobx';
import { patronInfo } from '@nara.platform/dock';
import { CubeType } from 'shared/model';


class MyTrainingRdoModel {
  //
  limit: number = 0;
  offset: number = 0;
  denizenKey?: string = '';
  cubeType?: CubeType;
  state?: string = '';
  required?: boolean;
  channelIds?: string[];
  /* 메인페이지에서 호출하는지 확인하기 위한 프로퍼티. */
  pageName?: string = '';


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
      denizenKey: patronInfo.getDenizenId(),
      channelIds,
    });
  }

  static newWithCubeType(cubeType: CubeType, limit: number, offset: number) {
    //
    return new MyTrainingRdoModel({
      limit,
      offset,
      denizenKey: patronInfo.getDenizenId(),
      cubeType,
    });
  }

  static newWithState(state: string, limit: number, offset: number, channelIds: string[]) {
    //
    return new MyTrainingRdoModel({
      limit,
      offset,
      denizenKey: patronInfo.getDenizenId(),
      state,
      channelIds,
    });
  }

  static newWithStateFromMain(state: string, limit: number, offset: number, channelIds: string[], pageName: string) {
    //
    return new MyTrainingRdoModel({
      limit,
      offset,
      denizenKey: patronInfo.getDenizenId(),
      state,
      channelIds,
      pageName
    });
  }

  static newWithRequired(limit: number, offset: number, channelIds: string[]) {
    //
    return new MyTrainingRdoModel({
      limit,
      offset,
      denizenKey: patronInfo.getPatronId(),
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
