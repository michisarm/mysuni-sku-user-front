
import { axiosApi as axios, OffsetElementList } from '@nara.platform/accent';
import { NameValueList } from 'shared/model';
import { CoursePlanModel, CoursePlanContentsModel, CoursePlanRdoModel } from '../../model';
import {CoursePlanCustomModel} from '../../model/CoursePlanCustomModel';

export default class CoursePlanApi {
  //
  static instance: CoursePlanApi;

  URL = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_COURSE_PLAN_API === undefined || process.env.REACT_APP_COURSE_PLAN_API === '' ?
    '/api/course/coursePlans' : process.env.REACT_APP_COURSE_PLAN_API;

  DetailURL = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_COURSE_PLAN_API === undefined || process.env.REACT_APP_COURSE_PLAN_API === '' ?
    '/api/course/coursePlan' : process.env.REACT_APP_COURSE_PLAN_API;

  coursePlanContentsURL = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_COURSE_PLAN_CONTENT_API === undefined || process.env.REACT_APP_COURSE_PLAN_CONTENT_API === '' ?
    '/api/course/coursePlanContents' : process.env.REACT_APP_COURSE_PLAN_CONTENT_API;


  registerCoursePlan(coursePlan: CoursePlanModel) {
    //
    return axios.post<string>(this.URL, coursePlan)
      .then(response => response && response.data || null);
  }

  findCoursePlan(coursePlanId: string) {
    //
    return axios.get<CoursePlanModel>(this.URL + `/${coursePlanId}`)
      .then(response => response && response.data || null);
  }

  findAllCoursePlan(offset: number = 0, limit: number = 20) {
    //
    return axios.get<OffsetElementList<CoursePlanModel>>(this.URL + `?offset=${offset}&limit=${limit}`)
      .then(response => response && response.data || null);
  }

  findAllCoursePlanByQuery(coursePlanRdo: CoursePlanRdoModel) {
    //
    return axios.get<OffsetElementList<CoursePlanModel>>(this.URL + `/searchKey`, { params: coursePlanRdo })
      .then(response => response && response.data || null);
  }

  modifyCoursePlan(coursePlanId: string, nameValues: NameValueList) {
    //
    return axios.put<string>(this.URL + `/${coursePlanId}`, nameValues);
  }

  registerCoursePlanContents(coursePlanContentsModel: CoursePlanContentsModel) {
    //
    return axios.post<string>(this.coursePlanContentsURL, coursePlanContentsModel)
      .then(response => response && response.data || null)
      .catch((reason) => {
        console.log(reason);
      });
  }

  findCoursePlanContents(coursePlanContentsId: string) {
    //
    return axios.get<CoursePlanContentsModel>(this.coursePlanContentsURL + `/${coursePlanContentsId}`)
      .then(response => response && response.data || null);
  }

  findCoursePlanContentsV2(coursePlanContentsId: string) {
    //
    return axios.get<CoursePlanContentsModel>(this.coursePlanContentsURL + `/v2/${coursePlanContentsId}`)
      .then(response => response && response.data || null);
  }

  modifyCoursePlanContents(coursePlanContentsId: string, nameValues: NameValueList) {
    //
    return axios.put<string>(this.coursePlanContentsURL + `/${coursePlanContentsId}`, nameValues);
  }

  findAllPrecedenceCourseList(coursePlanId: string) {
    return axios.get<OffsetElementList<CoursePlanModel>>(this.URL + `/precedenceCourseList/${coursePlanId}` )
      .then(response => response && response.data || null);

  }

  findAllPreCourseIdList(coursePlanId: string) {
    return axios.get<string[]>(this.URL + `/preCourseIdList/${coursePlanId}` )
      .then(response => response && response.data || null);

  }

  findAllCoursePlanInfo(coursePlanId: string, courseLectureId: string) {
    return axios.get<CoursePlanCustomModel>(`${this.DetailURL}?coursePlanId=${coursePlanId}&courseLectureId=${courseLectureId}`,)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(CoursePlanApi, 'instance', {
  value: new CoursePlanApi(),
  writable: false,
  configurable: false,
});
