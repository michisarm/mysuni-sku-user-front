import { getCookie } from '@nara.platform/accent';
import ContextModel from './ContextModel';
import StudyActionType from './StudyActionType';
import { LectureServiceType } from '../../lecture/model';

interface StudyEventParams {
    action: StudyActionType,
    serviceType: LectureServiceType,
    collegeId: string,
    cubeId: string,
    lectureCardId: string,
    coursePlanId?: string,
    path?: string,
    menu?: string
}


interface ViewEventParams {
    path?: string,
    menu?: string
}

class ActionEventModel {
    context: ContextModel = new ContextModel();
    action?: StudyActionType;
    serviceType?: string;
    college?: string;
    cubeId?: string;
    lectureCardId?: string;
    coursePlanId: string = '';

    constructor(actionEvent?: ActionEventModel) {
      if(actionEvent) {
        const context = actionEvent.context && new ContextModel(actionEvent.context) || this.context;
        Object.assign(this, {...actionEvent, context});
      }
    }

    setContext(path?: string, menu?: string) {
      this.context.email = process.env.NODE_ENV === 'development' ? window.localStorage.getItem('nara.email') as string : getCookie('tryingLoginId');
      if(path) this.context.path = path;
      if(menu) this.context.menu = menu;
    }

    static fromStudyEvent({action, serviceType, collegeId, cubeId, lectureCardId, coursePlanId, path, menu}: StudyEventParams): ActionEventModel {
      const studyAction: ActionEventModel = new ActionEventModel();
      
      let actionServiceType: string = '';

      switch(serviceType) {
        case 'Course':
          actionServiceType = 'COURSE';
          break;
        case 'Card': 
          actionServiceType = 'CARD';
          break;
        case 'Program': 
          actionServiceType = 'PROGRAM';
          break;
        default: 
          actionServiceType = '';
      } 
          

      studyAction.setContext(path, menu);
      studyAction.action = action;
      studyAction.serviceType = actionServiceType;
      studyAction.college = collegeId;
      studyAction.cubeId = cubeId;
      studyAction.lectureCardId = lectureCardId;

      if(coursePlanId) {
        studyAction.coursePlanId = coursePlanId;
      }

      return studyAction;
    }

    static fromViewEvent({path, menu}: ViewEventParams): ActionEventModel {
      const viewAction: ActionEventModel = new ActionEventModel();
      viewAction.setContext(path, menu);

      return viewAction;
    }
}

export default ActionEventModel;