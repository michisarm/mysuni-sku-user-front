// import { axiosApi as axios } from '@nara.platform/accent';
import ActionLogModel from '../../model/ActionLogModel';

export default class ActionLogApi {

  // URL = '/api/actionLog';
  URL = '/local/api/actionLog';

  static instance: ActionLogApi;

  registerActionLog(actionLog: ActionLogModel) {
    console.log('ActionLogApi actionLog : ', actionLog);
    // return axios.post<ActionLog>(this.URL, actionLog)
    //   .then(response => response && response.data || null);
  }

  registerActionLogs(actionLogs: ActionLogModel[]) {
    console.log('ActionLogApi actionLogs : ', actionLogs);
    // return axios.post<ActionLogModel[]>(this.URL, actionLogs)
    //   .then(response => response && response.data || null);
  }
}

ActionLogApi.instance = new ActionLogApi();
