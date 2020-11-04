

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
  // 시작 EarnedStampList -> EarnedBadgeList 로 변경 20200911
  //myPageTab: (tab: string = 'CompletedList') => `/my-training/my-page/${tab}/pages/1`,
  myPageTab: (tab: string = 'EarnedBadgeList') => `/my-training/my-page/${tab}/pages/1`,
  //  myPageEarnedBadgeList -> 추가 20200911
  myPageCompletedList: () => routePaths.myPageTab('CompletedList'),
  myPageEarnedBadgeList: () => routePaths.myPageTab('EarnedBadgeList'),
  myPageEarnedStampList: () => routePaths.myPageTab('EarnedStampList'),
  //myPageApprovalList: () => routePaths.myPageTab('ApprovalList'),


  approval: () => '/approval',
  approvalTab: (tab: string = 'ApprovalList') => `/approval/${tab}/pages/1`,
  myApprovalList: () => routePaths.approvalTab('ApprovalList'),
  myApprovalAddPersonalLearning: () => routePaths.approvalTab('ApprovalAddPersonalLearning'),


  myPageLearning: () => '/my-training/learning',
  myPageLearningTab: (tab: string = 'Completed') => `/my-training/learning/${tab}/pages/1`,
  myPageLearningCompleted: () => routePaths.myPageLearningTab('Completed'),

  community: () => '/my-training/community',
  communityTab: (tab: string = 'MyCommunity') => `/my-training/community/${tab}`,
  communityMyCommunity: () => routePaths.communityTab('MyCommunity'),
  communityMyCreatedCommunity: () => routePaths.communityTab('MyCreatedCommunity'),
  communityMyFeed: () => routePaths.communityTab('MyFeed'),

  newLearningTab: (tab: string) => `/my-training/new-learning/${tab}/pages/1`,
  learningRqdLecture: () => routePaths.newLearningTab('Required'),
  learningNewLecture: () => routePaths.newLearningTab('New'),
  learningPopLecture: () => routePaths.newLearningTab('Popular'),
  learningLrsLecture: () => routePaths.newLearningTab('Recommend'),


  createPersonalCubeDetail: (personalCubeId: string, cubeType: string) => `/personalcube/create/cubes/cube/${personalCubeId}/${cubeType}`,
  createSharedDetail: (personalCubeId: string, cubeType: string, cubeState: string) => `/personalcube/create/cubes/shared/${personalCubeId}/${cubeType}/${cubeState}`,
  approvalCubesDetail: (studentId: string) => `/my-training/my-page/ApprovalList/detail/${studentId}`,

  approvalManagerDetailPage: () =>
    `/my-training/my-page/approval`,

  currentPage: (pageNo: number) =>
    `./${pageNo}`,
};

export default routePaths;
