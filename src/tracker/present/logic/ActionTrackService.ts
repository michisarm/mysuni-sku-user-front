// import StudyActionType from 'shared/model/StudyActionType';
import { trackView } from 'tracker/present/apiclient';
import {
  getPathValue,
  getServiceType,
  getPathKey,
  getPathName,
  setResultName,
} from 'tracker/present/logic/common';
import {
  ActionTrackParam,
  ViewContextModel,
  ActionTrackViewModel,
  FieldType,
  Field,
} from 'tracker/model';

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
}: ActionTrackParam) {
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
  const fields = [];
  fields.push(getPathValue(path, 'college', FieldType.College));
  fields.push(getPathValue(path, 'channel', FieldType.Channel));
  fields.push(getPathValue(path, 'course-plan', FieldType.Course));
  fields.push(getPathValue(path, 'cube', FieldType.Cube));

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
        poc: 'web',
      };
      const actionTrackViewModel: ActionTrackViewModel = {
        context,
        serviceType: getServiceType(path),
        collegeId: result.find(r => r.type === FieldType.College)?.id,
        collegeName: result.find(r => r.type === FieldType.College)?.name,
        channelId: result.find(r => r.type === FieldType.Channel)?.id,
        channelName: result.find(r => r.type === FieldType.Channel)?.name,
        coursePlanId: result.find(r => r.type === FieldType.Course)?.id,
        courseName: result.find(r => r.type === FieldType.Course)?.name,
        cubeId: result.find(r => r.type === FieldType.Cube)?.id,
        cubeName: result.find(r => r.type === FieldType.Cube)?.name,
        lectureCardId: getPathKey(path, 'LECTURE-CARD'),
        clectureId: getPathKey(path, 'C-LECTURE'),
      };
      // console.log('event trackView', actionTrackViewModel);
      trackView(actionTrackViewModel);
    })
    .catch(error => {
      // console.log("error!!", error);
      throw error;
    });
}
