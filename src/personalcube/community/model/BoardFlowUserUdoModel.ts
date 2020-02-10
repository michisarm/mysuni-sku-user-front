
import { NameValueList } from 'shared';
import { CubeIntroModel } from '../../cubeintro/model';
import { BoardModel } from './BoardModel';


export class BoardFlowUserUdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  cubeIntroNameValueList: NameValueList = new NameValueList();
  boardNameValueList: NameValueList = new NameValueList();

  constructor(cubeIntro: CubeIntroModel, board: BoardModel) {
    //
    this.cubeIntroNameValueList = CubeIntroModel.asNameValues(cubeIntro);
    this.boardNameValueList = BoardModel.asNameValues(board);
  }
}
