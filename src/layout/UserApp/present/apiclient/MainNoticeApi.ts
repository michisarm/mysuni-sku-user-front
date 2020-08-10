
import {axiosApi as axios} from '@nara.platform/accent';
import {OffsetElementList} from '../../../../shared/model';
import PostModel from '../../../../board/model/PostModel';


class MainNoticeApi {
  //
  static instance: MainNoticeApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_POST_API === undefined || process.env.REACT_APP_POST_API === '' ?
    '/api/board/posts' : process.env.REACT_APP_POST_API;

  getLeastNotices(offset: number = 0, limit: number = 1) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.baseUrl + '/ntc-pinned', { params: { offset, limit }})
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }
}

MainNoticeApi.instance = new MainNoticeApi();

export default MainNoticeApi;
