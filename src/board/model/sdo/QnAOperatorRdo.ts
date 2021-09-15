import { QnaState } from '../vo/QnaState';
import PageModel from '../../../shared/components/Pagination/model/PageModel';

export default class QnAOperatorRdo {
  //
  offset: number = 0;
  limit: number = 0;
  state?: QnaState;

  constructor(qnAOperatorRdo?: QnAOperatorRdo) {
    if (qnAOperatorRdo) {
      Object.assign(this, { ...qnAOperatorRdo });
    }
  }

  static asQnaOperatorRdo(pageModel: PageModel, state?: QnaState) {
    //
    return {
      offset: pageModel.offset,
      limit: pageModel.limit,
      state,
    };
  }
}
