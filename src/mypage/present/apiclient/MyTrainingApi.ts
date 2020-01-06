
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';
import MyTrainingModel from '../../model/MyTrainingModel';


class MyTrainingApi {
  //
  static instance: MyTrainingApi;

  baseUrl = '/api/mytraining/mytraining/mytrainings';


  getOffsetElementList(response: any) {
    //
    const offsetElementList = new OffsetElementList<MyTrainingModel>(response && response.data);

    offsetElementList.results = offsetElementList.results.map((training) => new MyTrainingModel(training));
    return offsetElementList;
  }

  findAllMyTrainings(myTrainingRdo: MyTrainingRdoModel) {
    //
    return axiosApi.post<OffsetElementList<MyTrainingModel>>(this.baseUrl + '/byState/filter', myTrainingRdo)
      .then(this.getOffsetElementList);
  }

  findAllMyTrainingsWithStamp(myTrainingRdo: MyTrainingRdoModel) {
    //
    const params = myTrainingRdo;

    return axiosApi.get<OffsetElementList<MyTrainingModel>>(this.baseUrl + '/stamps', { params })
      .then(this.getOffsetElementList);
  }
}

MyTrainingApi.instance = new MyTrainingApi();

export default MyTrainingApi;
