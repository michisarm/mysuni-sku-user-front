import { CubeIntroCdoModel } from '../../cubeintro/model/CubeIntroCdoModel';
import { MediaCdoModel } from './MediaCdoModel';
import { PersonalCubeCdoModel } from '../../../personalcube/personalcube/model/PersonalCubeCdoModel';

export class MediaFlowCdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  personalCubeCdo: PersonalCubeCdoModel = new PersonalCubeCdoModel();
  cubeIntroCdo: CubeIntroCdoModel = new CubeIntroCdoModel();
  mediaCdo: MediaCdoModel = new MediaCdoModel();

  constructor(personalCubeCdo: PersonalCubeCdoModel, cubeIntroCdo: CubeIntroCdoModel, mediaCdo: MediaCdoModel) {
    if (personalCubeCdo && cubeIntroCdo && mediaCdo) {
      this.audienceKey = 'r2p8-r@nea-m5-c5';
      this.personalCubeCdo = personalCubeCdo;
      this.cubeIntroCdo = cubeIntroCdo;
      this.mediaCdo = mediaCdo;
    }
  }
}
