import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { DatePeriod, NameValueList } from 'shared-model';
import { MediaType } from './MediaType';
import { MediaContentsModel } from './MediaContentsModel';
import { MediaCdoModel } from './MediaCdoModel';

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

  static  asNameValues(media: MediaModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'name',
          value: media.name,
        },
        {
          name: 'mediaType',
          value: media.mediaType,
        },
        {
          name: 'mediaContents',
          value: JSON.stringify(media.mediaContents),
        },
        {
          name: 'learningPeriod',
          value: JSON.stringify(media.learningPeriod),
        },
      ],
    };

    return asNameValues;
  }

  static asCdo(media: MediaModel): MediaCdoModel {
    //
    return (
      {
        audienceKey: 'r2p8-r@nea-m5-c5',
        mediaType: media.mediaType,
        name: media.name,
        mediaContents: media.mediaContents,
        learningPeriod: media.learningPeriod,
      }
    );
  }

}

decorate(MediaModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,
  mediaType: observable,
  mediaContents: observable,
  name: observable,
  learningPeriod: observable,
  time: observable,
});
