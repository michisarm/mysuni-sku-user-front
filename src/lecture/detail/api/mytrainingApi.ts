import { axiosApi, PatronType } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import InMyLectureCdo from '../model/InMyLectureCdo';
import InMyLectureModel from '../model/InMyLectureModel';

const BASE_URL = '/api/mytraining';

export function addInMyLecture(inMyLectureCdo: InMyLectureCdo) {
  const url = `${BASE_URL}/mytraining/inmylecture`;
  return axiosApi
    .post<string>(url, inMyLectureCdo)
    .then(response => response && response.data);
}

export function removeInMyLecture(inMyLectureId: string) {
  const url = `${BASE_URL}/mytraining/inmylecture/${inMyLectureId}`;
  return axiosApi.delete(url).then(response => response && response.data);
}

export function findInMyLecture(serviceId: string, serviceType: string) {
  const url = `${BASE_URL}/mytraining/inmylecture/myLecture`;
  const params = {
    limit: 0,
    offset: 0,
    denizenKey: {
      keyString: patronInfo.getPatronId() || '',
      patronType: PatronType.Audience,
    },
    serviceId,
    serviceType,
  };
  return axiosApi
    .get<InMyLectureModel>(url, { params })
    .then(response => response && response.data);
}
