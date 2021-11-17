import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import { ChannelModel } from 'college/model';
import LectureModel from '../../../model/LectureModel';
import LectureRdoModel from '../../../model/LectureRdoModel';
import LectureViewModel from '../../../model/LectureViewModel';
import LectureViewRdoModel from '../../../model/LectureViewRdoModel';
import ChannelCountRdo from '../../../model/ChannelCountRdo';
import CommunityLectureRdoModel from '../../../model/CommunityLectureRdoModel';
import InstructorRdoModel from '../../../model/InstructorRdoModel';
import SharedRdoModel from '../../../model/SharedRdoModel';
import CardQdo from 'lecture/model/learning/CardQdo';
import CardForUserViewModel from 'lecture/model/learning/CardForUserViewModel';
import { ParsingLearningType } from 'myTraining/model/filter/ParsingLearningType';
import { CountByCardTypeModel } from 'myTraining/model/filter/CountByCardTypeModel';
import { CountByCollegeIdModel } from 'myTraining/model/filter/CountByCollegeIdModel';

class LectureApi {
  //
  static instance: LectureApi;

  learningUrl = '/api/lecture/cards';
  baseUrl =
    process.env.REACT_APP_LECTURE_API === undefined ||
    process.env.REACT_APP_LECTURE_API === ''
      ? '/api/lecture/lectures'
      : process.env.REACT_APP_LECTURE_API;

  findAllLectures(lectureRdo: LectureRdoModel) {
    //
    const params = lectureRdo;

    return axiosApi
      .get<OffsetElementList<LectureModel>>(this.baseUrl, { params })
      .then((response) => response && response.data);
  }

  findAllCommunityLectures(lectureRdo: CommunityLectureRdoModel) {
    //
    const params = lectureRdo;

    return axiosApi
      .get<OffsetElementList<LectureModel>>(this.baseUrl + '/community', {
        params,
      })
      .then((response) => response && response.data);
  }

  findLectureCountByChannels(collegeId: string, channels: ChannelModel[]) {
    //
    if (!channels || channels.length < 1) {
      return Promise.resolve([]);
    }

    const queryParams = `collegeId=${collegeId}&${channels
      .map((channel) => `channels=${channel.id}`)
      .join('&')}`;

    return axiosApi
      .get<ChannelCountRdo[]>(this.baseUrl + `/count/byChannels?${queryParams}`)
      .then((response) => (response && response.data) || []);
  }

  findLectureViews(
    coursePlanId: string,
    lectureCardUsids: string[],
    courseLectureUsids?: string[]
  ) {
    //
    if (
      (!lectureCardUsids || lectureCardUsids.length < 1) &&
      (!courseLectureUsids || courseLectureUsids.length < 1)
    ) {
      return Promise.resolve([]);
    }

    const params = new LectureViewRdoModel({
      coursePlanId,
      lectureCardIds: lectureCardUsids,
      courseLectureIds: courseLectureUsids || [],
    });

    return axiosApi
      .post<LectureViewModel[]>(this.baseUrl + `/view`, params)
      .then(
        (response) =>
          (response &&
            response.data &&
            response.data.map(
              (lectureViewModel) => new LectureViewModel(lectureViewModel)
            )) ||
          []
      );
  }

  findLectureViewsV2(
    coursePlanId: string,
    lectureCardUsids: string[],
    courseLectureUsids?: string[]
  ) {
    //
    if (
      (!lectureCardUsids || lectureCardUsids.length < 1) &&
      (!courseLectureUsids || courseLectureUsids.length < 1)
    ) {
      return Promise.resolve([]);
    }

    const params = new LectureViewRdoModel({
      coursePlanId,
      lectureCardIds: lectureCardUsids,
      courseLectureIds: courseLectureUsids || [],
    });

    return axiosApi
      .post<LectureViewModel[]>(this.baseUrl + `/v2/view`, params)
      .then(
        (response) =>
          (response &&
            response.data &&
            response.data.map(
              (lectureViewModel) => new LectureViewModel(lectureViewModel)
            )) ||
          []
      );
  }

  findAllLecturesByInstructorId(instructorRdo: InstructorRdoModel) {
    //
    const params = instructorRdo;
    return axiosApi
      .get<OffsetElementList<LectureModel>>(this.baseUrl + '/byInstructorId', {
        params,
      })
      .then((response) => response && response.data);
  }

  findAllSharedLectures(sharedRdo: SharedRdoModel) {
    //
    return axiosApi
      .post<OffsetElementList<LectureModel>>(
        this.baseUrl + '/shared',
        sharedRdo
      )
      .then((response) => response && response.data);
  }

  // Learning Page

  countMyStamp() {
    //
    return axiosApi
      .get<number>(this.learningUrl + '/countUserStamp')
      .then((response) => response && response.data);
  }

  findMyLearningLectures(cardQdo: CardQdo) {
    //
    return axiosApi
      .get<OffsetElementList<CardForUserViewModel>>(
        this.learningUrl + '/findCardWithPhaseCountForUserViewRdoByCardQdo',
        { params: cardQdo }
      )
      .then((response) => response && response.data);
  }

  // filter
  findCardTypeAndCardCount(
    type: ParsingLearningType,
    hasStamp?: boolean,
    searchable?: boolean
  ) {
    //
    return axiosApi
      .get<CountByCardTypeModel[]>(this.learningUrl + '/cardTypeAndCardCount', {
        params: { type, hasStamp, searchable },
      })
      .then((response) => (response && response.data) || []);
  }

  findCollegeAndCardCount(
    type: ParsingLearningType,
    hasStamp?: boolean,
    searchable?: boolean
  ) {
    //
    return axiosApi
      .get<CountByCollegeIdModel[]>(this.learningUrl + '/collegeAndCardCount', {
        params: { type, hasStamp, searchable },
      })
      .then((response) => (response && response.data) || []);
  }
}

LectureApi.instance = new LectureApi();

export default LectureApi;
