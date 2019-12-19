
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList, IdName } from 'shared';
import LectureModel from '../../model/LectureModel';
import LectureRdoModel from '../../model/LectureRdoModel';
import ChannelCountRdo from '../../model/ChannelCountRdo';


class LectureApi {
  //
  static instance: LectureApi;

  baseUrl = '/api/lecture/lectures';


  findAllLectures(lectureRdo: LectureRdoModel) {
    //
    // Todo: API 정상작동 하면 수정
    const params = lectureRdo;

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl, { params })
      .then(response => response && response.data || []);
  }

  findLectureCountByCollegeId(collegeId: string) {
    //
    return Promise.resolve([
      new ChannelCountRdo({ channel: new IdName({ id: 'AI Fundamental', name: 'AI Fundamental' }), lectureCount: 10 }),
      new ChannelCountRdo({ channel: new IdName({ id: 'AI Biz. Implementation', name: 'AI Biz. Implementation' }), lectureCount: 0 }),
      new ChannelCountRdo({ channel: new IdName({ id: 'AI Tech Essential', name: 'AI Tech Essential' }), lectureCount: 10 }),
    ]);
    // const params = {
    //   collegeId,
    // };
    //
    // return axiosApi.get<ChannelCountRdo[]>(this.baseUrl, { params })
    //   .then(response => response && response.data || []);
  }
}

LectureApi.instance = new LectureApi();

export default LectureApi;
