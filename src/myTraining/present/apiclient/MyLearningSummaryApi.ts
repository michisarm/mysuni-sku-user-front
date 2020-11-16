
import { axiosApi } from '@nara.platform/accent';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';


class MyLearningSummaryApi {
  //
  static instance: MyLearningSummaryApi;

  // baseUrl = '/api/mytraining/summaries';

  serverUrl = '/api/mytraining/summaries';
  flowURL = '/api/mytraining/summaries/flow';

  devUrl = process.env.REACT_APP_MY_LEARNING_SUMMARY_API === undefined || process.env.REACT_APP_MY_LEARNING_SUMMARY_API === '' ?
    this.serverUrl : process.env.REACT_APP_MY_LEARNING_SUMMARY_API;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ?
    this.serverUrl : this.devUrl;

  /* flow */
  flowDevURL = process.env.REACT_APP_MY_LEARNING_SUMMARY_FLOW_API === undefined || process.env.REACT_APP_MY_LEARNING_SUMMARY_FLOW_API === '' ?
    this.flowURL : process.env.REACT_APP_MY_LEARNING_SUMMARY_FLOW_API;

  flowBaseURL = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ?
    this.flowURL : this.flowDevURL;

  findMyLearningSummary() {
    //
    return axiosApi.get<MyLearningSummaryModel>(this.baseUrl)
      .then(response => response && response.data);
  }

  findMyLearningSummaryYear(year: number) {
    //
    return axiosApi.get<MyLearningSummaryModel>(this.baseUrl + `/${year}`)
      .then(response => response && response.data);
  }

  ////////////////////////////////////////////// 개편 //////////////////////////////////////////////
  findTotalMyLearningSummary() {
    return axiosApi.get<MyLearningSummaryModel>(`${this.flowBaseURL}`)
      .then(response => response && response.data);
  }

  findMyLearningSummaryByYear(year: number) {
    return axiosApi.get<MyLearningSummaryModel>(`${this.flowBaseURL}/${year}`)
      .then(response => response && response.data);
  }
  ////////////////////////////////////////////// 개편 //////////////////////////////////////////////
}

MyLearningSummaryApi.instance = new MyLearningSummaryApi();

export default MyLearningSummaryApi;
