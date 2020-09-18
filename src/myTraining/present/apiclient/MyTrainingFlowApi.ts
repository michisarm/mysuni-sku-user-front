import { axiosApi } from '@nara.platform/accent';
import MyTrainingFilterRdoModel from 'myTraining/model/MyTrainingFilterRdoModel';
import { OffsetElementList } from 'shared/model';
import MyTrainingModelV2 from 'myTraining/model/MyTrainingModelV2';

class MyTrainingFlowApi {

  /* baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
    process.env.REACT_APP_MY_TRAINING_FLOW_API === undefined || process.env.REACT_APP_MY_TRAINING_FLOW_API === '' ?
    '/api/mytraining/mytraining/mytrainings/flow' : process.env.REACT_APP_MY_TRAINING_FLOW_API; */
  baseUrl = 'http://localhost:8233/mytraining/mytrainings/flow';

  static instance: MyTrainingFlowApi;

  // 응답 데이터는 offset으로 전달받는다.
  findAllMyTrainingsV2(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
    return axiosApi
      .post(this.baseUrl + '/v2', myTrainingFilterRdo)
      .then(response => response && response.data || null)
      .catch(err => err && null);
  }

  updateBySelectedIds() {

  }
}

export default MyTrainingFlowApi;

Object.defineProperty(MyTrainingFlowApi, 'instance', {
  value: new MyTrainingFlowApi(),
  writable: false,
  configurable: false,
});
