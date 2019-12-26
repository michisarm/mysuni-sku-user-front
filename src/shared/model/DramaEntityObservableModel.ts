
import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';


class DramaEntityObservableModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;
}

decorate(DramaEntityObservableModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,
});

export default DramaEntityObservableModel;
