import axios from 'axios';
import { BoardModel } from '../../model/BoardModel';

export default class BoardApi {

  URL = '/api/board/boards';

  static instance: BoardApi;

  registerMetro(board: BoardModel) {
    //
    return axios.post<string>(this.URL, board)
      .then(response => response && response.data || null);
  }

  registerBoard(board: BoardModel) {
    return axios.post<string>(this.URL, board)
      .then(response => response && response.data || null);
  }

  findBoardByBoardId(boardId : string) {
    return axios.get<BoardModel[]>(this.URL + `/${boardId}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(BoardApi, 'instance', {
  value: new BoardApi(),
  writable: false,
  configurable: false,
});
