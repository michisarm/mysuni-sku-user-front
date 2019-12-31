
import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import { ChannelModel } from 'college';
import LectureModel from '../../model/LectureModel';
import LectureRdoModel from '../../model/LectureRdoModel';
import LectureViewModel from '../../model/LectureViewModel';
import ChannelCountRdo from '../../model/ChannelCountRdo';
import CommunityLectureRdoModel from '../../model/CommunityLectureRdoModel';
import InstructorRdoModel from '../../model/InstructorRdoModel';


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

  findAllCommunityLectures(lectureRdo: CommunityLectureRdoModel) {
    //
    const params = lectureRdo;

    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl + '/community', { params })
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

  findLectureViews(lectureCardUsids: string[], courseLectureUsids?: string[]) {
    //
    if ((!lectureCardUsids || lectureCardUsids.length < 1) && (!courseLectureUsids || courseLectureUsids.length < 1 )) {
      return Promise.resolve([]);
    }

    let lectureCardIdsParam = 'lectureCardIds=';
    let courseLectureIdsParam = 'courseLectureIds=';

    if (lectureCardUsids && lectureCardUsids.length > 0) {
      lectureCardIdsParam = lectureCardUsids.map((lectureCardUsid) => `lectureCardIds=${lectureCardUsid}`).join('&');
    }
    if (courseLectureUsids && courseLectureUsids.length > 0) {
      courseLectureIdsParam = courseLectureUsids.map((courseLectureUsid) => `courseLectureIds=${courseLectureUsid}`).join('&');
    }
    const queryParams = `${lectureCardIdsParam}&${courseLectureIdsParam}`;

    return axiosApi.get<LectureViewModel[]>(this.baseUrl + `/view?${queryParams}`)
      .then(response => (response && response.data && response.data.map((lectureViewModel) => new LectureViewModel(lectureViewModel))) || []);
  }

  findAllLecturesByInstructorId(instructorRdo: InstructorRdoModel) {
    //
    const params = instructorRdo;
    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl + '/byInstructorId', { params })
      .then(response => response && response.data);
  }

  findAllSharedLectures(lectureRdo: LectureRdoModel) {
    //
    const params = lectureRdo;
    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl + '/shared', { params })
      .then(response => response && response.data);
  }
}

LectureApi.instance = new LectureApi();

export default LectureApi;
