import { getAxios } from '../api/Axios';
import { AxiosReturn } from '../api/AxiosReturn';

const BASE_URL = '/api/learning/bookmarks';

interface BookMark {
  cardId: string;
}

function findAllBookMarkCardIds(): Promise<BookMark[] | undefined> {
  const axios = getAxios();

  return axios.get<BookMark[]>(`${BASE_URL}/cardIds`).then(AxiosReturn);
}

export async function reqeustBookmark() {
  const bookmarks = (await findAllBookMarkCardIds()) || [];
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
