import axios from 'axios';

interface Workspace {
  id: string;
  tenantId: string;
}

export function getAxios() {
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
  return axios;
}
