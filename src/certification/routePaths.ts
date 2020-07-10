
const routePaths = {
  badge: () => '/certification/badge',
  badgeTab: (tab: string = 'AllBadgeList') => `/certification/badge/${tab}/pages/1`,
  badgeAllBadgeList: () => routePaths.badgeTab('AllBadgeList'),
  badgeChallengingBadgeList: () => routePaths.badgeTab('ChallengingBadgeList'),
  badgeEarnedBadgeList: () => routePaths.badgeTab('EarnedBadgeList'),

  currentPage: (pageNo: number) =>
    `./${pageNo}`,
};

export default routePaths;
