
import { decorate, observable } from 'mobx';
import { IconType } from './IconType';


class IconBoxModel {
  //
  iconType: IconType = IconType.SKUniversity;
  iconUrl: string = '';
  baseUrl: string = '';

  constructor(iconBox?: IconBoxModel) {
    //
    if (iconBox) {
      //
      Object.assign(this, { ...iconBox });
    }
  }
}

decorate(IconBoxModel, {
  iconType: observable,
  iconUrl: observable,
  baseUrl: observable,
});

export default IconBoxModel;
