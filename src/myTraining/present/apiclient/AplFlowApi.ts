import { axiosApi as axios } from '@nara.platform/accent';
import { AplFlowCdo } from '../../model/AplFlowCdo';
import OffsetElementList from '../../../shared/model/OffsetElementList';

export default class AplFlowApi {
  flowURL = '/api/flow';

  static instance: AplFlowApi;

  saveApl(aplFlowCdo: AplFlowCdo) {
    return axios
      .post<string>(this.flowURL, aplFlowCdo)
      .then((response) => (response && response.data) || null);
  }
}

Object.defineProperty(AplFlowApi, 'instance', {
  value: new AplFlowApi(),
  writable: false,
  configurable: false,
});
