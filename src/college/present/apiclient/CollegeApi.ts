import { axiosApi as axios } from '@nara.platform/accent';
import { CollegeModel } from '../../model/CollegeModel';
import { JobGroupModel } from '../../model/JobGroupModel';

export default class CollegeApi {

  URLCollege = '/api/college/colleges';
  URLJob = '/api/college/jobGroups';

  static instance: CollegeApi;

  registerCollege(college: CollegeModel) {
    return axios.post<string>(this.URLCollege, college)
      .then(response => response && response.data || null)
      .catch((reason) => {
        console.log(reason);
      });
  }

  findCollege(collegeId: string) {
    //
    return axios.get<CollegeModel>(this.URLCollege + `/${collegeId}`)
      .then(response => response && new CollegeModel(response.data) || null);
  }

  findAllColleges() {
    //
    return axios.get<CollegeModel[]>(this.URLCollege + '/available')
      .then(response => response && Array.isArray(response.data) && response.data.map(college => new CollegeModel(college)) || []);
  }

  findAllCollegesForCreate() {
    //
    return axios.get<CollegeModel[]>(this.URLCollege + '/forCreate')
      .then(response => response && Array.isArray(response.data) && response.data || []);
  }

  findAllJobGroups() {
    return axios.get<JobGroupModel[]>(this.URLJob)
      .then(response => response && Array.isArray(response.data) && response.data || []);
  }

  findJobGroupById(jobGroupId:string) {
    return axios.get<JobGroupModel>(this.URLJob + `/${jobGroupId}`)
      .then(response => response && response.data || null);
  }

  findCollegesForCurrentCineroom() {
    //
    return axios.get<CollegeModel[]>(this.URLCollege  + `/forCurrentCineroom`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(CollegeApi, 'instance', {
  value: new CollegeApi(),
  writable: false,
  configurable: false,
});
