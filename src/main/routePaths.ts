

const routePaths = {

  main: () =>
    '/',

  introduction: () =>
    '/introduction',

  introductionTab: (tab: string, queryParams?: string) =>
    `/introduction/${tab}${queryParams || ''}`,

  introductionMySuni: () =>
    routePaths.introductionTab('MySuni'),

  introductionCollege: (subTab?: string) =>
    routePaths.introductionTab('College', subTab ? `?subTab=${subTab}` : ''),

  introductionCertification: () =>
    routePaths.introductionTab('Certification'),

  currentPage: (pageNo: number) =>
    `./${pageNo}`,
};

export default routePaths;
