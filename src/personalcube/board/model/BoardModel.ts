import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { computed, decorate, observable } from 'mobx';
import { NameValueList } from 'shared';
import { BoardConfigModel } from './BoardConfigModel';
import { BoardCdoModel } from './BoardCdoModel';
import { NewDatePeriod } from '../../../shared/model/NewDatePeriod';

export class BoardModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;

  name: string = '';
  boardConfig: BoardConfigModel = new BoardConfigModel();
  learningPeriod: NewDatePeriod = new NewDatePeriod();
  config: BoardConfigModel = new BoardConfigModel();
  time: number = 0;

  patronKey: PatronKey = {} as PatronKey;

  constructor(board?: BoardModel) {
    //
    if (board) {
      const boardConfig = board.boardConfig && new BoardConfigModel(board.boardConfig) || this.boardConfig;
      const learningPeriod = board.learningPeriod && new NewDatePeriod(board.learningPeriod) || this.learningPeriod;
      const config = board.config && new BoardConfigModel(board.config) || this.config;

      Object.assign(this, { ...board, boardConfig, learningPeriod, config });
    }
  }

  static  asNameValues(board: BoardModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'name',
          value: board.name,
        },
        {
          name: 'config',
          value: JSON.stringify(board.config),
        },
        {
          name: 'learningPeriod',
          value: JSON.stringify(board.learningPeriod),
        },
      ],
    };

    return asNameValues;
  }

  static asCdo(board: BoardModel): BoardCdoModel {
    //
    return (
      {
        audienceKey: 'r2p8-r@nea-m5-c5',
        name: board.name,
        config: board.config,
        learningPeriod: board.learningPeriod,
      }
    );
  }

  @computed
  get timeStr() {
    if (this.time) return new Date(this.time).toLocaleDateString();
    return '';
  }
}

decorate(BoardModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  name: observable,
  boardConfig: observable,
  learningPeriod: observable,
  config: observable,
  time: observable,
});
