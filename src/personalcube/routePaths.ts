

const routePaths = {

  create: () => '/personalcube/create',
  createTab: (tab: string = 'Create') => `/personalcube/create/${tab}`,
  createCreate: () => routePaths.createTab('Create'),
  createShared: () => routePaths.createTab('Shared'),
  createNew: () => `/personalcube/create/detail/new`,
  createDetail: (personalCubeId: string, cubeType: string) => `/personalcube/create/detail/${personalCubeId}/${cubeType}`,
  createIntro: (personalCubeId: string, cubeType: string) => `/personalcube/create/intro/${personalCubeId}/${cubeType}`,
  createSharedDetail: (personalCubeId: string, cubeType: string, cubeState: string) => `/personalcube/create/shared/detail/${personalCubeId}/${cubeType}/${cubeState}`,
};

export default routePaths;
