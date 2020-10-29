
import { axiosApi } from '@nara.platform/accent';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';


class MyLearningSummaryApi {
  //
  static instance: MyLearningSummaryApi;

  // baseUrl = '/api/mytraining/summaries';

  serverUrl = '/api/mytraining/summaries';
  devUrl = process.env.REACT_APP_MY_LEARNING_SUMMARY_API === undefined || process.env.REACT_APP_MY_LEARNING_SUMMARY_API === '' ?
    this.serverUrl : process.env.REACT_APP_MY_LEARNING_SUMMARY_API;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ?
    this.serverUrl : this.devUrl;

  findMyLearningSummary() {
    //
    return axiosApi.get<MyLearningSummaryModel>('http://localhost:8233/summaries/')
      .then(response => response && response.data);
  }

  findMyLearningSummaryV2() {
    return axiosApi.get<MyLearningSummaryModel>('http://localhost:8233/summaries/v2')
      .then(response => response && response.data);
  }

  findMyLearningSummaryYear(year: number) {
    //
    return axiosApi.get<MyLearningSummaryModel>(`http://localhost:8233/summaries/v2/${year}`)
      .then(response => response && response.data);
  }
}

MyLearningSummaryApi.instance = new MyLearningSummaryApi();

export default MyLearningSummaryApi;
