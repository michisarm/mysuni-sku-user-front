
import { observable, action } from 'mobx';
import { autobind } from '@nara.platform/accent';

import { NewPageModel } from 'shared';


@autobind
class NewPageService {

  static instance: NewPageService;

  @observable
  pageMap: Map<string, NewPageModel> = new Map();


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
  initPageMap(key: string, limit: number,  pageNo: number) {
    //
    this.pageMap.set(key, new NewPageModel(limit, pageNo));
  }

  @action
  setTotalCount(key: string, totalCount: number) {
    //
    const pageSet = { ...this.pageMap.get(key) } as NewPageModel;

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
    const pageSet = { ...this.pageMap.get(key) } as NewPageModel;

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
    const pageSet = { ...this.pageMap.get(key) } as NewPageModel;

    if (!pageSet) {
      return;
    }
    pageSet.totalCount = totalCount;
    pageSet.totalPages = Math.ceil(totalCount / pageSet.limit);
    pageSet.nextOffset = pageNo * pageSet.limit;
    pageSet.pageNo = pageNo;

    this.pageMap.set(key, pageSet);
  }
}

NewPageService.instance = new NewPageService();

export default NewPageService;
