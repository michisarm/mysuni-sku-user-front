
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyTrainingTabModel from '../../model/MyTrainingTabModel';
import MyTrainingFilterRdoModel from '../../model/MyTrainingFilterRdoModel';
import FilterCountViewModel from '../../model/FilterCountViewModel';



class MyTrainingApi {
  //
  static instance: MyTrainingApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
    process.env.REACT_APP_MY_TRAINING_API === undefined || process.env.REACT_APP_MY_TRAINING_API === '' ?
    '/api/mytraining/mytraining/mytrainings' : process.env.REACT_APP_MY_TRAINING_API;

  saveAllLearningPassedToStorage(state: string, endDate: string) {

    const params = {
      state,
      endDate,
    };

    return axiosApi.get<any>(this.baseUrl + '/byState/lightWeight', { params });
  }

  getOffsetElementList(response: any) {
    //
    const offsetElementList = new OffsetElementList<MyTrainingModel>(response && response.data);

    offsetElementList.results = offsetElementList.results.map((training) => new MyTrainingModel(training));
    return offsetElementList;
  }

  findAllMyTrainings(myTrainingRdo: MyTrainingRdoModel) {
    //
    return axiosApi.post<OffsetElementList<MyTrainingModel>>(this.baseUrl + '/byState/filterWithJoinedValue', myTrainingRdo)
      .then(this.getOffsetElementList);
  }

  fetchAllMyTrainings(myTrainingRdo: MyTrainingRdoModel) {
    //
    return axiosApi.post<OffsetElementList<MyTrainingModel>>(this.baseUrl + '/byState/fetchLearningTimeByUser', myTrainingRdo)
      .then(this.getOffsetElementList);
  }

  findAllMyTrainingsWithStamp(myTrainingRdo: MyTrainingRdoModel) {
    //
    const params = myTrainingRdo;

    return axiosApi.get<OffsetElementList<MyTrainingModel>>(this.baseUrl + '/stamps', { params })
      .then(this.getOffsetElementList);
  }



  findAllTabMyTraining() {
    return axiosApi.get<MyTrainingTabModel>(this.baseUrl + '/tab/counts').then((response) => response.data);
  }

  //////////////////////// 개편 ////////////////////////

  findAllTableViews(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
    return axiosApi
      .post(`${this.baseUrl}/table/views`, myTrainingFilterRdo)
      .then(response => response && response.data || null)
      .catch(error => error && null);
  }

  findAllStampTableViews(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
    return axiosApi.post(`${this.baseUrl}/stamp/table/views`, myTrainingFilterRdo)
      .then(response => response && response.data || null)
      .catch(error => error && null);
  }

  findAllTabCount() {
    return axiosApi.get<MyTrainingTabModel>(`${this.baseUrl}/tab/counts/v2`)
      .then(response => response && response.data || null)
      .catch(error => error && null);
  }

  findAllFilterCountViews(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
    return axiosApi.post(`${this.baseUrl}/table/filter/count`, myTrainingFilterRdo)
      .then(response => response.data || null)
      .catch(error => error && null);
  }


  /* 
    findAllMyTrainingsV2WithStamp(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
      return axiosApi.post('http://localhost:8233/mytraining/mytrainings/stamps/v2', myTrainingFilterRdo)
        .then(response => response && response.data || null)
        .catch(error => error && null);
    } 
  */
  //////////////////////// 개편 ////////////////////////
}

MyTrainingApi.instance = new MyTrainingApi();

export default MyTrainingApi;
