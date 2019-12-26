import { decorate, observable } from 'mobx';
import { IdName } from 'shared-model';

export class ContentsProviderModel {
  contentsProviderType: IdName = new IdName();  //cp사
  url: string = '';                             //CP사 미디어 url

  constructor(contentsProvider?: ContentsProviderModel) {
    if (contentsProvider) {
      const contentsProviderType = contentsProvider.contentsProviderType && new IdName(contentsProvider.contentsProviderType)
        || this.contentsProviderType;
      Object.assign(this, { ...contentsProvider, contentsProviderType });
    }
  }
}

decorate(ContentsProviderModel, {
  contentsProviderType: observable,
  url: observable,
});

