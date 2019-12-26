
import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';

import { PageModel } from 'shared-model';


@autobind
class PageService {

  static instance: PageService;

  @observable
  pageMap: Map<string, PageModel> = new Map();


  @action
  clearPageMap(key: string | string[]) {
    //
    if (Array.isArray(key)) {
      key.map(mapKey => this.pageMap.delete(mapKey));
    } else {
      this.pageMap.delete(key);
    }
  }

  @action
  initPageMap(key: string, offset: number, limit: number) {
    //
    this.pageMap.set(key, new PageModel(offset, limit));
  }

  @action
  setTotalCount(key: string, totalCount: number) {
    //
    const pageSet = { ...this.pageMap.get(key) } as PageModel;

    if (!pageSet) {
      return;
    }
    pageSet.totalCount = totalCount;
    pageSet.totalPages = Math.ceil(totalCount / pageSet.limit);

    this.pageMap.set(key, pageSet);
  }

  @action
  setPageNo(key: string, pageNo: number) {
    //
    const pageSet = { ...this.pageMap.get(key) } as PageModel;

    if (!pageSet) {
      return;
    }
    pageSet.nextOffset = (pageNo - 1) * pageSet.limit;
    pageSet.pageNo = pageNo;

    this.pageMap.set(key, pageSet);
  }

  @action
  setTotalCountAndPageNo(key: string, totalCount: number, pageNo: number) {
    //
    const pageSet = { ...this.pageMap.get(key) } as PageModel;

    if (!pageSet) {
      return;
    }
    pageSet.totalCount = totalCount;
    pageSet.totalPages = Math.ceil(totalCount / pageSet.limit);
    // pageSet.offset = (pageNo - 1) * pageSet.limit;
    pageSet.nextOffset = pageNo * pageSet.limit;
    pageSet.pageNo = pageNo;

    this.pageMap.set(key, pageSet);
  }
}

PageService.instance = new PageService();

export default PageService;
