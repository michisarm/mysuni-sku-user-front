import { DomainEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

export class CategoryModel implements DomainEntity {
  //
  id: string = '';
  entityVersion: number = 0;

  name: string = '';
  boardId: string = '';
  categoryId: string = '';
  deleted: boolean = false;
  time: number = 0;

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
  time: observable,

});
