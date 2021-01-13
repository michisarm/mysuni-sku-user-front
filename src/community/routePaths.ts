const routePaths = {
  community: () => '/community/main',
  openCommunity: () => '/community/main/open-communities',
  communityTab: (tab: string = 'MyCommunity') => `/my-training/community/${tab}`,
  communityMyCommunity: () => routePaths.communityTab('MyCommunity'),
  communityMyCreatedCommunity: () => routePaths.communityTab('MyCreatedCommunity'),
  communityMyFeed: () => routePaths.communityTab('MyFeed'),
}

export default routePaths;