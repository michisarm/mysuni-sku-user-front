import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { MediaType } from './MediaType';
import { MediaContentsModel } from './MediaContentsModel';
import { DatePeriod } from '../../../shared';

export class MediaModel implements DramaEntity {

  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  mediaType: MediaType = MediaType.LinkMedia;
  name: string = '';
  mediaContents: MediaContentsModel = new MediaContentsModel();
  learningPeriod: DatePeriod = new DatePeriod();          // 학습시작일 - 학습종료일
  time: number = 0;

  constructor(media?: MediaModel) {
    if (media) {
      const mediaContents = media.mediaContents && new MediaContentsModel(media.mediaContents) || this.mediaContents;
      const learningPeriod = media.learningPeriod && new DatePeriod(media.learningPeriod) || this.learningPeriod;
      Object.assign(this, { ...media, mediaContents, learningPeriod });
    }
  }
}

decorate(MediaModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,
  mediaContents: observable,
  name: observable,
  learningPeriod: observable,
  time: observable,
});
