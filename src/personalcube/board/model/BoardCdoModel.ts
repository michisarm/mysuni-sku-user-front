import { BoardConfigModel } from './BoardConfigModel';
import { NewDatePeriod } from '../../../shared/model/NewDatePeriod';

export class BoardCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  name: string = '';
  config: BoardConfigModel = new BoardConfigModel();
  learningPeriod: NewDatePeriod = new NewDatePeriod();
}
