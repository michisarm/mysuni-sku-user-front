
import ActionEventApi from '../apiclient/ActionEventApi';
import ActionEventModel from '../../model/ActionEventModel';
import StudyActionType from '../../model/StudyActionType';
import { LectureServiceType } from '../../../lecture/model';

interface StudyEventParams {
  action: StudyActionType,
  serviceType?: LectureServiceType,
  collegeId?: string,
  cubeId?: string,
  lectureCardId?: string,
  coursePlanId?: string,
  menu: string,
  path?: string,
  courseName?: string,
  cubeName: string
}

interface ViewEventParams {
  menu: string,
  path?: string
}

class ActionEventService {
  
  static instance: ActionEventService;

  private actionEventApi: ActionEventApi;

  constructor(actionEventApi: ActionEventApi) {
    this.actionEventApi = actionEventApi;
  }
  
  registerStudyActionLog({action, serviceType, collegeId, cubeId, lectureCardId, coursePlanId, menu, path, courseName, cubeName}: StudyEventParams): void {
    const studyActionLog: ActionEventModel = ActionEventModel.fromStudyEvent({action, serviceType, collegeId, cubeId, lectureCardId, coursePlanId, menu, path, courseName, cubeName});
    console.log(studyActionLog);
    this.actionEventApi.registerStudyActionLog(studyActionLog);
  }

  registerViewActionLog({menu, path}: ViewEventParams): void {
    const viewActionLog: ActionEventModel = ActionEventModel.fromViewEvent({menu, path});
    console.log(viewActionLog);
    this.actionEventApi.registerViewActionLog(viewActionLog);
  }
}

Object.defineProperty(ActionEventService, 'instance', {
  value: new ActionEventService(ActionEventApi.instance),
  writable: false,
  configurable: false
});

export default ActionEventService;