
import ActionEventApi from '../apiclient/ActionEventApi';
import ActionEventModel from '../../model/ActionEventModel';
import StudyActionType from '../../model/StudyActionType';
import { LectureServiceType } from '../../../lecture/model';

interface StudyEventParams {
  collegeId: string,
  lectureCardId: string,
  cubeId: string,
  action: StudyActionType,
  serviceType: LectureServiceType,
  coursePlanId?: string
}

interface ViewEventParams {
  path: string,
  menu?: string
}


class ActionEventService {
  
  static instance: ActionEventService;

  private actionEventApi: ActionEventApi;

  constructor(actionEventApi: ActionEventApi) {
    this.actionEventApi = actionEventApi;
  }
  
  registerStudyEvent({collegeId, lectureCardId, cubeId, action, serviceType, coursePlanId}: StudyEventParams) {
    const studyEvent: ActionEventModel = ActionEventModel.fromStudyEvent({collegeId, lectureCardId, cubeId, action, serviceType, coursePlanId});

    console.log(`study event is here: ${studyEvent}`);
    const response = this.actionEventApi.registerStudyActionLog(studyEvent);
    return response;
  }


}

Object.defineProperty(ActionEventService, 'instance', {
  value: new ActionEventService(ActionEventApi.instance),
  writable: false,
  configurable: false
});

export default ActionEventService;