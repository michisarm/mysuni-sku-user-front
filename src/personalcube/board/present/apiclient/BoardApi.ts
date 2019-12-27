import { axiosApi as axios } from '@nara.platform/accent';
import { BoardModel } from '../../model/BoardModel';


export default class BoardApi {
  URL = '/api/personalCube/boards';

  static instance: BoardApi;

  findBoard(boardId: string) {
    //
    return axios.get<BoardModel>(this.URL + `/${boardId}`)
      .then(response => response && response.data || null);
  }

}

Object.defineProperty(BoardApi, 'instance', {
  value: new BoardApi(),
  writable: false,
  configurable: false,
});
