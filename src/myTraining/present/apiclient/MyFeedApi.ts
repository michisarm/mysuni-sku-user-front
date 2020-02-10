
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyFeedRdoModel from '../../model/MyFeedRdoModel';
import { MyFeedModel } from '../../model';


class MyFeedApi {
  //
  static instance: MyFeedApi;

  baseUrl = '/api/notie/noties';


  getOffsetElementList(response: any) {
    //
    const offsetElementList = new OffsetElementList<MyFeedModel>(response && response.data);

    offsetElementList.results = offsetElementList.results.map((feed) => new MyFeedModel(feed));
    return offsetElementList;
  }

  findAllFeeds(myfeedRdo: MyFeedRdoModel) {
    //
    const params = myfeedRdo;

    return axiosApi.get<OffsetElementList<MyTrainingModel>>(this.baseUrl + '/feed/all', { params })
      .then(this.getOffsetElementList);
  }

  onReadNotieFeed(notieId: string) {
    //
    return axiosApi.put(this.baseUrl + '/onread/' + notieId);
  }

  onReadNotieFeedWithType(notieId: string, feedType: string) {
    //
    return axiosApi.put(this.baseUrl + '/onread/' + notieId + '/' + feedType);
  }

}

MyFeedApi.instance = new MyFeedApi();

export default MyFeedApi;
