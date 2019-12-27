import { action, configure, observable, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import BoardFlowApi from '../apiclient/BoardFlowApi';
import BoardApi from '../apiclient/BoardApi';
import { BoardModel } from '../../model/BoardModel';
import { CubeIntroModel } from '../../../cubeintro';
import { BoardFlowUserCdoModel } from '../../model/BoardFlowUserCdoModel';
import { BoardFlowUserUdoModel } from '../../model/BoardFlowUserUdoModel';
import { PersonalCubeModel } from '../../../personalcube';
import { BoardFlowUdoModel } from '../../model/BoardFlowUdoModel';

configure({
  enforceActions: 'observed',
});

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

  modifyBoardByUser(personalCubeId: string, cubeIntro: CubeIntroModel, board: BoardModel) {
    this.boardFlowApi.modifyBoardByUser(personalCubeId, new BoardFlowUserUdoModel(cubeIntro, board));
  }

  modifyBoard(personalCubeId: string, cube: PersonalCubeModel, cubeIntro: CubeIntroModel, board: BoardModel) {
    this.boardFlowApi.modifyBoard(personalCubeId, new BoardFlowUdoModel(cube, cubeIntro, board));
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
