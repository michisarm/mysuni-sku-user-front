
import { decorate, observable } from 'mobx';


class PageModel {
  //
  offset: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  pageNo: number;

  constructor(offset: number, limit: number) {
    this.offset = offset;
    this.limit = limit;
    this.totalCount = 0;
    this.totalPages = 0;
    this.pageNo = 0;
  }
}

decorate(PageModel, {
  offset: observable,
  limit: observable,
  totalCount: observable,
  totalPages: observable,
  pageNo: observable,
});

export default PageModel;
