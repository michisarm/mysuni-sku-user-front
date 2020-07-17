
const routePaths = {
  badge: () => '/certification/badge',
  badgeTab: (tab: string = 'AllBadgeList') => `/certification/badge/${tab}/pages/1`,
  badgeAllBadgeList: () => routePaths.badgeTab('AllBadgeList'),
  badgeChallengingBadgeList: () => routePaths.badgeTab('ChallengingBadgeList'),
  badgeEarnedBadgeList: () => routePaths.badgeTab('EarnedBadgeList'),

  badgeDetailPage: (badgeId: string) => `/certification/badge/badge-detail/${badgeId}`,

  currentPage: (pageNo: number) =>
    `./${pageNo}`,
};

export default routePaths;
