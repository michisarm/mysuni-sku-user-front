import { OfficeWebCdoModel } from './OfficeWebCdoModel';
import { PersonalCubeCdoModel } from '../../personalcube/model/PersonalCubeCdoModel';
import { CubeIntroCdoModel } from '../../cubeintro/model/CubeIntroCdoModel';

export class OfficeWebFlowCdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  personalCubeCdo: PersonalCubeCdoModel = new PersonalCubeCdoModel();
  cubeIntroCdo: CubeIntroCdoModel = new CubeIntroCdoModel();
  officeWebCdo: OfficeWebCdoModel = new OfficeWebCdoModel();

  constructor(personalCubeCdo: PersonalCubeCdoModel, cubeIntroCdo: CubeIntroCdoModel, officeWebCdo: OfficeWebCdoModel) {
    if (personalCubeCdo && cubeIntroCdo && officeWebCdo) {
      this.audienceKey = 'r2p8-r@nea-m5-c5';
      this.personalCubeCdo = personalCubeCdo;
      this.cubeIntroCdo = cubeIntroCdo;
      this.officeWebCdo = officeWebCdo;
    }
  }
}
