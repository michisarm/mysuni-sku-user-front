import { trackAction, trackView } from 'tracker/present/apiclient';
import {
  getPathValue,
  getCardRelId,
  getServiceType,
  getCubeType,
  getPathKey,
  getPathName,
  setResultName,
  mobileCheck,
} from 'tracker/present/logic/common';
import {
  ActionTrackParam,
  ActionTrackViewParam,
  ScrollTrackParam,
  HoverTrackParam,
  ActionTrackModel,
  ActionContextModel,
  ViewContextModel,
  ActionTrackViewModel,
  FieldType,
  Field,
  ActionType,
  Action,
  Area,
} from 'tracker/model';
import { debounce, getElementsByClassName } from 'tracker-react/utils';
import { getCookie } from '@nara.platform/accent';

export async function actionTrack({
  email,
  path,
  pathName,
  search,
  areaType,
  area,
  areaId,
  actionType,
  action,
  actionName,
  target,
}: ActionTrackParam) {
  // search setting
  search = search ? decodeURI(search) : '';

  // pathname setting
  pathName = path && !pathName ? await getPathName(path, search) : pathName;

  // field name setting
  let fields = [];
  fields.push(getPathValue(path, 'college', FieldType.College));
  fields.push(getPathValue(path, 'channel', FieldType.Channel));
  // fields.push(getPathValue(path, 'course-plan', FieldType.Course));
  fields.push(getPathValue(path, 'cube', FieldType.Cube));
  const cardField = getPathValue(path, 'card', FieldType.Card);
  if (cardField && cardField.id) {
    fields.push(cardField);
    const relFields = await getCardRelId(cardField.id);
    if (relFields.length > 0) {
      fields = [...fields, ...relFields];
    }
  }

  const promises: any[] = [];
  fields
    .filter(field => field != null)
    .forEach(field => {
      if (field) {
        promises.push(
          new Promise<Field>(async (resolve, reject) => {
            try {
              resolve(setResultName(field));
            } catch (e) {
              reject(e);
            }
          })
        );
      }
    });
  Promise.all(promises)
    .then(result => {
      const context: ActionContextModel = {
        email,
        path: window.location.origin + path + search,
        pathName: pathName || null,
        areaType: areaType || null,
        area: area || null,
        areaId: areaId || null,
        actionType,
        action,
        actionName,
        poc: mobileCheck() ? 'mobile' : 'web',
      };
      const actionTrackModel: ActionTrackModel = {
        context,
        serviceType: getServiceType(path),
        collegeId: result.find(r => r.type === FieldType.College)?.id,
        collegeName: result.find(r => r.type === FieldType.College)?.name,
        channelId: result.find(r => r.type === FieldType.Channel)?.id,
        channelName: result.find(r => r.type === FieldType.Channel)?.name,
        // coursePlanId: result.find(r => r.type === FieldType.Course)?.id,
        // courseName: result.find(r => r.type === FieldType.Course)?.name,
        cardId: result.find(r => r.type === FieldType.Card)?.id,
        cardName: result.find(r => r.type === FieldType.Card)?.name,
        cubeId: result.find(r => r.type === FieldType.Cube)?.id,
        cubeName: result.find(r => r.type === FieldType.Cube)?.name,
        cubeType: getCubeType(path),
        // lectureCardId: getPathKey(path, 'LECTURE-CARD'),
        // clectureId: getPathKey(path, 'C-LECTURE'),
      };
      // console.log('event trackView', actionTrackViewModel);
      trackAction(actionTrackModel);
    })
    .catch(error => {
      // console.log("error!!", error);
      throw error;
    });
}

export const debounceActionTrack = debounce(
  ({
    email,
    path,
    search,
    area,
    actionType,
    action,
    actionName,
  }: ActionTrackParam) =>
    actionTrack({
      email,
      path,
      search,
      area,
      actionType,
      action,
      actionName,
    } as ActionTrackParam),
  1000
);

