

const routePaths = {

  supportTab: (boardId: 'Notice' | 'FAQ' | 'Q&A' | string) =>
    `/board/support/${boardId}`,

  supportNotice: () =>
    routePaths.supportTab('Notice'),

  supportFAQ: () =>
    routePaths.supportTab('FAQ'),

  supportQnA: () =>
    routePaths.supportTab('Q&A'),

  supportNoticePost: (postId: string) =>
    `/board/support/notice-detail/${postId}`,

  supportFAQPost: (postId: string) =>
    `/board/support/faq-detail/${postId}`,

  supportQnAPost: (postId: string) =>
    `/board/support/qna-detail/${postId}`,

  supportQnANewPost: () =>
    `/board/support-qna`,

  supportQnAAnswer: (postId: string) =>
    `/board/support/answered-detail/${postId}`,
};

export default routePaths;
