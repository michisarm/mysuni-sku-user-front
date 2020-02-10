import { NameValueList } from 'shared';
import { CubeIntroModel } from '../../cubeintro';
import { PersonalCubeModel } from '../../personalcube';
import { BoardModel } from './BoardModel';

export class BoardFlowUdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  cubeNameValueList: NameValueList = new NameValueList();
  cubeIntroNameValueList: NameValueList = new NameValueList();
  boardNameValueList: NameValueList = new NameValueList();

  constructor(cube: PersonalCubeModel, cubeIntro: CubeIntroModel, board: BoardModel) {
    //
    this.cubeNameValueList = PersonalCubeModel.asNameValues(cube);
    this.cubeIntroNameValueList = CubeIntroModel.asNameValues(cubeIntro);
    this.boardNameValueList = BoardModel.asNameValues(board);
  }
}