export async function actionTrackView({
  email,
  path,
  pathName,
  search,
  referer,
  refererName,
  refererSearch,
  areaType,
  area,
  areaId,
  target,
}: ActionTrackViewParam) {
  // search setting
  search = search ? decodeURI(search) : '';
  refererSearch = refererSearch ? decodeURI(refererSearch) : '';

  // pathname setting
  pathName = path && !pathName ? await getPathName(path, search) : pathName;
  refererName =
    referer && !refererName
      ? await getPathName(referer, refererSearch)
      : refererName;

  // field name setting
  let fields = [];
  fields.push(getPathValue(path, 'college', FieldType.College));
  fields.push(getPathValue(path, 'channel', FieldType.Channel));
  // fields.push(getPathValue(path, 'course-plan', FieldType.Course));
  fields.push(getPathValue(path, 'cube', FieldType.Cube));
  const cardField = getPathValue(path, 'card', FieldType.Card);
  if (cardField && cardField.id) {
    fields.push(cardField);
    const relFields = await getCardRelId(cardField.id);
    if (relFields.length > 0) {
      fields = [...fields, ...relFields];
    }
  }

  const promises: any[] = [];
  fields
    .filter(field => field != null)
    .forEach(field => {
      if (field) {
        promises.push(
          new Promise<Field>(async (resolve, reject) => {
            try {
              resolve(setResultName(field));
            } catch (e) {
              reject(e);
            }
          })
        );
      }
    });
  Promise.all(promises)
    .then(result => {
      const context: ViewContextModel = {
        email,
        path: window.location.origin + path + search,
        pathName: pathName || null,
        referer: referer
          ? window.location.origin + referer + refererSearch
          : null,
        refererName: refererName || null,
        areaType: areaType || null,
        area: area || null,
        areaId: areaId || null,
        poc: mobileCheck() ? 'mobile' : 'web',
      };
      const actionTrackViewModel: ActionTrackViewModel = {
        context,
        serviceType: getServiceType(path),
        collegeId: result.find(r => r.type === FieldType.College)?.id,
        collegeName: result.find(r => r.type === FieldType.College)?.name,
        channelId: result.find(r => r.type === FieldType.Channel)?.id,
        channelName: result.find(r => r.type === FieldType.Channel)?.name,
        // coursePlanId: result.find(r => r.type === FieldType.Course)?.id,
        // courseName: result.find(r => r.type === FieldType.Course)?.name,
        cardId: result.find(r => r.type === FieldType.Card)?.id,
        cardName: result.find(r => r.type === FieldType.Card)?.name,
        cubeId: result.find(r => r.type === FieldType.Cube)?.id,
        cubeName: result.find(r => r.type === FieldType.Cube)?.name,
        cubeType: getCubeType(path),
        // lectureCardId: getPathKey(path, 'LECTURE-CARD'),
        // clectureId: getPathKey(path, 'C-LECTURE'),
      };
      // console.log('event trackView', actionTrackViewModel);
      trackView(actionTrackViewModel);
    })
    .catch(error => {
      // console.log("error!!", error);
      throw error;
    });
}

export function scrollTrack({
  e,
  area,
  scrollClassName,
  actionName,
}: ScrollTrackParam) {
  e.preventDefault();
  if (!area) {
    return;
  }
  let scrollTarget;
  if (typeof document.getElementsByClassName != 'function') {
    scrollTarget = e.currentTarget.getElementsByClassName(scrollClassName)[0];
  } else {
    scrollTarget = getElementsByClassName(e.currentTarget, scrollClassName)[0];
  }
  if (scrollTarget && scrollTarget instanceof HTMLElement) {
    if (
      scrollTarget.scrollLeft > 0 &&
      scrollTarget.scrollLeft >
        scrollTarget.scrollWidth - scrollTarget.clientWidth - 10
    ) {
      if (scrollTarget.dataset.actionName) {
        actionName += '::' + scrollTarget.dataset.actionName;
      }
      debounceActionTrack({
        email:
          getCookie('tryingLoginId') ||
          (window.sessionStorage.getItem('email') as string) ||
          (window.localStorage.getItem('nara.email') as string),
        path: window.location.pathname,
        search: window.location.search,
        area,
        actionType: ActionType.GENERAL,
        action: Action.SCROLL,
        actionName,
      } as ActionTrackParam);
    }
  }
}

export async function hoverTrack({ area, actionName, field }: HoverTrackParam) {
  if (!area || !actionName) {
    return;
  }
  if (field && field.id && field.type) {
    await setResultName({
      type: field.type,
      id: field.id,
    }).then(result => {
      actionName = actionName + '::' + result.name;
    });
  }

  debounceActionTrack({
    email:
      getCookie('tryingLoginId') ||
      (window.sessionStorage.getItem('email') as string) ||
      (window.localStorage.getItem('nara.email') as string),
    path: window.location.pathname,
    search: window.location.search,
    area,
    actionType: ActionType.GENERAL,
    action: Action.HOVER,
    actionName,
  } as ActionTrackParam);
}
