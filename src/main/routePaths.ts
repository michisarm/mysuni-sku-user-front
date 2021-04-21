

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
    routePaths.introductionTab('College', subTab ? `?subTab=${subTab === 'BM Design & Storytelling' ? 'BM%20Design%20%26%20Storytelling' : encodeURI(subTab)}` : ''),
    
  introductionCertification: () =>
    routePaths.introductionTab('Certification'),

  currentPage: (pageNo: number) =>
    `./${pageNo}`,
};

export default routePaths;
