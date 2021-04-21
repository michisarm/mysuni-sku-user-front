import { NewDatePeriod } from 'shared/model/NewDatePeriod';
import { MediaContents } from './MediaContents';
import { MediaType } from './MediaType';

export default interface Media {
  id: string;
  entityVersion: number;

  mediaType: MediaType;
  name: string;
  mediaContents: MediaContents;
  learningPeriod: NewDatePeriod; // 학습시작일 - 학습종료일
  time: number;

  patronKey: {
    keyString: 'string';
  };
}
