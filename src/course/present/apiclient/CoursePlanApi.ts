
import { axiosApi as axios, OffsetElementList } from '@nara.platform/accent';
import { NameValueList } from 'shared/model';
import { CoursePlanModel, CoursePlanContentsModel, CoursePlanRdoModel } from '../../model';

export default class CoursePlanApi {
  URL = '/api/course/coursePlans';
  coursePlanContentsURL = '/api/course/coursePlanContents';

  static instance: CoursePlanApi;

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

  modifyCoursePlanContents(coursePlanContentsId: string, nameValues: NameValueList) {
    //
    return axios.put<string>(this.coursePlanContentsURL + `/${coursePlanContentsId}`, nameValues);
  }

}

Object.defineProperty(CoursePlanApi, 'instance', {
  value: new CoursePlanApi(),
  writable: false,
  configurable: false,
});
