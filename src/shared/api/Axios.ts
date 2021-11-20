import axios from 'axios';

export interface Workspace {
  id: string;
  tenantId: string;
}

export function getAxios() {
  try {
    const storage = localStorage;
    const token = storage.getItem('nara.token') || '';
    const Authorization = `Bearer ${token}`;
    const cineroomId = storage.getItem('nara.cineroomId') || '';
    const workspaces: { cineroomWorkspaces?: Workspace[] } =
      JSON.parse(storage.getItem('nara.workspaces') || '') || {};
    const audienceId =
      workspaces.cineroomWorkspaces?.find(({ id }) => id === cineroomId)
        ?.tenantId || '';
    axios.defaults.headers = { audienceId, Authorization };
  } catch (error) {
    console.error('not logind', error);
  }
  return axios;
}
