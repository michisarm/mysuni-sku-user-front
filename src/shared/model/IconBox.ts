import { decorate, observable } from 'mobx';
import { IconType } from '../../personalcube/personalcube/model/IconType';

export class IconBox {
  //
  iconType: IconType = IconType.SKUniversity;
  iconUrl: string = '';

  constructor(iconBox?: IconBox) {
    //
    if (iconBox) {
      //
      Object.assign(this, { ...iconBox });
    }
  }
}

decorate(IconBox, {
  iconType: observable,
  iconUrl: observable,
});
