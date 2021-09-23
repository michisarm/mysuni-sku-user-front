import { RequestChannel } from '../vo/RequestChannel';

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
    if (!post.title) return '제목';
    if (!post.mainCategoryId) return '문의유형';
    if (!post.subCategoryId) return '문의유형';
    if (!post.content || !post.content) return '내용';
    return 'success';
  }
}
