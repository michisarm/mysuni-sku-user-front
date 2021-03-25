// import StudyActionType from './StudyActionType';
import { FieldType } from 'tracker/model/ActionType';

export interface ActionTrackParam {
  email: string;
  path: string;
  pathName?: string | null;
  search?: string | null;
  referer?: string;
  refererName?: string | null;
  refererSearch?: string | null;
  areaType?: string | null;
  area?: string | null;
  areaId?: string | null;
  target?: HTMLElement;
}

export interface ViewContextModel {
  email: string;
  path: string;
  pathName?: string | null;
  poc: string;
  referer?: string | null;
  refererName?: string | null;
  areaType?: string | null;
  area?: string | null;
  areaId?: string | null;
}

export interface ActionTrackViewModel {
  context: ViewContextModel;
  serviceType?: string | null;
  collegeId?: string | null;
  collegeName?: string | null;
  channelId?: string | null;
  channelName?: string | null;
  coursePlanId?: string | null;
  courseName?: string | null;
  cubeId?: string | null;
  cubeName?: string | null;
  lectureCardId?: string | null;
  clectureId?: string | null;
}

export interface Field {
  type: FieldType;
  id: string;
  name?: string;
}
