
import { axiosApi as axios } from '@nara.platform/accent';
import { apiHelper } from 'shared';
import { JobGroupModel } from '../../model/JobGroupModel';


class JobGroupApi {
  //
  URL = '/api/college/jobGroups';

  static instance: JobGroupApi;


  findAllJobGroups() {
    //
    return axios.get<JobGroupModel[]>(this.URL)
      .then(response => apiHelper.responseToModels(response, JobGroupModel));
  }

  findJobGroupById(jobGroupId: string) {
    //
    if (!jobGroupId) {
      return Promise.resolve(null);
    }
    return axios.get<JobGroupModel>(this.URL + `/${jobGroupId}`)
      .then(response => apiHelper.responseToModel(response, JobGroupModel));
  }
}

Object.defineProperty(JobGroupApi, 'instance', {
  value: new JobGroupApi(),
  writable: false,
  configurable: false,
});

export default JobGroupApi;
