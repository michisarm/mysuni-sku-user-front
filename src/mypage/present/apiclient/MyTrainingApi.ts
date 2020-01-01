
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';
import MyTrainingModel from '../../model/MyTrainingModel';


class MyTrainingApi {
  //
  static instance: MyTrainingApi;

  baseUrl = '/api/mytraining/mytraining/mytrainings';


  findAllMyTrainings(myTrainingRdo: MyTrainingRdoModel) {
    //
    const params = myTrainingRdo;

    return axiosApi.get<OffsetElementList<MyTrainingModel>>(this.baseUrl + '/byState', { params })
      .then(response => response && response.data);
  }

  findAllMyTrainingsWithStamp(myTrainingRdo: MyTrainingRdoModel) {
    //
    const params = myTrainingRdo;

    return axiosApi.get<OffsetElementList<MyTrainingModel>>(this.baseUrl + '/stamps', { params })
      .then(response => response && response.data);
  }
}

MyTrainingApi.instance = new MyTrainingApi();

export default MyTrainingApi;
