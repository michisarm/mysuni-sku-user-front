
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyTrainingTabModel from '../../model/MyTrainingTabModel';


class MyTrainingApi {
  //
  static instance: MyTrainingApi;

  devUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOPMENT_URL : '';
  baseUrl = '/api/mytraining/mytraining/mytrainings';
  // localUrl = 'http://localhost:8233/mytraining/mytrainings';


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
}

MyTrainingApi.instance = new MyTrainingApi();

export default MyTrainingApi;
