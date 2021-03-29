// import StudyActionType from 'shared/model/StudyActionType';
import moment from "moment";
import { trackView } from 'tracker/present/apiclient';
import { findCoursePlan } from 'lecture/detail/api';
import { findPersonalCube } from 'personalcube/personalcube/present/apiclient/PersonalCubeApi';
import { findCollege } from 'college/present/apiclient/CollegeApi';
import { findChannel } from 'college/present/apiclient/ChannelApi';
import {
  ActionTrackParam,
  ViewContextModel,
  ActionTrackViewModel,
  FieldType,
  Field
} from 'tracker/model';
import { LectureServiceType } from 'lecture/model';
import { lsTest } from 'ucomp-tracker-react/utils';

const FIELD_STORAGE_KEY = '_mysuni_field';

const getServiceType = (path: string) => {
  let serviceType = null;
  if (path.includes('/Course/')) {
    serviceType = LectureServiceType.Course.toUpperCase();
  } else if (path.includes('/Program/')) {
    serviceType = LectureServiceType.Program.toUpperCase();
  } else if (path.includes('/lecture-card/')) {
    serviceType = LectureServiceType.Card.toUpperCase();
  }
  return serviceType;
}

const getPathValue = (path: string, param: string, type: FieldType) : Field | null => {
  if (!path.includes('/' + param + '/')) {
    return null;
  }
  const reg = new RegExp('/' + param + '/([^/]+)(/|$)');
  const matches = reg.exec(path);
  if (matches && matches.length) {
    return {type, id: matches[1]};
  }else{
    return null;
  }
};

const getPathKey = (path: string, param: string) => {
  if (!path.includes('/' + param)) {
    return null;
  }
  const reg = new RegExp('/(' + param + '.*)(/|$)');
  const matches = reg.exec(path);
  if (matches && matches.length) {
    return matches[1];
  }else{
    return null;
  }
};

// localstorage cached 처리
const getFieldName = async (id: string, type: string) => {
  let name;
  let field;
  if(lsTest()){
    const cachedFiled = localStorage.getItem(FIELD_STORAGE_KEY);
    if(cachedFiled){
      field = JSON.parse(cachedFiled);
      if(field && field[type]){
        name = field[type][id];
      }
    }
  }
  if(!name){
    if(type === FieldType.Course){
      const coursePlan = await findCoursePlan(id);
      name = coursePlan?.name;
    }else if(type === FieldType.Cube){
      const cube = await findPersonalCube(id);
      name = cube?.name;
    }else if(type === FieldType.College){
      const college = await findCollege(id);
      name = college?.name;
    }else if(type === FieldType.Channel){
      const channel = await findChannel(id);
      name = channel?.name;
    }
    if(lsTest() && name){
      let tempObj;
      if(field){
        tempObj = field[type];
        if(tempObj){
          // 1달 단위 or 100개 단위 refresh
          if(moment(field.createDate).diff(moment(),'months') < 0 || Object.keys(field[type]).length > 100){
            tempObj = {[type] : {[id]: name}, 'createDate': moment().toISOString(true)};
          }else{
            // add
            field[type][id] = name;
            tempObj = {...field, ...{[type] : field[type]}};
          }
        }else{
          // type new
          tempObj = {...field, ...{[type] : {[id]: name}}};
        }
      }else{
        // new
        tempObj = {[type] : {[id]: name}, 'createDate': moment().toISOString(true)};
      }
      localStorage.setItem(FIELD_STORAGE_KEY, JSON.stringify(tempObj));
    }
  }
  return name;
}

const setResultName = async (field:Field) => {
  const result: Field = {
    type: field.type,
    id: field.id
  }
  const name = await getFieldName(field.id, field.type);
  if(name){
    result.name = name;
  }
  return result;
}

export function actionTrackView({ email, path, pathName, search, referer, refererName, refererSearch, areaType, area, areaId, target }: ActionTrackParam) {
  /**
   * TODO
   * serviceType : path
   * pathName/refererName : path
   */
  // field name setting
  const fields = [];
  fields.push(getPathValue(path, 'college', FieldType.College));
  fields.push(getPathValue(path, 'channel', FieldType.Channel));
  fields.push(getPathValue(path, 'course-plan', FieldType.Course));
  fields.push(getPathValue(path, 'cube', FieldType.Cube));

  search = search ? decodeURI(search) : '';
  refererSearch = refererSearch ? decodeURI(refererSearch) : '';

  const promises: any[] = [];
  fields.filter( field => field != null ).forEach(field => {
    if(field){
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
      referer: referer ? window.location.origin + referer + refererSearch: null,
      refererName: refererName || null,
      areaType: areaType || null,
      area: area || null,
      areaId: areaId || null,
      poc: 'web',
    };
    const actionTrackViewModel: ActionTrackViewModel = {
      context,
      serviceType: getServiceType(path),
      collegeId: result.find(r=>r.type===FieldType.College)?.id,
      collegeName: result.find(r=>r.type===FieldType.College)?.name,
      channelId: result.find(r=>r.type===FieldType.Channel)?.id,
      channelName: result.find(r=>r.type===FieldType.Channel)?.name,
      coursePlanId: result.find(r=>r.type===FieldType.Course)?.id,
      courseName: result.find(r=>r.type===FieldType.Course)?.name,
      cubeId: result.find(r=>r.type===FieldType.Cube)?.id,
      cubeName: result.find(r=>r.type===FieldType.Cube)?.name,
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
