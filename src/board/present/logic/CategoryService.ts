import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import _ from 'lodash';
import CategoryApi from '../apiclient/CategoryApi';
import CategoryModel from '../../model/CategoryModel';


@autobind
class CategoryService {
  //
  static instance: CategoryService;

  categoryApi: CategoryApi;

  @observable
  category: CategoryModel = {} as CategoryModel;

  @observable
  categorys: CategoryModel[] = [];

  constructor(categoryApi: CategoryApi) {
    this.categoryApi = categoryApi;
  }

  @action
  async findCategoriesByBoardId(boardId: string) {
    //
    const categorys = await this.categoryApi.findCategoriesByBoardId(boardId);
    return runInAction(() => this.categorys = categorys.map(category => new CategoryModel(category)));
  }

  @action
  async findCategoryByCategoryId(categoryId: string) {
    //
    const category = await this.categoryApi.findCategoryByCategoryId(categoryId);
    return runInAction(() => this.category = new CategoryModel(category));
  }

  @action
  changeCategoryProps(name: string, value: string | {}) {
    //
    this.category = _.set(this.category, name, value);
  }

  @action
  clearCategory() {
    //
    this.category = {} as CategoryModel;
  }
}

Object.defineProperty(CategoryService, 'instance', {
  value: new CategoryService(CategoryApi.instance),
  writable: false,
  configurable: false,
});

export default CategoryService;
