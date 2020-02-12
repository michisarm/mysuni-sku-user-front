
import { decorate, observable, computed } from 'mobx';
import { IdName } from 'shared/model';
import ContentsProviderType from './ContentsProviderType';

export class ContentsProviderModel {
  //
  contentsProviderType: IdName = new IdName();  //cp사
  url: string = '';                             //CP사 미디어 url

  constructor(contentsProvider?: ContentsProviderModel) {
    if (contentsProvider) {
      const contentsProviderType = contentsProvider.contentsProviderType && new IdName(contentsProvider.contentsProviderType)
        || this.contentsProviderType;
      Object.assign(this, { ...contentsProvider, contentsProviderType });
    }
  }

  @computed
  get isLinkedInType() {
    //
    return this.contentsProviderType.name === ContentsProviderType.LinkedIn;
  }
}

decorate(ContentsProviderModel, {
  contentsProviderType: observable,
  url: observable,
});

