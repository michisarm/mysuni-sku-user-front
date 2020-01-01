

const routePaths = {

  learning: (tab: string = 'InProgress') => `/my-training/${tab}`,
  learningInProgress: () => routePaths.learning('InProgress'),
  learningInMyList: () => routePaths.learning('InMyList'),
  learningEnrolled: () => routePaths.learning('Enrolled'),
  learningRequired: () => routePaths.learning('Required'),
  learningCompleted: () => routePaths.learning('Completed'),
  learningRetry: () => routePaths.learning('Retry'),

  community: (tab: string = 'MyCommunity') => `/community/${tab}`,
  communityMyCommunity: () => routePaths.community('MyCommunity'),
  communityMyCreatedCommunity: () => routePaths.community('MyCreatedCommunity'),
  communityMyFeed: () => routePaths.community('MyFeed'),
};

export default routePaths;
