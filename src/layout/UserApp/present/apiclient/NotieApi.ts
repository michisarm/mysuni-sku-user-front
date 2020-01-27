
import { axiosApi } from '@nara.platform/accent';


class NotieApi {
  //
  static instance: NotieApi;

  baseUrl = '/api/notie/feed';

  hasQuickLearningFeeds() {
    return axiosApi.get<boolean>(this.baseUrl + `/quickmenu/learning`)
      .then(response => response.data.valueOf());
  }

  countMenuNoties(notieType: string) {
    return axiosApi.get<number>(this.baseUrl + `/tab?feedType=${notieType}`)
      .then(response => response.data.valueOf());
  }

  readNotie(notieType: string) {
    axiosApi.put<void>(this.baseUrl + `/type?feedType=${notieType}`);
  }

}

NotieApi.instance = new NotieApi();

export default NotieApi;
