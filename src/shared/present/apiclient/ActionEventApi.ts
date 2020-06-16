import { axiosApi as axios } from '@nara.platform/accent';
import ActionEventModel from '../../model/ActionEventModel';

class ActionEventApi {

  studyUrl: string = '/api/action-log-collector/events/study';

  static instance: ActionEventApi;

  registerStudyActionLog(actionLog: ActionEventModel) {
    return axios.post<string>(this.studyUrl, actionLog)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(ActionEventApi, 'instance', {
  value: new ActionEventApi(),
  writable: false,
  configurable: false
});

export default ActionEventApi;