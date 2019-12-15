
import { observable, action } from 'mobx';
import autobind from'autobind-decorator';

import CategoryModel from '../../model/CategoryModel';


@autobind
class CategoryService {
  //
  static instance: CategoryService;

  // static categories = [
  //   new CategoryModel();
  //     id: 'ai', text: 'AI', sub: [
  //       { id: 'ai-all', path: '/lecture/category/ai', text: 'AI 전체보기' },
  //     ]},
  //   { id: 'dt', text: 'DT' },
  //   { id: 'happy', text: '행복' },
  //   { id: 'sv', text: 'SV' },
  //   { id: 'design', text: '혁신디자인' },
  //   { id: 'global', text: 'Global' },
  //   { id: 'leadership', text: 'Leadership' },
  //   { id: 'management', text: 'Management' },
  // ];

  @observable
  categories: CategoryModel[] = [];


  @action
  findCategories() {

  }
}

export default CategoryService;
