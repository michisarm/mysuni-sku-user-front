
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
    const params = lectureRdo;

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl, { params })
      .then(response => response && response.data || []);
  }

  findLectureCountByChannels(collegeId: string, channels: ChannelModel[]) {
    //
    if (!channels || channels.length < 1) {
      return Promise.resolve([]);
    }

    const queryParams = `collegeId=${collegeId}&${channels.map((channel) => `channels=${channel.id}`).join('&')}`;

    return axiosApi.get<ChannelCountRdo[]>(this.baseUrl + `/count/byChannels?${queryParams}`)
      .then(response => response && response.data || []);
  }
}

LectureApi.instance = new LectureApi();

export default LectureApi;
