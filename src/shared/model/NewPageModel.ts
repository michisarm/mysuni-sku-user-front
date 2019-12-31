
import { decorate, observable } from 'mobx';


class PageModel {
  //
  limit: number;
  pageNo: number;
  nextOffset: number;
  totalCount: number;
  totalPages: number;


  constructor(limit: number, pageNo: number,) {
    //
    this.limit = limit;
    this.pageNo = pageNo;
    this.nextOffset = pageNo * limit;
    this.totalCount = 0;
    this.totalPages = 0;
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
