import { OfficeWebCdoModel } from './OfficeWebCdoModel';
import { CubeIntroCdoModel } from '../../cubeintro/model/CubeIntroCdoModel';

export class OfficeWebFlowUserCdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  cubeId: string ='';
  cubeIntroCdo: CubeIntroCdoModel = new CubeIntroCdoModel();
  officeWebCdo: OfficeWebCdoModel = new OfficeWebCdoModel();

  constructor(personalCubeId: string, cubeIntroCdo: CubeIntroCdoModel, officeWebCdo: OfficeWebCdoModel) {
    if (personalCubeId && cubeIntroCdo && officeWebCdo) {
      this.audienceKey = 'r2p8-r@nea-m5-c5';
      this.cubeId = personalCubeId;
      this.cubeIntroCdo = cubeIntroCdo;
      this.officeWebCdo = officeWebCdo;
    }
  }
}

