import { SkProfileService } from '../profile/stores';

const routePaths = {
  supportTab: (boardId: 'Notice' | 'FAQ' | 'Q&A' | 'Q&AMgt' | string) =>
    `/board/support/${boardId}`,

  supportNotice: () => {
    if (SkProfileService.instance.skProfile.language !== 'Korean') {
      return routePaths.supportTab('FAQ');
    }
    return routePaths.supportTab('Notice');
  },

  supportFAQ: () => routePaths.supportTab('FAQ'),

  supportQnA: () => routePaths.supportTab('Q&A'),

  supportQnAMgt: () => routePaths.supportTab('Q&AMgt'),

  supportNoticePost: (postId: string) =>
    `/board/support/notice-detail/${postId}`,

  supportFAQPost: (postId: string) => `/board/support/faq-detail/${postId}`,

  supportQnAPost: (postId: string) => `/board/support/qna-detail/${postId}`,

  supportQnAModifyPost: (postId: string) =>
    `/board/support/qna-modify/${postId}`,

  supportQnANewPost: () => `/board/support-qna`,

  supportQnAAnswer: (postId: string) =>
    `/board/support/answered-detail/${postId}`,

  supportQnAManagementPost: (qnaId: string) =>
    `/board/support/qna-management-detail/${qnaId}`,
};

export default routePaths;
