
import { decorate, observable } from 'mobx';
import IdName from './IdName';


class CategoryModel {
  //
  main: IdName;
  sub?: IdName;

  constructor(main: IdName, sub?: IdName) {
    //
    this.main = main;
    this.sub = sub;
  }
}

decorate(CategoryModel, {
  main: observable,
  sub: observable,
});

export default CategoryModel;
