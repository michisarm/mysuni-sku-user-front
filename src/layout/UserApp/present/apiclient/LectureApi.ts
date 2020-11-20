
import { axiosApi } from '@nara.platform/accent';
import { ChannelModel } from 'college/model';
import ChannelCountRdo from '../../model/ChannelCountRdo';


class LectureApi {
  //
  static instance: LectureApi;

  baseUrl = '/api/lecture/lectures';


  findLectureCountByChannels(collegeId: string, channels: ChannelModel[]) {
    //
    if (!channels || channels.length < 1) {
      return Promise.resolve([]);
    }

    const queryParams = `collegeId=${collegeId}&${channels.map((channel) => `channels=${channel.id}`).join('&')}`;

    return axiosApi.get<ChannelCountRdo[]>(this.baseUrl + `/count/byChannels?${queryParams}`)
      .then(response =>
        response && Array.isArray(response.data)
          && response.data.map((channelCount) => new ChannelCountRdo(channelCount)) || []
      );
  }

  findPhotoUrls(usids: string[]) {
    const queryParams = `${usids.map(id => `usids=${id}`).join('&')}`

    return axiosApi.get<Array<string>>(`/api/expert/v1/instructors/usids?${queryParams}`)
      .then(response =>
        response && Array.isArray(response.data)
          && response.data || []
      );
  }

}

LectureApi.instance = new LectureApi();

export default LectureApi;
