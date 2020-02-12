import { decorate, observable } from 'mobx';
import { IdName, CubeState } from 'shared/model';

export class PersonalCubeRequestCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  personalCube: IdName = new IdName();
  actor: IdName = new IdName();
  cubeState: CubeState = CubeState.OpenApproval;
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

decorate(PersonalCubeRequestCdoModel, {
  audienceKey: observable,
  personalCube: observable,
  actor: observable,
  cubeState: observable,
  remark: observable,
});
