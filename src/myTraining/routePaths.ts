const routePaths = {
  learning: () => '/my-training/learning',
  learningTab: (tab: string = 'InProgress') =>
    `/my-training/learning/${tab}/pages/1`,
  learningInProgress: () => routePaths.learningTab('InProgress'),
  learningInMyList: () => routePaths.learningTab('InMyList'),
  learningEnrolled: () => routePaths.learningTab('Enrolled'),
  learningRequired: () => routePaths.learningTab('Required'),
  learningCompleted: () => routePaths.learningTab('Completed'),
  learningRetry: () => routePaths.learningTab('Retry'),

  myPage: () => '/my-training/my-page',
  myProfile: (tab: string = 'MyProfile') => `/my-training/my-page/${tab}`,
  // 시작 EarnedStampList -> EarnedBadgeList 로 변경 20200911
  //myPageTab: (tab: string = 'CompletedList') => `/my-training/my-page/${tab}/pages/1`,
  myPageTab: (tab: string = 'EarnedBadgeList') =>
    `/my-training/my-page/${tab}/pages/1`,
  //  myPageEarnedBadgeList -> 추가 20200911
  myPageCompletedList: () => routePaths.myPageTab('CompletedList'),
  myPageMyLearningSummary: () => routePaths.myPageTab('MyLearningSummary'),
  myPageEarnedBadgeList: () => routePaths.myPageTab('EarnedBadgeList'),
  myPageEarnedStampList: () => routePaths.myPageTab('EarnedStampList'),
  myPageProfile: () => routePaths.myProfile('MyProfile'),

  //playlist
  myPagePlaylist: (tab: string = 'Playlist') => `/my-training/my-page/${tab}`,
  myPagePlaylistDetail: (playlistId: string) =>
    `/my-training/my-page/Playlist/detail/${playlistId}`,

  //myPageApprovalList: () => routePaths.myPageTab('ApprovalList'),

  myPageNoteTab: (
    tab: string = 'EarnedBadgeList',
    subTab: string = 'pages/1'
  ) => `/my-training/my-page/${tab}/${subTab}`,
  myPageEarnedNoteList: () => routePaths.myPageNoteTab('EarnedNoteList'),

  approval: () => '/approval',
  approvalTab: (tab: string = 'PaidCourse') => `/approval/${tab}/pages/1`,
  approvalPaidCourse: () => routePaths.approvalTab('PaidCourse'),
  approvalPersonalLearning: () => routePaths.approvalTab('PersonalLearning'),
  approvalPersonalLearningDetail: (page: string, aplId: string) =>
    `/approval/PersonalLearning/${page}/${aplId}`,

  myPageLearning: () => '/my-training/learning',
  myPageLearningTab: (tab: string = 'Completed') =>
    `/my-training/learning/${tab}/pages/1`,
  myPageLearningCompleted: () => routePaths.myPageLearningTab('Completed'),

  community: () => '/my-training/community',
  communityTab: (tab: string = 'MyCommunity') =>
    `/my-training/community/${tab}`,
  communityMyCommunity: () => routePaths.communityTab('MyCommunity'),
  communityMyCreatedCommunity: () =>
    routePaths.communityTab('MyCreatedCommunity'),
  communityMyFeed: () => routePaths.communityTab('MyFeed'),

  newLearningTab: (tab: string) => `/my-training/new-learning/${tab}/pages/1`,
  learningRqdLecture: () => routePaths.newLearningTab('Required'),
  learningNewLecture: () => routePaths.newLearningTab('New'),
  learningPopLecture: () => routePaths.newLearningTab('Popular'),
  learningLrsLecture: (type: string) => `/my-training/new-learning/Recommend/${type}/pages/1`,
  learningEnrLecture: () => routePaths.newLearningTab('Enrolling'),

  createPersonalCubeDetail: (personalCubeId: string, cubeType: string) =>
    `/personalcube/create/cubes/cube/${personalCubeId}/${cubeType}`,
  createSharedDetail: (
    personalCubeId: string,
    cubeType: string,
    cubeState: string
  ) =>
    `/personalcube/create/cubes/shared/${personalCubeId}/${cubeType}/${cubeState}`,
  approvalCubesDetail: (studentId: string) =>
    `/my-training/my-page/ApprovalList/detail/${studentId}`,

  approvalManagerDetailPage: () => `/my-training/my-page/approval`,

  currentPage: (pageNo: number) => `./${pageNo}`,
};

export default routePaths;
