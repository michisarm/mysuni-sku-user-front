
export default class PageModel {
  offset: number;
  limit: number;
  count: number;
  page: number;
  totalPages: number;

  constructor(offset: number, limit: number) {
    this.offset = offset;
    this.limit = limit;
    this.count = 0;
    this.page = 1;
    this.totalPages = 1;
  }
}
