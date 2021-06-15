import { axiosApi } from '@nara.platform/accent';
import { MainPagePopupModel } from '../model/MainPagePopupModel';

const mainURL = '/api/board/popup/main';

//이메일 암호화
export function getMainPagePopupFirst() {
  return axiosApi.get<MainPagePopupModel>(mainURL)
    .then(response => response && response.data);
}

