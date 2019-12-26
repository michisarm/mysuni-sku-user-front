
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import { ChannelModel } from 'college';
import LectureModel from '../../model/LectureModel';
import LectureRdoModel from '../../model/LectureRdoModel';
import LectureViewModel from '../../model/LectureViewModel';
import ChannelCountRdo from '../../model/ChannelCountRdo';


class LectureApi {
  //
  static instance: LectureApi;

  baseUrl = '/api/lecture/lectures';


  findAllLectures(lectureRdo: LectureRdoModel) {
    //
    const params = lectureRdo;

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl, { params })
      .then(response => response && response.data);
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

  findLectureViews(lectureCardIds: string[], courseLectureIds?: string[]) {
    //
    if ((!lectureCardIds || lectureCardIds.length < 1) && (!courseLectureIds || courseLectureIds.length < 1 )) {
      return Promise.resolve([]);
    }

    let lectureCardIdsParam = 'lectureCardIds=';
    let courseLectureIdsParam = 'courseLectureIds=';

    if (lectureCardIds && lectureCardIds.length > 0) {
      lectureCardIdsParam = lectureCardIds.map((lectureCardId) => `lectureCardIds=${lectureCardId}`).join('&');
    }
    if (courseLectureIds && courseLectureIds.length > 0) {
      courseLectureIdsParam = courseLectureIds.map((courseLectureId) => `courseLectureIds=${courseLectureId}`).join('&');
    }
    const queryParams = `${lectureCardIdsParam}&${courseLectureIdsParam}`;

    return axiosApi.get<LectureViewModel[]>(this.baseUrl + `/view?${queryParams}`)
      .then(response => (response && response.data && response.data.map((lectureViewModel) => new LectureViewModel(lectureViewModel))) || []);
  }
}

LectureApi.instance = new LectureApi();

export default LectureApi;
