import { RequestChannel } from '../vo/RequestChannel';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';

export default class QuestionSdo {
  //
  requestChannel: RequestChannel = RequestChannel.QnA;

  mainCategoryId: string = '';
  subCategoryId: string = '';

  relatedCardId: string = '';
  relatedQuestionId: string = '';

  title: string = '';
  content: string = '';

  depotId: string = '';

  static isBlank(post: QuestionSdo): string {
    if (!post.title) return getPolyglotText('제목', 'support-QnaWrite-제목');
    if (!post.mainCategoryId) return getPolyglotText('문의유형', 'support-QnaWrite-문의유형');
    if (!post.subCategoryId) return getPolyglotText('문의유형', 'support-QnaWrite-문의유형');
    if (!post.content || !post.content) return getPolyglotText('내용', 'support-QnaWrite-내용');;
    return 'success';
  }
}
