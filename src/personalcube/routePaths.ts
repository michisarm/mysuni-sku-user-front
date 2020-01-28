

const routePaths = {
  create: () => '/personalcube/create',
  createTab: (tab: string = 'Create') => `/personalcube/create/${tab}`,
  createCreate: () => routePaths.createTab('Create'),
  createShared: () => routePaths.createTab('Shared'),
  createNew: () => `/personalcube/create/cubes/new`,
  createPersonalCubeDetail: (personalCubeId: string, cubeType: string) => `/personalcube/create/cubes/cube/${personalCubeId}/${cubeType}`,
  createCubeIntroDetail: (personalCubeId: string, cubeType: string) => `/personalcube/create/cubes/intro/${personalCubeId}/${cubeType}`,
  createSharedDetail: (personalCubeId: string, cubeType: string, cubeState: string) => `/personalcube/create/cubes/shared/${personalCubeId}/${cubeType}/${cubeState}`,
};

export default routePaths;
