

const routePaths = {
  introduction: () =>
    '/introduction',

  introductionTab: (tab: string) =>
    `/introduction/${tab}`,

  introductionMySuni: () =>
    routePaths.introductionTab('MySuni'),

  introductionCollege: () =>
    routePaths.introductionTab('College'),

  introductionCertification: () =>
    routePaths.introductionTab('Certification'),
};

export default routePaths;
