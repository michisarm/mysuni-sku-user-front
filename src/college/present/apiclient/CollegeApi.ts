import { axiosApi as axios } from '@nara.platform/accent';
import { CollegeModel } from '../../model/CollegeModel';
import { JobGroupModel } from '../../model/JobGroupModel';
import { createCacheApi } from '../../../lecture/detail/api/cacheableApi';
import { CollegeBanner } from '../../model/CollegeBanner';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';

const BASE_URL = '/api/college/colleges';

export function findCollege(
  collegeId: string
): Promise<CollegeModel | undefined> {
  const url = `${BASE_URL}/${collegeId}`;
  return axios.get<CollegeModel>(url).then(AxiosReturn);
}

export default class CollegeApi {
  URLCollege = '/api/college/colleges';
  URLJob = '/api/college/jobGroups';

  static instance: CollegeApi;

  registerCollege(college: CollegeModel) {
    return axios
      .post<string>(this.URLCollege, college)
      .then((response) => (response && response.data) || null)
      .catch(() => {});
  }

  findCollege(collegeId: string) {
    //
    return axios
      .get<CollegeModel>(this.URLCollege + `/${collegeId}`)
      .then(
        (response) => (response && new CollegeModel(response.data)) || null
      );
  }

  findAllColleges() {
    //
    return axios
      .get<CollegeModel[]>(this.URLCollege + '/available')
      .then(
        (response) =>
          (response &&
            Array.isArray(response.data) &&
            response.data.map((college) => new CollegeModel(college))) ||
          []
      );
  }

  findAllCollegesForCreate() {
    //
    return axios
      .get<CollegeModel[]>(this.URLCollege + '/forCreate')
      .then(
        (response) =>
          (response && Array.isArray(response.data) && response.data) || []
      );
  }

  findAllJobGroups() {
    return axios
      .get<JobGroupModel[]>(this.URLJob)
      .then(
        (response) =>
          (response && Array.isArray(response.data) && response.data) || []
      );
  }

  findJobGroupById(jobGroupId: string) {
    return axios
      .get<JobGroupModel>(this.URLJob + `/${jobGroupId}`)
      .then((response) => (response && response.data) || null);
  }

  findCollegesForCurrentCineroom() {
    //
    return axios
      .get<CollegeModel[]>(this.URLCollege + `/forCurrentCineroom`)
      .then((response) => (response && response.data) || null);
  }

  findCollegeBanners() {
    return axios
      .get<CollegeBanner[]>(this.URLCollege + `/banner`)
      .then((response) => (response && response.data) || null);
  }

  findAllCollegeAndChannels() {
    return axios
      .get<CollegeModel[]>('/api/college/colleges')
      .then((response) => response.data);
  }
}

Object.defineProperty(CollegeApi, 'instance', {
  value: new CollegeApi(),
  writable: false,
  configurable: false,
});
