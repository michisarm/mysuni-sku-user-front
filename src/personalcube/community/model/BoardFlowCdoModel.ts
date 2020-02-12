import { PersonalCubeCdoModel } from '../../personalcube/model/PersonalCubeCdoModel';
import { CubeIntroCdoModel } from '../../cubeintro/model/CubeIntroCdoModel';
import { BoardCdoModel } from './BoardCdoModel';

export class BoardFlowCdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  personalCubeCdo: PersonalCubeCdoModel = new PersonalCubeCdoModel();
  cubeIntroCdo: CubeIntroCdoModel = new CubeIntroCdoModel();
  boardCdo: BoardCdoModel = new BoardCdoModel();

  constructor(personalCubeCdo: PersonalCubeCdoModel, cubeIntroCdo: CubeIntroCdoModel, boardCdo: BoardCdoModel) {
    if (personalCubeCdo && cubeIntroCdo && boardCdo) {
      this.audienceKey = 'r2p8-r@nea-m5-c5';
      this.personalCubeCdo = personalCubeCdo;
      this.cubeIntroCdo = cubeIntroCdo;
      this.boardCdo = boardCdo;
    }
  }
}
