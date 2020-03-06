import { axiosApi as axios } from '@nara.platform/accent';
import ActionLogModel from '../../model/ActionLogModel';

export default class ActionLogApi {

  URL = '/api/actionlog/action-log';

  static instance: ActionLogApi;

  registerActionLogs(actionLogs: ActionLogModel[]) {
    return axios.post<ActionLogModel[]>(this.URL, actionLogs)
      .then(response => response && response.data || null);
  }
}

ActionLogApi.instance = new ActionLogApi();
