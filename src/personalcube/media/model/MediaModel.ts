import { computed, decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { NameValueList } from 'shared/model';
import { MediaType } from './MediaType';
import { MediaContentsModel } from './MediaContentsModel';
import { MediaCdoModel } from './MediaCdoModel';
import { NewDatePeriod } from '../../../shared/model/NewDatePeriod';

export class MediaModel implements DramaEntity {

  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  mediaType: MediaType = MediaType.LinkMedia;
  name: string = '';
  mediaContents: MediaContentsModel = new MediaContentsModel();
  learningPeriod: NewDatePeriod = new NewDatePeriod();          // 학습시작일 - 학습종료일
  time: number = 0;

  constructor(media?: MediaModel) {
    if (media) {
      const mediaContents = media.mediaContents && new MediaContentsModel(media.mediaContents) || this.mediaContents;
      const learningPeriod = media.learningPeriod && new NewDatePeriod(media.learningPeriod) || this.learningPeriod;
      Object.assign(this, { ...media, mediaContents, learningPeriod });
    }
  }

  @computed
  get getInternalMedias() {
    return this.mediaContents && this.mediaContents.internalMedias;
  }

  @computed
  get internalMedias() {
    return this.mediaContents && this.mediaContents.internalMedias;
  }

  @computed
  get linkMediaUrl() {
    return this.mediaContents && this.mediaContents.linkMediaUrl;
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
        // {
        //   name: 'learningPeriod',
        //   value: JSON.stringify(media.learningPeriod),
        // },
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
        // learningPeriod: media.learningPeriod,
      }
    );
  }

  static isBlank(media: MediaModel) : string {
    //
    if (!media.mediaContents) {
      return 'success';
    }

    if (!media.mediaType) return '교육자료를 입력해주세요';

    if (media.mediaType === MediaType.LinkMedia) {
      if (!media.mediaContents.linkMediaUrl) {
        return '외부 영상 url을 입력해주세요';
      }
      else if (!media.mediaContents.linkMediaUrl.includes('http://') && !media.mediaContents.linkMediaUrl.includes('https://')) {
        return '정확한 url을 입력해주세요';
      }
    }
    if (media.mediaType === MediaType.ContentsProviderMedia) {
      if (!media.mediaContents.contentsProvider.url) {
        return 'cp 영상 url을 입력해주세요';
      }
      else if (!media.mediaContents.contentsProvider.url.includes('http://') && !media.mediaContents.contentsProvider.url.includes('https://')) {
        return '정확한 url을 입력해주세요';
      }
    }
    if (media.mediaType === MediaType.InternalMedia && !media.mediaContents.internalMedias.length) {
      return '내부 영상을 선택해주세요';
    }
    if (media.mediaContents.linkMediaUrl && media.mediaContents.linkMediaUrl.indexOf('sku.ap.panopto.com') !== -1) {
      return 'sku.ap.panopto.com 동영상은 “교육자료” 항목에서 “내부 영상”을 선택하여 “동영상 선택” 버튼을 통해 등록해주시기 바랍니다.';
    }
    if (media.mediaContents.contentsProvider && media.mediaContents.contentsProvider.url.indexOf('sku.ap.panopto.com') !== -1) {
      return 'sku.ap.panopto.com 동영상은 “교육자료” 항목에서 “내부 영상”을 선택하여 “동영상 선택” 버튼을 통해 등록해주시기 바랍니다.';
    }
    return 'success';
  }

}

decorate(MediaModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,
  mediaType: observable,
  mediaContents: observable,
  name: observable,
  // learningPeriod: observable,
  time: observable,
});
