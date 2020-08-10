import { axiosApi as axios } from '@nara.platform/accent';
import ActionEventModel from '../../model/ActionEventModel';

class ActionEventApi {

  studyUrl: string = '/api/action-log-collector/events/study';
  viewUrl: string = '/api/action-log-collector/events/view';

  static instance: ActionEventApi;

  registerStudyActionLog(studyActionLog: ActionEventModel) {
    return axios.post<string>(this.studyUrl, studyActionLog)
      .then(response => response && response.data || '');
  }

  registerViewActionLog(viewActionLog: ActionEventModel) {
    return axios.post<string>(this.viewUrl, viewActionLog)
      .then(response => response && response.data || '');
  }
}

Object.defineProperty(ActionEventApi, 'instance', {
  value: new ActionEventApi(),
  writable: false,
  configurable: false
});

export default ActionEventApi;