import { getAxios } from '../api/Axios';
import { AxiosReturn } from '../api/AxiosReturn';

const BASE_URL = '/api/learning/bookmarks';

interface BookMark {
  cardId: string;
}

export function addBookMark(cardId: string): Promise<string[]> {
  const axios = getAxios();
  return axios
    .post<string[]>(`${BASE_URL}/byCardId?cardId=${cardId}`)
    .then((response) => (response && response.data) || []);
}

export function deleteBookMark(cardId: string): Promise<string[]> {
  const axios = getAxios();
  return axios
    .delete<string[]>(`${BASE_URL}/byCardId?cardId=${cardId}`)
    .then((response) => (response && response.data) || []);
}

function findAllBookMarkCardIds(): Promise<BookMark[] | undefined> {
  const axios = getAxios();

  return axios.get<BookMark[]>(`${BASE_URL}/cardIds`).then(AxiosReturn);
}

export async function requestBookmark() {
  const bookmarks = (await findAllBookMarkCardIds()) || [];
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
