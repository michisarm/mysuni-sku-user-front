import {getCookie} from '@nara.platform/accent';
import ContextModel from './ContextModel';
import StudyActionType from './StudyActionType';
import {LectureServiceType} from '../../lecture/model';

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
    cubeName: string,
}

interface ViewEventParams {
    menu: string,
    path?: string
}

class ActionEventModel {
    context: ContextModel = new ContextModel();
    action?: StudyActionType;
    serviceType?: string;
    college?: string;
    cubeId?: string;
    lectureCardId?: string;
    coursePlanId?: string;
    courseName?: string;
    cubeName?: string;

    constructor(actionEvent?: ActionEventModel) {
      if(actionEvent) {
        const context = actionEvent.context && new ContextModel(actionEvent.context) || this.context;
        Object.assign(this, {...actionEvent, context});
      }
    }

    setContext(menu: string, path?: string) {
      this.context.email = process.env.NODE_ENV === 'development' ? window.localStorage.getItem('nara.email') as string : getCookie('tryingLoginId');
      this.context.menu = menu;
      this.context.path = path || window.location.href;
    }

    static fromStudyEvent({action, serviceType, collegeId, cubeId, lectureCardId, coursePlanId, menu, path, courseName, cubeName}: StudyEventParams): ActionEventModel {
      const studyActionLog: ActionEventModel = new ActionEventModel();

      studyActionLog.setContext(menu, path);
      studyActionLog.action = action;
      studyActionLog.college = collegeId || '';
      studyActionLog.cubeId = cubeId || '';
      studyActionLog.lectureCardId = lectureCardId || '';
      studyActionLog.coursePlanId = coursePlanId || '';
      studyActionLog.serviceType = serviceType && serviceType.toUpperCase() || StudyActionType.None.toUpperCase();
      studyActionLog.courseName = courseName || '';
      studyActionLog.cubeName = cubeName;
      
      return studyActionLog;
    }

    static fromViewEvent({menu, path}: ViewEventParams): ActionEventModel {
      const viewActionLog: ActionEventModel = new ActionEventModel();
      viewActionLog.setContext(menu, path);

      return viewActionLog;
    }
}

export default ActionEventModel;