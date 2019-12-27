import { axiosApi as axios } from '@nara.platform/accent';
import { BoardFlowUserCdoModel } from '../../model/BoardFlowUserCdoModel';
import { BoardFlowUserUdoModel } from '../../model/BoardFlowUserUdoModel';
import { BoardFlowUdoModel } from '../../model/BoardFlowUdoModel';


export default class BoardFlowApi {
  URL = '/api/personalCube/boards/flow';

  static instance: BoardFlowApi;

  //TODO:: 임시 화면에서 안쓰일거 같음
  makeBoard(boardFlowCdo: any) {
    //
    return axios.post<string>(this.URL, boardFlowCdo)
      .then(response => response && response.data || '')
      .catch((reason) => {
        console.log(reason);
      });
  }

  makeBoardByUser(boardFlowUserCdoModel: BoardFlowUserCdoModel) {
    //
    return axios.post<string>(this.URL + '/byUser', boardFlowUserCdoModel)
      .then(response => response && response.data || '');
  }

  modifyBoardByUser(personalCubeId: string, boardFlowUserUdoModel: BoardFlowUserUdoModel ) {
    //
    return axios.put<void>(this.URL +  `/byUser/${personalCubeId}`, boardFlowUserUdoModel);
  }

  modifyBoard(personalCubeId: string, boardFlowUdoModel: BoardFlowUdoModel ) {
    //
    return axios.put<void>(this.URL +  `/${personalCubeId}`, boardFlowUdoModel);
  }

  removeBoard(personalCubeId: string) {
    //
    return axios.delete(this.URL + `/${personalCubeId}`);
  }
}

Object.defineProperty(BoardFlowApi, 'instance', {
  value: new BoardFlowApi(),
  writable: false,
  configurable: false,
});
