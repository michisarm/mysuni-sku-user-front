import { DomainEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

class CategoryModel implements DomainEntity {
  //
  id: string = '';
  entityVersion: number = 0;

  name: PolyglotString | null = null;
  boardId: string = '';
  categoryId: string = '';
  deleted: boolean = false;
  // time: number = 0;
  registeredTime: number = 0;

  constructor(category?: CategoryModel) {
    if (category) {
      Object.assign(this, { ...category });
    }
  }
}

decorate(CategoryModel, {
  id: observable,
  entityVersion: observable,

  name: observable,
  boardId: observable,
  categoryId: observable,
  deleted: observable,
  registeredTime: observable,
});

export default CategoryModel;
