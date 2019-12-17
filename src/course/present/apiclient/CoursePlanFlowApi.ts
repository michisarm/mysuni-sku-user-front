import { axiosApi as axios } from '@nara.platform/accent';
import { CoursePlanFlowCdoModel } from '../../model/CoursePlanFlowCdoModel';
import { CoursePlanFlowUdoModel } from '../../model/CoursePlanFlowUdoModel';
import { CourseRequestCdoModel } from '../../model/CourseRequestCdoModel';

export default class CoursePlanFlowApi {
  URL = '/api/course/coursePlans/flow';

  static instance: CoursePlanFlowApi;

  makeCoursePlan(courseFlowCdo: CoursePlanFlowCdoModel) {
    //
    return axios.post<string>(this.URL, courseFlowCdo)
      .then(response => response && response.data || null);
  }

  modifyCoursePlan(coursePlanId: string, coursePlanFlowUdoModel: CoursePlanFlowUdoModel) {
    //
    return axios.put<string>(this.URL + `/${coursePlanId}`, coursePlanFlowUdoModel);
  }

  removeCoursePlan(coursePlanId: string) {
    //
    return axios.delete(this.URL + `/${coursePlanId}`);
  }

  coursePlanRequestOpen(coursePlanRequestCdo: CourseRequestCdoModel) {
    //
    return axios.post<string>(this.URL + `/requestOpen`, coursePlanRequestCdo)
      .then(response => response && response.data || null);
  }

  coursePlanRequestReject(coursePlanRequestCdo: CourseRequestCdoModel) {
    //
    return axios.post<string>(this.URL + `/requestReject`, coursePlanRequestCdo)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(CoursePlanFlowApi, 'instance', {
  value: new CoursePlanFlowApi(),
  writable: false,
  configurable: false,
});
