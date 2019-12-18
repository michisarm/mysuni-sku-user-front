import { decorate, observable } from 'mobx';
import { ContentsProviderModel } from './ContentsProviderModel';

export class MediaContentsModel {
  contentsProvider: ContentsProviderModel = new ContentsProviderModel();  // cp사
  internalMedia: string = '';                                             // 내부제작 미디어 (Video/Audio : panopto-sessionID)
  linkMediaUrl: string = '';                                              // 외부 미디어 link url

  constructor(mediaContents?: MediaContentsModel) {
    if (mediaContents) {
      const contentsProvider = mediaContents.contentsProvider && new ContentsProviderModel(mediaContents.contentsProvider)
        || this.contentsProvider;
      Object.assign(this, { ...mediaContents, contentsProvider });
    }
  }
}

decorate(MediaContentsModel, {
  contentsProvider: observable,
  internalMedia: observable,
  linkMediaUrl: observable,
});

