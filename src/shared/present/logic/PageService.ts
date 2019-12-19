
import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';

import PageModel from '../model/PageModel';


@autobind
class PageService {

  static instance: PageService;

  @observable
  pageMap: Map<string, PageModel> = new Map();


  @action
  initPageMap(key: string) {
    if (Array.isArray(key)) {
      key.map(mapKey => this.pageMap.delete(mapKey));
    } else {
      this.pageMap.delete(key);
    }
  }

  @action
  setPageMap(key: string, offset: number, limit: number) {

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
    pageSet.offset = (pageNo - 1) * pageSet.limit;
    pageSet.pageNo = pageNo;

    this.pageMap.set(key, pageSet);
  }
}

PageService.instance = new PageService();

export default PageService;
