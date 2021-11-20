import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

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
    //error
  }

  function get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R | undefined> {
    try {
      return axios.get(url, config);
    } catch {
      return Promise.resolve<R | undefined>(undefined);
    }
  }

  function post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R | undefined> {
    try {
      return axios.post(url, data, config);
    } catch {
      return Promise.resolve(undefined);
    }
  }

  function put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R | undefined> {
    try {
      return axios.put(url, data, config);
    } catch {
      return Promise.resolve(undefined);
    }
  }

  function patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R | undefined> {
    try {
      return axios.patch(url, data, config);
    } catch {
      return Promise.resolve(undefined);
    }
  }

  function deletePost<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R | undefined> {
    try {
      return axios.delete(url, config);
    } catch {
      return Promise.resolve(undefined);
    }
  }

  const nextAxios = {
    get,
    post,
    put,
    patch,
    delete: deletePost,
  };
  return nextAxios;
}

export function paramsSerializer(paramObj: Record<string, any>) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    if (paramObj[key] !== undefined) {
      params.append(key, paramObj[key]);
    }
  }
  return params.toString();
}
