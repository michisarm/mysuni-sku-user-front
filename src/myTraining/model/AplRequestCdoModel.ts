import { decorate, observable } from 'mobx';
import { AplState } from './AplState';
import {IdName} from '../../shared/model';

export class AplRequestCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  /*personalCube: IdName = new IdName();*/
  actor: IdName = new IdName();
  aplState: AplState = AplState.Created;
  remark: string = '';

  // constructor(personalCubeRequestCdoModel?: PersonalCubeRequestCdoModel) {
  //   //
  //   if (personalCubeRequestCdoModel) {
  //     const cube = personalCubeRequestCdoModel.personalCube && new IdName(personalCubeRequestCdoModel.personalCube) || this.personalCube;
  //     const actor = personalCubeRequestCdoModel.actor && new IdName(personalCubeRequestCdoModel.actor) || this.actor;
  //
  //     Object.assign(this, { ...personalCubeRequestCdoModel, cube, actor });
  //   }
  // }
}

decorate(AplRequestCdoModel, {
  audienceKey: observable,
  /*personalCube: observable,*/
  actor: observable,
  aplState: observable,
  remark: observable,
});
