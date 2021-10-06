export default class SearchSdo {
  //
  keyword: string = '';
  offset: number = 0;
  limit: number = 0;

  static fromKeyword(keyword: string, offset: number, limit: number): SearchSdo {
    //
    return {
      keyword,
      offset,
      limit
    }
  }
}
