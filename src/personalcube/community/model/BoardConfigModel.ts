import { decorate, observable } from 'mobx';

export class BoardConfigModel {
  //

  commentForbidden: boolean = false;
  anonymousPostAllowed: boolean = false;
  anonymousCommentAllowed: boolean = false;
  enClosed: boolean = false;                  // 오픈형/폐쇄형 게시판 (true 일 경우만 대상자 uploads)
  unLimited: boolean = false;                 // 오픈형 기간 무제한

  constructor(config?: BoardConfigModel) {
    //
    if (config) {
      Object.assign(this, config);
    }
  }

}

decorate(BoardConfigModel, {
  commentForbidden: observable,
  anonymousCommentAllowed: observable,
  anonymousPostAllowed: observable,
  enClosed: observable,
  unLimited: observable,
});
