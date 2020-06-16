import { axiosApi as axios } from '@nara.platform/accent';
import ActionEventModel from '../../model/ActionEventModel';

class ActionEventApi {

  STUDY_EVENT_URL: string = '/api/actionlog/events/study';

  static instance: ActionEventApi;

  registerStudyActionLog(actionLog: ActionEventModel) {
    return axios.post<string>(this.STUDY_EVENT_URL, actionLog)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(ActionEventApi, 'instance', {
  value: new ActionEventApi(),
  writable: false,
  configurable: false
});

export default ActionEventApi;