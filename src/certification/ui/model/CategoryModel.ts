
import {decorate, observable} from 'mobx';

class CategoryModel {
  //
  id: number = -1;
  categoryId: string= '';
  name: string = '';
  parentId: string = '';
  parentName: string = '';
  iconUrl: string = '';

  constructor(category?: CategoryModel) {
    //
    if (category) {
      Object.assign(this, {...category});
    }
  }
}

decorate(CategoryModel, {
  id: observable,
  categoryId: observable,
  name: observable,
  parentId: observable,
  parentName: observable,
  iconUrl: observable
});

export default CategoryModel;
