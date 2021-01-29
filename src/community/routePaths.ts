const routePaths = {
  community: () => '/community/main',
  communityTab: (tab: string = 'MyCommunity') => `/my-training/community/${tab}`,
  communityMyCommunity: () => routePaths.communityTab('MyCommunity'),
  communityMyCreatedCommunity: () => routePaths.communityTab('MyCreatedCommunity'),
  communityMyFeed: () => routePaths.communityTab('MyFeed'),

  communityTab2: (tab: string = 'MyCommunity') => `/community/${tab}`,
  myCommunity: () => routePaths.communityTab2('main'),
  communityList: () => routePaths.communityTab2('main/open-communities'),
  follow: () => routePaths.communityTab2('main/follow'),
}

export default routePaths;