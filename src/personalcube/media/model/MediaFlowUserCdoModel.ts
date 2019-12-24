import { CubeIntroCdoModel } from '../../cubeintro/model/CubeIntroCdoModel';
import { MediaCdoModel } from './MediaCdoModel';

export class MediaFlowUserCdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  cubeId: string ='';
  cubeIntroCdo: CubeIntroCdoModel = new CubeIntroCdoModel();
  mediaCdo: MediaCdoModel = new MediaCdoModel();

  constructor(personalCubeId: string, cubeIntroCdo: CubeIntroCdoModel, mediaCdo: MediaCdoModel) {
    if ( personalCubeId && cubeIntroCdo && mediaCdo) {
      this.audienceKey = 'r2p8-r@nea-m5-c5';
      this.cubeIntroCdo = cubeIntroCdo;
      this.cubeId = personalCubeId;
      this.mediaCdo = mediaCdo;
    }
  }
}
