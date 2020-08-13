
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyTrainingTabModel from '../../model/MyTrainingTabModel';


class MyTrainingApi {
  //
  static instance: MyTrainingApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
    process.env.REACT_APP_MY_TRAINING_API === undefined || process.env.REACT_APP_MY_TRAINING_API === '' ?
    '/api/mytraining/mytraining/mytrainings' : process.env.REACT_APP_MY_TRAINING_API;

  findLearningCompletedAll(myTrainingRdo: MyTrainingRdoModel) {
    //
    const params = {
      limit: myTrainingRdo.limit,
      offset: myTrainingRdo.offset,
      denizenKey: myTrainingRdo.denizenKey,
      state: myTrainingRdo.state,
      channelIds: myTrainingRdo.channelIds,
    };

    axiosApi.get<Object>(this.baseUrl + '/byState/filterWithJoinedValue', { params })
      .then((response) => {
        return response;
      }).catch((reason) => { return null;});
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
}

MyTrainingApi.instance = new MyTrainingApi();

export default MyTrainingApi;
