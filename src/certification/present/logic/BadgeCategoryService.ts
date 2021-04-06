import { reactAutobind } from '@nara.platform/accent';
import { observable, computed, action, runInAction } from 'mobx';
import { BadgeCategory } from '../../model/BadgeCategory';
import { findAvailableBadgeCategories } from '../../api/BadgeCategoryApi';

@reactAutobind
export default class BadgeCategoryService {
  static instance: BadgeCategoryService;

  @observable
  _categories: BadgeCategory[] = [];

  @computed get categories(): BadgeCategory[] {
    return this._categories;
  }

  @action
  async findAllCategories(): Promise<void> {
    const foundCategories = await findAvailableBadgeCategories();

    if (foundCategories && foundCategories.length > 0) {
      runInAction(() => {
        this._categories = foundCategories;
      });
    }
  }

  @observable
  _selectedCategoryId: string = '';

  @computed get selectedCategoryId(): string {
    return this._selectedCategoryId;
  }

  @action
  setSelectedCategoryId(categoryId: string): void {
    this._selectedCategoryId = categoryId;
  }

  @action
  clearSelectedCategoryId(): void {
    this._selectedCategoryId = '';
  }
}

Object.defineProperty(BadgeCategoryService, 'instance', {
  value: new BadgeCategoryService(),
  writable: false,
  configurable: false,
});
