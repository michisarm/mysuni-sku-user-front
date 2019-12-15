import { decorate, observable } from 'mobx';
import { OwnerType } from './OwnerType';
import { IconType } from '../../personalcube/personalcube/model/IconType';

export class OwnershipModel {
  name: string = '';
  ownerType: OwnerType = OwnerType.SK;
  iconType: IconType = IconType.Personal;
  fileBoxId: string = '';
  iconUrl: string = '';
  base64Icon: string = '';

  constructor(ownership?: OwnershipModel) {
    if (ownership) {
      Object.assign(this, { ...ownership });
      this.ownerType = ownership.ownerType && ownership.ownerType || OwnerType.SK;
      this.iconType = ownership.iconType && ownership.iconType || IconType.Personal;
    }
  }
}

decorate(OwnershipModel, {
  name: observable,
  ownerType: observable,
  iconType: observable,
  fileBoxId: observable,
  iconUrl: observable,
  base64Icon: observable,
});
