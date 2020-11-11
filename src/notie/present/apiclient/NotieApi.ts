
import { axiosApi } from '@nara.platform/accent';
import MentionModel from 'notie/model/MentionModel';


class NotieApi {
  //
  static instance: NotieApi;

  baseUrl = '/api/notie';
  feedBaseUrl = '/api/notie/feed';

  hasQuickLearningFeeds() {
    return axiosApi.get<boolean>(this.feedBaseUrl + `/quickmenu/learning`)
      .then(response => response.data.valueOf());
  }

  countMenuNoties(notieType: string) {
    return axiosApi.get<number>(this.feedBaseUrl + `/tab?feedType=${notieType}`)
      .then(response => response.data.valueOf());
  }

  readNotie(notieType: string) {
    axiosApi.put<void>(this.feedBaseUrl + `/type?feedType=${notieType}`);
  }

  findAllMyNotieMentions() {
    return axiosApi.get<[MentionModel]>(this.baseUrl + `/metions?offset=0&limit=100`)
      .then(response => response.data);
  }

}

NotieApi.instance = new NotieApi();

export default NotieApi;
