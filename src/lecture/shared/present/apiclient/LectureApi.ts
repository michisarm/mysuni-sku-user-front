import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import { ChannelModel } from 'college/model';
import LectureModel from '../../../model/LectureModel';
import LectureRdoModel from '../../../model/LectureRdoModel';
import LectureViewModel from '../../../model/LectureViewModel';
import LectureViewRdoModel from '../../../model/LectureViewRdoModel';
import ChannelCountRdo from '../../../model/ChannelCountRdo';
import CommunityLectureRdoModel from '../../../model/CommunityLectureRdoModel';
import InstructorRdoModel from '../../../model/InstructorRdoModel';
import SharedRdoModel from '../../../model/SharedRdoModel';


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

  findLectureViews(coursePlanId: string, lectureCardUsids: string[], courseLectureUsids?: string[]) {
    //
    if ((!lectureCardUsids || lectureCardUsids.length < 1) && (!courseLectureUsids || courseLectureUsids.length < 1 )) {
      return Promise.resolve([]);
    }

    const params = new LectureViewRdoModel({
      coursePlanId,
      lectureCardIds: lectureCardUsids,
      courseLectureIds: courseLectureUsids || [],
    });

    return axiosApi.post<LectureViewModel[]>(this.baseUrl + `/view`, params)
      .then(response => (response && response.data && response.data.map((lectureViewModel) => new LectureViewModel(lectureViewModel))) || []);
  }

  findAllLecturesByInstructorId(instructorRdo: InstructorRdoModel) {
    //
    const params = instructorRdo;
    return axiosApi.get<OffsetElementList<LectureModel>>(this.baseUrl + '/byInstructorId', { params })
      .then(response => response && response.data);
  }

  findAllSharedLectures(sharedRdo: SharedRdoModel) {
    //
    return axiosApi.post<OffsetElementList<LectureModel>>(this.baseUrl + '/shared', sharedRdo)
      .then(response => response && response.data);
  }
}

LectureApi.instance = new LectureApi();

export default LectureApi;
