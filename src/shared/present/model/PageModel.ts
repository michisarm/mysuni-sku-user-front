
import { decorate, observable } from 'mobx';


class PageModel {
  //
  nextOffset: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  pageNo: number;

  constructor(nextOffset: number, limit: number) {
    this.nextOffset = nextOffset;
    this.limit = limit;
    this.totalCount = 0;
    this.totalPages = 0;
    this.pageNo = 0;
  }
}

decorate(PageModel, {
  nextOffset: observable,
  limit: observable,
  totalCount: observable,
  totalPages: observable,
  pageNo: observable,
});

export default PageModel;
