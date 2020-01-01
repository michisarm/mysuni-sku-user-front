

const routePaths = {

  myPage: (tab: string = 'InProgress') => `/mypage/${tab}`,
  myPageCompletedList: () => routePaths.myPage('CompletedList'),
  myPageEarnedStampList: () => routePaths.myPage('EarnedStampList'),
};

export default routePaths;
