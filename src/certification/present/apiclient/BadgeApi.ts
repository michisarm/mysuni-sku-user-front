
import {axiosApi} from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import BadgeFilterRdoModel from '../../ui/model/BadgeFilterRdoModel';
import BadgeModel from '../../ui/model/BadgeModel';
// for Test by JSM
import {badgeData, challengingBadgeData} from './badgeData';
import BadgeCountModel from '../../ui/model/BadgeCountModel';


class BadgeApi {
  //
  static instance: BadgeApi;

  serverUrl = '/api/badge';
  baseUrl = process.env.REACT_APP_BADGE_LECTURE_API  === undefined || process.env.REACT_APP_BADGE_LECTURE_API  === '' ?
    this.serverUrl : process.env.REACT_APP_BADGE_LECTURE_API ;

  findPagingAllBadges(inMyLectureRdo: BadgeFilterRdoModel) {
    //
    const params = {
      categoryId: inMyLectureRdo.categoryId,
      difficultyLevel: inMyLectureRdo.difficultyLevel,
      limit: inMyLectureRdo.limit,
      offset: inMyLectureRdo.offset,
    };

    // return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + '/lectures', {params})
    //   .then(response => response && response.data);


    // for Test by JSM : 테스트 후 지울 것
    return <OffsetElementList<BadgeModel>>(badgeData);
  }

  findPagingChallengingBadges(inMyLectureRdo: BadgeFilterRdoModel) {
    //
    const params = {
      patronKey: inMyLectureRdo.patronKey,
      difficultyLevel: inMyLectureRdo.difficultyLevel,
      limit: inMyLectureRdo.limit,
      offset: inMyLectureRdo.offset,
    };

    // return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + '/challenging', {params})
    //   .then(response => response && response.data);


    // for Test by JSM : 테스트 후 지울 것
    return <OffsetElementList<BadgeModel>>(challengingBadgeData);
  }

  findPagingEarnedBadges(inMyLectureRdo: BadgeFilterRdoModel) {
    //
    const params = {
      patronKey: inMyLectureRdo.patronKey,
      difficultyLevel: inMyLectureRdo.difficultyLevel,
      issueState: inMyLectureRdo.issueState,
      limit: inMyLectureRdo.limit,
      offset: inMyLectureRdo.offset,
    };

    // return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + '/earned', {params})
    //   .then(response => response && response.data);


    // for Test by JSM : 테스트 후 지울 것
    return <OffsetElementList<BadgeModel>>(badgeData);
  }

  getCountOfBadges() {
    // return axiosApi.get<BadgeCountModel>(this.baseUrl + '/mybadges/tab/counts')
    //   .then(response => response && response.dataa);

    return {
      code: '200',
      message: 'success',
      totalCount: 18,
      challengedCount: 14,
      issuedCount: 16,
    };
  }

  /*
  getTotalBadgeCount(inMyLectureRdo: BadgeFilterRdoModel): number {
    //
    // const params = {
    //   categoryId: inMyLectureRdo.categoryId,
    //   difficultyLevel: inMyLectureRdo.difficultyLevel,
    //   limit: inMyLectureRdo.limit,
    //   offset: inMyLectureRdo.offset,
    // };
    //
    // return axiosApi.get<number>(this.baseUrl + '/totalCount', {params})
    //   .then(response => response.data.valueOf());

    // for Test by JSM : 테스트 후 지울 것
    return 14;
  }
  getChallengingBadgeCount(inMyLectureRdo: BadgeFilterRdoModel): number {
    //
    // const params = {
    //   patronKey: inMyLectureRdo.patronKey,
    //   difficultyLevel: inMyLectureRdo.difficultyLevel,
    //   limit: inMyLectureRdo.limit,
    //   offset: inMyLectureRdo.offset,
    // };
    //
    // return axiosApi.get<number>(this.baseUrl + '/challengingCount', {params})
    //   .then(response => response.data.valueOf());

    // for Test by JSM : 테스트 후 지울 것
    return 16;
  }
  getEarnedBadgeCount(inMyLectureRdo: BadgeFilterRdoModel): number {
    //
    // const params = {
    //   patronKey: inMyLectureRdo.patronKey,
    //   difficultyLevel: inMyLectureRdo.difficultyLevel,
    //   limit: inMyLectureRdo.limit,
    //   offset: inMyLectureRdo.offset,
    // };
    //
    // return axiosApi.get<number>(this.baseUrl + '/earnedCount', {params})
    //   .then(response => response.data.valueOf());

    // for Test by JSM : 테스트 후 지울 것
    return 18;
  }
  */
}

BadgeApi.instance = new BadgeApi();

export default BadgeApi;
