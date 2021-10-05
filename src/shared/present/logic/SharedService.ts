import { action, observable } from 'mobx';
import { autobind } from '@nara.platform/accent';

import PageModel from '../../components/Pagination/model/PageModel';
import { SortFilterState } from '../../model/SortFilterState';

@autobind
class SharedService {
  static instance: SharedService;

  @observable
  modalMap = new Map();

  @observable
  pageMap = new Map<string, PageModel | any>();

  @action
  setInitDate(
    key: string,
    offset: number,
    limit?: number,
    sortFilter?: SortFilterState
  ) {
    const pageMap = this.pageMap.get(key);

    this.pageMap.set(key, { ...pageMap, offset, limit, sortFilter });
  }

  @action
  changeModal(key: string, value: boolean) {
    this.modalMap.set(key, value);
  }

  getPageModel(key: string): PageModel {
    //
    if (!this.pageMap.get(key)) {
      this.pageMap.set(key, new PageModel());
    }

    return this.pageMap.get(key);
  }

  @action
  setPageMap(key: string, offset: number, limit: number) {
    this.pageMap.set(key, new PageModel(offset, limit));
  }

  @action
  initPageMap(key: string) {
    if (Array.isArray(key)) {
      key.forEach((mapKey) => this.pageMap.delete(mapKey));
    } else {
      this.pageMap.delete(key);
    }
  }

  @action
  initModalMap(key: string) {
    if (Array.isArray(key)) {
      key.forEach((mapKey) => this.modalMap.delete(mapKey));
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
    pageSet.startNo = count - pageSet.offset;

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

  @action
  setSortFilter(key: string, sortFilter: SortFilterState) {
    //
    const pageSet = { ...this.pageMap.get(key) } as PageModel;
    if (!pageSet) {
      return;
    }

    pageSet.sortFilter = sortFilter;

    this.pageMap.set(key, pageSet);
  }
}

SharedService.instance = new SharedService();

export default SharedService;
