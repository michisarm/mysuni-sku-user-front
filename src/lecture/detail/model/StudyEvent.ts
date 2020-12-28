type LogType = 'VIEW' | 'STUDY';
type StudyActions =
  | 'VideoStart'
  | 'VideoClose'
  | 'AudioStart'
  | 'AudioClose'
  | 'CPLinked'
  | 'DocumentDownload'
  | 'WebPageLinked'
  | 'ElearningLinked'
  | 'Experimetial';
type ServiceType = 'CARD' | 'COURSE' | 'PROGRAM';

interface Context {
  logType: LogType;
  email: string;
  path: string;
  menu: string;
  poc: string;
}

export interface StudyEvent {
  // context
  context: Context;
  cubeName: string;
  courseName: string;
  college: string;
  action?: StudyActions;
  serviceType: ServiceType;
  cubeId: string;
  lectureCardId: string;
  coursePlanId: string;
}
