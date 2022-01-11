import { axiosApi } from '@nara.platform/accent';
import Note from '../../../note/model/Note';

const BASE_URL = '/api/learning/notes';

export function getLectureNote(cubeId: string) {
  const url = `${BASE_URL}/byCubeId?cubeId=${cubeId}`;
  return axiosApi
    .get<Note>(url)
    .then((response) => response && response.data)
    .catch((error) => {
      return null;
    });
}

export function addLectureNote(param: any) {
  const url = `${BASE_URL}`;
  return axiosApi
    .post<any>(url, param)
    .then((response) => response && response.data)
    .catch((error) => {
      return null;
    });
}

export function deleteLectureNote(param: any) {
  const url = `${BASE_URL}/noteContents/${param.noteId}`;
  return axiosApi
    .delete(url)
    .then((response) => response && response.data)
    .catch((error) => {
      return null;
    });
}

export function modifyLectureNote(id: string, param: any) {
  const url = `${BASE_URL}/noteContents/${id}`;
  return axiosApi
    .put(url, param)
    .then((response) => response && response.data)
    .catch((error) => {
      return null;
    });
}
