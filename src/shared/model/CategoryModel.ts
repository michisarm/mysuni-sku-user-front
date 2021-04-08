import { decorate, observable } from 'mobx';
import IdName from './IdName';
import CategoryColorType from './CategoryColorType';
import { Category } from './Category';
import {
  getChannelName,
  getCollgeName,
} from '../service/useCollege/useRequestCollege';

export class CategoryModel {
  college: IdName = new IdName();
  channel: IdName = new IdName();
  color?: CategoryColorType = CategoryColorType.Default;

  constructor(category?: CategoryModel | Category) {
    //
    if (category !== undefined) {
      if (category instanceof CategoryModel) {
        const college =
          (category.college && new IdName(category.college)) || this.college;
        const channel =
          (category.channel && new IdName(category.channel)) || this.channel;
        Object.assign(this, { college, channel });
      } else {
        this.college.id = category.collegeId;
        this.college.name = getCollgeName(category.collegeId) || '';
        this.channel.id = category.channelId;
        this.channel.name = getChannelName(category.channelId) || '';
      }

      this.color = CategoryModel.getColor(this.college);
    }
  }

  static getColor(college: IdName) {
    //
    let color = CategoryColorType.Default;

    switch (college.id) {
      case 'CLG00001':
        color = CategoryColorType.AI;
        break;
      case 'CLG00002':
        color = CategoryColorType.DT;
        break;
      case 'CLG00006':
        color = CategoryColorType.Global;
        break;
      case 'CLG00007':
        color = CategoryColorType.Leadership;
        break;
      case 'CLG00008':
        color = CategoryColorType.Management;
        break;
      case 'CLG00004':
        color = CategoryColorType.SV;
        break;
      case 'CLG00003':
        color = CategoryColorType.Happiness;
        break;
      case 'CLG00019':
        color = CategoryColorType.SemicondDesign;
        break;
      case 'CLG00005':
        color = CategoryColorType.InnovationDesign;
        break;
      case 'CLG00020':
        color = CategoryColorType.BMDesign;
        break;
      case 'CLG0001c':
        color = CategoryColorType.EnergySolution;
    }
    return color;
  }
}

decorate(CategoryModel, {
  college: observable,
  channel: observable,
});
