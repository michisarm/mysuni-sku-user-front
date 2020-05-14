

const routePaths = {

  learning: () => '/my-training/learning',
  learningTab: (tab: string = 'InProgress') => `/my-training/learning/${tab}/pages/1`,
  learningInProgress: () => routePaths.learningTab('InProgress'),
  learningInMyList: () => routePaths.learningTab('InMyList'),
  learningEnrolled: () => routePaths.learningTab('Enrolled'),
  learningRequired: () => routePaths.learningTab('Required'),
  learningCompleted: () => routePaths.learningTab('Completed'),
  learningRetry: () => routePaths.learningTab('Retry'),

  myPage: () => '/my-training/my-page',
  myPageTab: (tab: string = 'CompletedList') => `/my-training/my-page/${tab}/pages/1`,
  myPageCompletedList: () => routePaths.myPageTab('CompletedList'),
  myPageEarnedStampList: () => routePaths.myPageTab('EarnedStampList'),
  myPageApprovalList: () => routePaths.myPageTab('ApprovalList'),

  community: () => '/my-training/community',
  communityTab: (tab: string = 'MyCommunity') => `/my-training/community/${tab}`,
  communityMyCommunity: () => routePaths.communityTab('MyCommunity'),
  communityMyCreatedCommunity: () => routePaths.communityTab('MyCreatedCommunity'),
  communityMyFeed: () => routePaths.communityTab('MyFeed'),


  approvalManagerDetailPage: () =>
    `/my-training/my-page/approval`,

  currentPage: (pageNo: number) =>
    `./${pageNo}`,
};

export default routePaths;
