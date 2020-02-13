
import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import _ from 'lodash';
import BoardApi from '../apiclient/BoardApi';
import BoardModel from '../../model/BoardModel';


@autobind
class BoardService {
  //
  static instance: BoardService;

  boardApi: BoardApi;

  @observable
  board: BoardModel = {} as BoardModel;

  @observable
  boards: BoardModel[] = [];

  constructor(boardApi: BoardApi) {
    this.boardApi = boardApi;
  }

  @action
  async findBoardByBoardId(boardId: string) {
    const boards = await this.boardApi.findBoardByBoardId(boardId);
    return runInAction(() => this.boards = boards.map(board => new BoardModel(board)));
  }

  @action
  changeBoardProps(name: string, value: string) {
    //
    this.board = _.set(this.board, name, value);
  }

  @action
  clearBoard() {
    //
    this.board = {} as BoardModel;
  }
}

Object.defineProperty(BoardService, 'instance', {
  value: new BoardService(BoardApi.instance),
  writable: false,
  configurable: false,
});

export default BoardService;
