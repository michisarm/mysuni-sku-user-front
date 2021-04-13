import { Action, ActionType, Area, FieldType } from 'tracker/model/ActionType';

export interface ActionTrackParam {
  email: string;
  path: string;
  pathName?: string | null;
  search?: string | null;
  areaType?: string | null;
  area?: Area | null;
  areaId?: string | null;
  actionType: ActionType;
  action: Action;
  actionName: string;
  target?: HTMLElement;
}

export interface ActionTrackViewParam {
  email: string;
  path: string;
  pathName?: string | null;
  search?: string | null;
  referer?: string;
  refererName?: string | null;
  refererSearch?: string | null;
  areaType?: string | null;
  area?: Area | null;
  areaId?: string | null;
  target?: HTMLElement;
}

export interface ScrollTrackParam {
  e: React.UIEvent<HTMLElement>;
  area: Area | undefined;
  scrollClassName: string;
  actionName: string;
}

export interface ActionContextModel {
  email: string;
  path: string;
  pathName?: string | null;
  poc: string;
  areaType?: string | null;
  area?: Area | null;
  areaId?: string | null;
  actionType: ActionType;
  action: Action;
  actionName: string;
}

export interface ViewContextModel {
  email: string;
  path: string;
  pathName?: string | null;
  poc: string;
  referer?: string | null;
  refererName?: string | null;
  areaType?: string | null;
  area?: Area | null;
  areaId?: string | null;
}

export interface ActionTrackModel {
  context: ActionContextModel;
  serviceType?: string | null;
  collegeId?: string | null;
  collegeName?: string | null;
  channelId?: string | null;
  channelName?: string | null;
  // coursePlanId?: string | null;
  // courseName?: string | null;
  cardId?: string | null;
  cardName?: string | null;
  cubeId?: string | null;
  cubeName?: string | null;
  cubeType?: string | null;
  // lectureCardId?: string | null;
  // clectureId?: string | null;
}

export interface ActionTrackViewModel {
  context: ViewContextModel;
  serviceType?: string | null;
  collegeId?: string | null;
  collegeName?: string | null;
  channelId?: string | null;
  channelName?: string | null;
  // coursePlanId?: string | null;
  // courseName?: string | null;
  cardId?: string | null;
  cardName?: string | null;
  cubeId?: string | null;
  cubeName?: string | null;
  cubeType?: string | null;
  // lectureCardId?: string | null;
  // clectureId?: string | null;
}

export interface Field {
  type: FieldType;
  id: string;
  name?: string;
}
