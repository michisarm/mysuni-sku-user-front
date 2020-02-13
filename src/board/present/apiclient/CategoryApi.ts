
import { axiosApi as axios } from '@nara.platform/accent';
import CategoryModel from '../../model/CategoryModel';


class CategoryApi {

  URL = '/api/board/categories';

  static instance: CategoryApi;

  findCategoriesByBoardId(boardId : string) {
    return axios.get<CategoryModel[]>(this.URL + `/${boardId}`)
      .then(response => response && response.data || null);
  }

  findCategoryByCategoryId(categoryId: string) {
    //
    return axios.get<CategoryModel>(this.URL + `/category/${categoryId}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(CategoryApi, 'instance', {
  value: new CategoryApi(),
  writable: false,
  configurable: false,
});

export default CategoryApi;
