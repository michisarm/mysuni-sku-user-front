// import { axiosApi as axios } from '@nara.platform/accent';
import ActionLogModel from '../../model/ActionLogModel';

export default class ActionLogApi {

  // URL = '/api/actionLog';
  URL = '/local/api/actionLog';

  static instance: ActionLogApi;

  registerActionLog(actionLog: ActionLogModel) {
    if (process.env.NODE_ENV === 'development') {
      console.log('ActionLogApi actionLog : ', actionLog);
    }
    // return axios.post<ActionLog>(this.URL, actionLog)
    //   .then(response => response && response.data || null);
  }

  registerActionLogs(actionLogs: ActionLogModel[]) {
    if (process.env.NODE_ENV === 'development') {
      console.log('ActionLogApi actionLogs : ', actionLogs);
    }
    // return axios.post<ActionLogModel[]>(this.URL, actionLogs)
    //   .then(response => response && response.data || null);
  }
}

ActionLogApi.instance = new ActionLogApi();
