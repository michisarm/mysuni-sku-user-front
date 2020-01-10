import { MediaContentsModel } from './MediaContentsModel';
import { NewDatePeriod } from '../../../shared/model/NewDatePeriod';

export class MediaCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  mediaType: string = '';
  name: string = '';
  mediaContents: MediaContentsModel = new MediaContentsModel();
  learningPeriod: NewDatePeriod = new NewDatePeriod();
}
