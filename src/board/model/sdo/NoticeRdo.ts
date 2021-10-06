import PageModel from '../../../shared/components/Pagination/model/PageModel';

export default class NoticeRdo {
  offset: number = 0;
  limit: number = 10;
  keyword: string = '';
  boardType: string = 'Notice';

  constructor(noticeRdo?: NoticeRdo) {
    //
    if (noticeRdo) {
      Object.assign(this, { ...noticeRdo });
    }
  }

  static asNoticeRdo(keyword: string, pageModel: PageModel) {
    //
    return new NoticeRdo({
      keyword,
      offset: pageModel.offset,
      limit: pageModel.limit,
      boardType: 'Notice',
    } as NoticeRdo);
  }
}
