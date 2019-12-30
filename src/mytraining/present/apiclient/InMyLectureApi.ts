
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import InMyLectureRdoModel from '../../model/InMyLectureRdoModel';
import InMyLectureModel from '../../model/InMyLectureModel';


class InMyLectureApi {
  //
  static instance: InMyLectureApi;

  baseUrl = '/api/mytraining/mytraining/inmylectures';


  findAllInMyLectures(inMyLectureRdo: InMyLectureRdoModel) {
    //
    const params = inMyLectureRdo;

    return axiosApi.get<OffsetElementList<InMyLectureModel>>(this.baseUrl + '/myLectures', { params })
      .then(response => response && response.data);
  }
}

InMyLectureApi.instance = new InMyLectureApi();

export default InMyLectureApi;
