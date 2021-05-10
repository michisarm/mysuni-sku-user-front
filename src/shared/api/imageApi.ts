import { getAxios } from "./Axios";
import { AxiosReturn } from "./AxiosReturn";

const BASE_URL = '/api/images-upload';

export function uploadFileProfile(file: File): Promise<string | undefined> {
  const formData = new FormData();
  formData.append('file', file);

  const axios = getAxios();
  const url = `${BASE_URL}/upload/profile`;
  return axios.post<string>(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(AxiosReturn);
}