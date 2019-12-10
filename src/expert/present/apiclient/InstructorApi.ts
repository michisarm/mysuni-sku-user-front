import { axiosApi as axios } from '@nara.platform/accent';
import { InstructorModel } from '../../model/InstructorModel';
import { OffsetElement } from '../../model/OffsetElement';

export default class InstructorApi {
  URL = '/api/expert';

  static instance: InstructorApi;

  findInstructor(id: string) {
    //
    return axios.get<OffsetElement<InstructorModel>>(this.URL + `/${id}`)
      .then(response => response && response.data || null)
      .catch((t) => {
        console.log(t);
      });
  }

}

Object.defineProperty(InstructorApi, 'instance', {
  value: new InstructorApi(),
  writable: false,
  configurable: false,
});
