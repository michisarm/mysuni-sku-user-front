import { DatePeriod } from 'shared';
import { BoardConfigModel } from './BoardConfigModel';

export class BoardCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  name: string = '';
  config: BoardConfigModel = new BoardConfigModel();
  learningPeriod: DatePeriod = new DatePeriod();
}
