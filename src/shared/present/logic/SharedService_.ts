import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';

import PageModel from '../model/PageModel';

@autobind
class SharedService {

  static instance: SharedService;

  @observable
  modalMap = new Map();

  @observable
  pageMap = new Map();

  @action
  changeModal(key: string, value: boolean) {
    this.modalMap.set(key, value);
  }

  @action
  setPageMap(key: string, offset: number, limit: number) {

    this.pageMap.set(key, new PageModel(offset, limit));
  }

  @action
  initPageMap(key: string) {
    if (Array.isArray(key)) {
      key.forEach(mapKey => this.pageMap.delete(mapKey));
    } else {
      this.pageMap.delete(key);
    }
  }

  @action
  initModalMap(key: string) {
    if (Array.isArray(key)) {
      key.forEach(mapKey => this.modalMap.delete(mapKey));
    } else {
      this.modalMap.delete(key);
    }
  }

  @action
  setCount(key: string, count: number) {
    const pageSet = { ...this.pageMap.get(key) };
    if (!pageSet) {
      return;
    }

    pageSet.count = count;
    pageSet.totalPages = Math.ceil(count / pageSet.limit);

    this.pageMap.set(key, pageSet);
  }

  @action
  setPage(key: string, page: number) {
    const pageSet = { ...this.pageMap.get(key) };
    if (!pageSet) {
      return;
    }

    pageSet.offset = (page - 1) * pageSet.limit;
    pageSet.page = page;

    this.pageMap.set(key, pageSet);
  }
}

SharedService.instance = new SharedService();

export default SharedService;
