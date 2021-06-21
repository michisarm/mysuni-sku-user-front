import { axiosApi } from "@nara.platform/accent";
import Note from "../model/Note";

const BASE_URL = '/api/mytraining';

export function getLectureNote(cardId: string, cubeId: string) {
  const url = `${BASE_URL}/note/list/${cardId}/${cubeId}/?limit=999&offset=0`;
  return axiosApi.get<Note>(url)
    .then(response => response && response.data)
    .catch(error => {
    return null
    });
}

export function addLectureNote(param: any) {
  const url = `${BASE_URL}/note`;
  return axiosApi.post<any>(url, param)
    .then(response => response && response.data)
    .catch(error => {
      return null
    });
}

export function deleteLectureNote(param: any) {
  const url = `${BASE_URL}/note/${param.noteId}`;
  return axiosApi.delete(url)
    .then(response => response && response.data)
    .catch(error => {
      return null
    });
}

export function modifyLectureNote(id: string, param: any) {
  const url = `${BASE_URL}/note/${id}`;
  return axiosApi.put(url, param)
    .then(response => response && response.data)
    .catch(error => {
      return null
    });
}