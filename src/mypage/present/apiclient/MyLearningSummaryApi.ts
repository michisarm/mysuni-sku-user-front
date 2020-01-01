
import { axiosApi } from '@nara.platform/accent';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';


class MyLearningSummaryApi {
  //
  static instance: MyLearningSummaryApi;

  baseUrl = '/api/mytraining/summaries';


  findMyLearningSummary() {
    //
    return axiosApi.get<MyLearningSummaryModel>(this.baseUrl)
      .then(response => response && response.data);
  }
}

MyLearningSummaryApi.instance = new MyLearningSummaryApi();

export default MyLearningSummaryApi;
