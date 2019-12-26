import { DramaEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdName, PatronKey } from 'shared';
import { AreaType } from './AreaType';

export class ContentsProviderModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = new PatronKey();

  providerId: string = '';
  name: string = '';
  contentsProvider: IdName = new IdName();
  areaType: AreaType = AreaType.Internal;
  isUse: boolean = false;
  time: number = 0;

  constructor(contentsProvider?: ContentsProviderModel) {
    //
    if (contentsProvider) {
      //
      const newContentsProvider = contentsProvider.id && contentsProvider.name && { id: contentsProvider.id, name: contentsProvider.name };
      Object.assign(this, { ...contentsProvider, newContentsProvider });
    }
  }
}

decorate(ContentsProviderModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  providerId: observable,
  name: observable,
  areaType: observable,
  isUse: observable,
  time: observable,
});
