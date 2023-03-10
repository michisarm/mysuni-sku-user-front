import { DramaEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdName } from 'shared/model';
import { PatronKey } from '../../shared/model/PatronKey';


export class SubsidiaryModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = new PatronKey();

  subsidiary: IdName = new IdName();
  isUse: boolean = false;
  time: number = 0;

  constructor(subsidiaryModel?: SubsidiaryModel) {
    //
    if (subsidiaryModel) {
      const subsidiary = subsidiaryModel.subsidiary && new IdName(subsidiaryModel.subsidiary) || this.subsidiary;

      Object.assign(this, { ...subsidiaryModel, subsidiary });
    }
  }
}

decorate(SubsidiaryModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  subsidiary: observable,
  isUse: observable,
  time: observable,
});
