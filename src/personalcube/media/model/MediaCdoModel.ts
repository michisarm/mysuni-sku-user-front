import { MediaContentsModel } from './MediaContentsModel';
import { DatePeriod } from '../../../shared-model/DatePeriod';

export class MediaCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  mediaType: string = '';
  name: string = '';
  mediaContents: MediaContentsModel = new MediaContentsModel();
  learningPeriod: DatePeriod = new DatePeriod();
}
