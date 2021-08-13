interface WorkSpace {
  cineroomWorkspaces: {
    id: string;
    roles: string[];
    tenantId: string;
  }[];
  pavilionWorkspaces: null;
  squareWorkspaces: null;
  stationWorkspaces: null;
}

export function isCollegeManager() {
  const workspace: WorkSpace = JSON.parse(
    localStorage.getItem('nara.workspaces') || ''
  );

  const isCollegeManager = workspace.cineroomWorkspaces
    .map((cineroom) => cineroom)
    .some((cineroom) => cineroom.roles.includes('CollegeManager'));

  return isCollegeManager;
}
