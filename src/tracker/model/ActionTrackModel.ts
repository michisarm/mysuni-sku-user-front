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
  externalLink?: string | null;
  action: Action;
  actionName: string;
  target?: HTMLElement;
  abtest?: string | null;
  time?: number;
}

export interface ActionTrackViewParam {
  email: string;
  path: string;
  pathName?: string | null;
  search?: string | null;
  referer?: string;
  refererName?: string | null;
  refererSearch?: string | null;
  browser: string;
  areaType?: string | null;
  area?: Area | null;
  areaId?: string | null;
  target?: HTMLElement;
  init?: boolean;
}

export interface ScrollTrackParam {
  e: React.UIEvent<HTMLElement>;
  area: Area | undefined;
  scrollClassName: string;
  actionName: string;
}

export interface ScrollSwiperTrackParam {
  element: HTMLElement;
  area: Area | undefined;
  scrollClassName: string;
  actionName: string;
}

export interface HoverTrackParam {
  area: Area | undefined;
  actionName: string;
  field: Field;
}

export interface ActionContextModel {
  email: string;
  path: string;
  pathName?: string | null;
  poc: string;
  browser: string;
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
  referer?: string | null;
  refererName?: string | null;
  poc: string;
  browser: string;
  areaType?: string | null;
  area?: Area | null;
  areaId?: string | null;
}

export interface ActionTrackModel {
  context: ActionContextModel;
  auth?: Object | null;
  abtest?: string | null;
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
  externalLink?: string | null;
  // lectureCardId?: string | null;
  // clectureId?: string | null;
}

export interface ActionTrackViewModel {
  context: ViewContextModel;
  auth?: Object | null;
  abtest?: string | null;
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
export interface Group {
  group_field: string;
  group_name: string;
}
export interface Auth {
  base: Group;
  country: Group;
  task: Group;
  position: Group;
  membership: Group;
}
