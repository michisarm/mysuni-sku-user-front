const routePaths = {
  main: () => '/',

  introduction: () => '/introduction',

  introductionTab: (tab: string, queryParams?: string) =>
    `/introduction/${tab}${queryParams || ''}`,

  introductionAITab: (queryParams?: string) =>
    `/introduction/College?subTab=AI/${queryParams || ''}`,
  introductionDTTab: (queryParams?: string) =>
    `/introduction/College?subTab=DT/${queryParams || ''}`,
  introductionManagementTab: (queryParams?: string) =>
    `/introduction/College?subTab=Management/${queryParams || ''}`,

  introductionMySuni: () => routePaths.introductionTab('MySuni'),

  introductionCollege: (subTab?: string) =>
    routePaths.introductionTab(
      'College',
      subTab
        ? `?subTab=${
            subTab === 'BM Design & Storytelling'
              ? 'BM%20Design%20%26%20Storytelling'
              : encodeURI(subTab)
          }`
        : ''
    ),

  introductionCollegeAI: (subTabAI?: string) =>
    routePaths.introductionAITab(subTabAI ? `${encodeURI(subTabAI)}` : ''),
  introductionCollegeDT: (subTabDT?: string) =>
    routePaths.introductionDTTab(subTabDT ? `${encodeURI(subTabDT)}` : ''),
  introductionCollegeManagement: (subTabMg?: string) =>
    routePaths.introductionManagementTab(
      subTabMg ? `${encodeURI(subTabMg)}` : ''
    ),

  introductionCertification: () => routePaths.introductionTab('Certification'),

  currentPage: (pageNo: number) => `./${pageNo}`,
};

export default routePaths;
