import { decorate, observable } from 'mobx';
import IdName from './IdName';
import CategoryColorType from './CategoryColorType';


export class CategoryModel {

  college: IdName = new IdName();
  channel: IdName = new IdName();
  color?: CategoryColorType = CategoryColorType.Default;


  constructor(category?: CategoryModel) {
    //
    if (category) {
      const college = category.college && new IdName(category.college) || this.college;
      const channel = category.channel && new IdName(category.channel) || this.channel;
      Object.assign(this, { college, channel });

      this.color = CategoryModel.getColor(college);
    }
  }

  static getColor(college: IdName) {
    //
    let color = CategoryColorType.Default;

    switch (college.name) {
      case 'AI':
        color = CategoryColorType.AI;
        break;
      case 'DT':
        color = CategoryColorType.DT;
        break;
      case 'Global':
        color = CategoryColorType.Global;
        break;
      case 'Leadership':
        color = CategoryColorType.Leadership;
        break;
      case 'Management':
        color = CategoryColorType.Management;
        break;
      case 'SV':
        color = CategoryColorType.SV;
        break;
      case '행복':
        color = CategoryColorType.Happiness;
        break;
      case '혁신디자인':
        color = CategoryColorType.InnovationDesign;
        break;
    }
    return color;
  }
}

decorate(CategoryModel, {
  college: observable,
  channel: observable,
});
