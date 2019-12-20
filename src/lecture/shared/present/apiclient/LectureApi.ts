
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import { ChannelModel } from 'college';
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

  findLectureCountByChannels(collegeId: string, channels: ChannelModel[]) {
    //
    // return Promise.resolve([
    //   new ChannelCountRdo({ channel: new IdName({ id: 'AI Fundamental', name: 'AI Fundamental' }), lectureCount: 10 }),
    //   new ChannelCountRdo({ channel: new IdName({ id: 'AI Biz. Implementation', name: 'AI Biz. Implementation' }), lectureCount: 0 }),
    //   new ChannelCountRdo({ channel: new IdName({ id: 'AI Tech Essential', name: 'AI Tech Essential' }), lectureCount: 10 }),
    // ]);
    if (!channels || channels.length < 1) {
      return Promise.resolve([]);
    }

    const queryParams = `collegeId=${collegeId}&${channels.map((channel) => `channels=${channel.id}`).join('&')}`;
    // {
    //   collegeId,
    //   channels: channels.map((channel) => channel.id),
    // };
    console.log('params', queryParams);

    return axiosApi.get<ChannelCountRdo[]>(this.baseUrl + `/count/byChannels?${queryParams}`)
      .then(response => response && response.data || []);
  }
}

LectureApi.instance = new LectureApi();

export default LectureApi;
