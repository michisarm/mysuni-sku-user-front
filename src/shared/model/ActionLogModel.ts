import moment from 'moment';
import { LectureModel } from 'lecture/model';
import { InMyLectureModel, MyTrainingModel } from 'myTraining/model';

export default class ActionLogModel {
  id?: string = '';
  eventTimestampe?: string = '';
  requestTimestampe?: string = '';
  serverTimestampe?: string = '';
  deviceType?: number = 1;    // 1: PC, 2: 모바일폰, 3: 테블릿
  userId?: string = '';
  context?: string = '';
  subContext?: string = '';
  action?: number = 0;        // 1: Seen, 2: Clicked
  subAction?: string = '';
  lectureId?: string = '';
  lectureName?: string = '';
  lectureServiceType?: string = '';
  lectureCubeType?: string = '';
  channelId?: string = '';
  channelName?: string = '';
  collegeId?: string = '';
  collegeName?: string = '';

  constructor(actionLog?: ActionLogModel) {
    if (actionLog) {
      Object.assign(this, { ...actionLog });
    }
  }

  static fromSeenActionLog(model: LectureModel | MyTrainingModel | InMyLectureModel, subAction: string = '') : ActionLogModel {

    console.log('fromSeenActionLog', model, subAction);

    const actionLog: ActionLogModel = new ActionLogModel();
    actionLog.action = 1;
    actionLog.eventTimestampe = moment().toISOString(true);
    actionLog.deviceType = 1;
    actionLog.subAction = subAction;
    actionLog.lectureId = model.id;
    actionLog.lectureName = model.name;
    actionLog.lectureServiceType = model.serviceType;
    actionLog.lectureCubeType = model.cubeType;
    actionLog.channelId = model.category.channel.id;
    actionLog.channelName = model.category.channel.name;
    actionLog.collegeId = model.category.college.id;
    actionLog.collegeName = model.category.college.name;
    return actionLog;
  }

  static fromClickActionLog(subAction: string = '', subContext: string = '') : ActionLogModel {

    console.log('fromClickActionLog', subAction, subContext);

    const actionLog: ActionLogModel = new ActionLogModel();
    actionLog.action = 2;
    actionLog.eventTimestampe = moment().toISOString(true);
    actionLog.deviceType = 1;
    actionLog.subAction = subAction;
    return actionLog;
  }

}

