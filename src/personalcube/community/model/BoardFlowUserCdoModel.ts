import { CubeIntroCdoModel } from '../../cubeintro/model/CubeIntroCdoModel';
import { BoardCdoModel } from './BoardCdoModel';

export class BoardFlowUserCdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  cubeId: string ='';
  cubeIntroCdo: CubeIntroCdoModel = new CubeIntroCdoModel();
  boardCdo: BoardCdoModel = new BoardCdoModel();

  constructor(personalCubeId: string, cubeIntroCdo: CubeIntroCdoModel, boardCdo: BoardCdoModel) {
    if (personalCubeId && cubeIntroCdo && boardCdo) {
      this.audienceKey = 'r2p8-r@nea-m5-c5';
      this.cubeIntroCdo = cubeIntroCdo;
      this.cubeId = personalCubeId;
      this.boardCdo = boardCdo;
    }
  }
}
