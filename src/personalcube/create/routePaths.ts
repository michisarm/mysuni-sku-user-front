

const routePaths = {

  create: (tab: string = 'Create') => `/personalcube/create/${tab}`,
  createCreate: () => routePaths.create('Create'),
  createShared: () => routePaths.create('Shared'),
};

export default routePaths;
