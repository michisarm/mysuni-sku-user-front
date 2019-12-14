import { DomainEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdName } from '../../shared/model/IdName';
import { BoardConfigModel } from './BoardConfigModel';

export class BoardModel implements DomainEntity {
  //
  id: string = '';
  entityVersion: number = 0;

  builder: IdName = new IdName();
  builtTime: number = 0;
  boardId: string = '';
  title: string = '';

  config: BoardConfigModel = new BoardConfigModel();

  constructor(board?: BoardModel) {
    if (board) {
      //
      const builder = board.builder && new IdName(board.builder) || this.builder;
      const config = board.config && new BoardConfigModel(board.config) || this.config;

      Object.assign(this, { ...board, builder, config });

    }
  }
}

decorate(BoardModel, {
  id: observable,
  entityVersion: observable,

  builder: observable,
  builtTime: observable,
  boardId: observable,
  title: observable,

  config: observable,

});
