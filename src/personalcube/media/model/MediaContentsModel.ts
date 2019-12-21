import { decorate, observable } from 'mobx';
import { ContentsProviderModel } from './ContentsProviderModel';
import { InternalMediaConnectionModel } from './InternalMediaConnectionModel';

export class MediaContentsModel {
  contentsProvider: ContentsProviderModel = new ContentsProviderModel();  // cp사
  internalMedias: InternalMediaConnectionModel[] = [];                                             // 내부제작 미디어 (Video/Audio : panopto-sessionID)
  linkMediaUrl: string = '';                                              // 외부 미디어 link url

  constructor(mediaContents?: MediaContentsModel) {
    if (mediaContents) {
      const contentsProvider = mediaContents.contentsProvider && new ContentsProviderModel(mediaContents.contentsProvider)
        || this.contentsProvider;
      const internalMedias = mediaContents.internalMedias && mediaContents.internalMedias.length
      && mediaContents.internalMedias.map(internalMedia => new InternalMediaConnectionModel(internalMedia)) || this.internalMedias;
      Object.assign(this, { ...mediaContents, contentsProvider, internalMedias });
    }
  }
}

decorate(MediaContentsModel, {
  contentsProvider: observable,
  internalMedias: observable,
  linkMediaUrl: observable,
});

