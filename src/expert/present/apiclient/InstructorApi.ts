import { axiosApi as axios } from '@nara.platform/accent';
import { createCacheApi } from '../../../lecture/detail/api/cacheableApi';
import { InstructorModel } from '../../model/InstructorModel';
import { OffsetElement } from '../../model/OffsetElement';

export default class InstructorApi {
  URL = '/api/expert/v1/instructors';

  static instance: InstructorApi;

  findInstructor(id: string) {
    //
    return axios
      .get<OffsetElement<InstructorModel>>(this.URL + `/${id}`)
      .then(
        response =>
          (response &&
            response.data &&
            new InstructorModel(response.data.result)) ||
          new InstructorModel()
      )
      .catch(() => {
        return new InstructorModel();
      });
  }
}

Object.defineProperty(InstructorApi, 'instance', {
  value: new InstructorApi(),
  writable: false,
  configurable: false,
});

function findInstructor(id: string) {
  //
  return axios
    .get<OffsetElement<InstructorModel>>(
      '/api/expert/v1/instructors' + `/${id}`
    )
    .then(
      response =>
        (response &&
          response.data &&
          new InstructorModel(response.data.result)) ||
        new InstructorModel()
    )
    .catch(() => {
      return new InstructorModel();
    });
}

export const [findInstructorCache, clearFindInstructor] = createCacheApi(
  findInstructor
);
