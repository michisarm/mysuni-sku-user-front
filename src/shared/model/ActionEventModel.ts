import {getCookie} from '@nara.platform/accent';
import ContextModel from './ContextModel';
import StudyActionType from './StudyActionType';
import {LectureServiceType} from '../../lecture/model';

interface StudyEventParams {
    menu: string,
    path?: string,
    action: StudyActionType,
    serviceType?: LectureServiceType,
    collegeId?: string,
    cubeId?: string,
    lectureCardId?: string,
    coursePlanId?: string,
    cubeName: string,
    courseName?: string,
}

interface ViewEventParams {
    menu: string,
    path?: string,
    serviceType?: LectureServiceType,
    collegeId?: string,
    cubeId?: string,
    lectureCardId?: string,
    coursePlanId?: string,
    cubeName?: string
    courseName?: string
}

class ActionEventModel {
    context: ContextModel = new ContextModel();
    action?: StudyActionType;
    serviceType?: string;
    college?: string;
    cubeId?: string;
    lectureCardId?: string;
    coursePlanId?: string;
    cubeName?: string;
    courseName?: string;

    constructor(actionEvent?: ActionEventModel) {
      if(actionEvent) {
        const context = actionEvent.context && new ContextModel(actionEvent.context) || this.context;
        Object.assign(this, {...actionEvent, context});
      }
    }

    setContext(logType: string, menu: string, path?: string) {
      this.context.logType = logType;
      this.context.email = process.env.NODE_ENV === 'development' ? window.localStorage.getItem('nara.email') as string : getCookie('tryingLoginId');
      this.context.menu = menu;
      this.context.path = path || window.location.href;
    }

    static fromStudyEvent({ menu, path, action, serviceType, collegeId, cubeId, lectureCardId, coursePlanId, cubeName, courseName }: StudyEventParams): ActionEventModel {

      const studyActionLog: ActionEventModel = new ActionEventModel();
      studyActionLog.setContext('STUDY', menu, path);
      studyActionLog.action = action;
      studyActionLog.serviceType = serviceType && serviceType.toUpperCase() || '';
      studyActionLog.college = collegeId || '';
      studyActionLog.cubeId = cubeId || '';
      studyActionLog.lectureCardId = lectureCardId || '';
      studyActionLog.coursePlanId = coursePlanId || '';
      studyActionLog.cubeName = cubeName;
      studyActionLog.courseName = courseName || '';

      return studyActionLog;
    }

    static fromViewEvent({menu, path, serviceType, collegeId, coursePlanId, cubeId, lectureCardId, cubeName, courseName }: ViewEventParams): ActionEventModel {

      const viewActionLog: ActionEventModel = new ActionEventModel();
      viewActionLog.setContext('VIEW', menu, path);
      viewActionLog.serviceType = serviceType && serviceType.toUpperCase() || '';
      viewActionLog.college = collegeId || '';
      viewActionLog.cubeId = cubeId || '';
      viewActionLog.coursePlanId = coursePlanId || '';
      viewActionLog.lectureCardId = lectureCardId || '';
      viewActionLog.cubeName = cubeName || '';
      viewActionLog.courseName = courseName || '';

      return viewActionLog;
    }
}

export default ActionEventModel;