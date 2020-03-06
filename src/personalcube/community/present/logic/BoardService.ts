
import { action, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import _ from 'lodash';

import { PersonalCubeModel } from '../../../personalcube/model';
import { CubeIntroModel } from '../../../cubeintro/model';
import BoardFlowApi from '../apiclient/BoardFlowApi';
import BoardApi from '../apiclient/BoardApi';
import { BoardModel } from '../../model/BoardModel';
import { BoardFlowUserCdoModel } from '../../model/BoardFlowUserCdoModel';
import { BoardFlowUserUdoModel } from '../../model/BoardFlowUserUdoModel';
import { BoardFlowUdoModel } from '../../model/BoardFlowUdoModel';


@autobind
export default class BoardService {
  //
  static instance: BoardService;

  boardApi: BoardApi;
  boardFlowApi: BoardFlowApi;

  @observable
  board: BoardModel= new BoardModel();

  constructor(boardApi: BoardApi, boardFlowApi: BoardFlowApi) {
    //
    this.boardApi = boardApi;
    this.boardFlowApi = boardFlowApi;
  }

  makeBoard(boardFlowCdo: any) {
    //
    return this.boardFlowApi.makeBoard(boardFlowCdo);
  }

  makeBoardByUser(personalCubeId: string, cubeIntro: CubeIntroModel, board: BoardModel) {
    //
    return this.boardFlowApi.makeBoardByUser(
      new BoardFlowUserCdoModel(
        personalCubeId,
        CubeIntroModel.asCdo(cubeIntro),
        BoardModel.asCdo(board)
      )
    );
  }

  async modifyBoardByUser(personalCubeId: string, cubeIntro: CubeIntroModel, board: BoardModel) {
    return this.boardFlowApi.modifyBoardByUser(personalCubeId, new BoardFlowUserUdoModel(cubeIntro, board));
  }

  async modifyBoard(personalCubeId: string, cube: PersonalCubeModel, cubeIntro: CubeIntroModel, board: BoardModel) {
    return this.boardFlowApi.modifyBoard(personalCubeId, new BoardFlowUdoModel(cube, cubeIntro, board));
  }

  @action
  changeBoardProps(name: string, value: string | Date | boolean, nameSub?: string, valueSub?: string) {
    //
    this.board = _.set(this.board, name, value);
    if (typeof value === 'object' && nameSub) this.board = _.set(this.board, nameSub, valueSub);
  }

  @action
  async findBoard(boardId: string) {
    const board = await this.boardApi.findBoard(boardId);
    runInAction(() => this.board = new BoardModel(board));
  }

  @action
  clearBoard() {
    //
    this.board = new BoardModel();
  }

  removeBoard(personalCubeId: string) {
    //
    this.boardFlowApi.removeBoard(personalCubeId);
  }
}


Object.defineProperty(BoardService, 'instance', {
  value: new BoardService(BoardApi.instance, BoardFlowApi.instance),
  writable: false,
  configurable: false,
});
