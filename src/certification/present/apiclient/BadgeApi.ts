
import {axiosApi} from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import BadgeFilterRdoModel from '../../ui/model/BadgeFilterRdoModel';
import BadgeModel from '../../ui/model/BadgeModel';
import CategoryModel from '../../ui/model/CategoryModel';
// for Test by JSM
import {badgeData, challengingBadgeData, mainBadgeData, myBadgeData, linkedBadgeData} from './badgeData';
import {categoryData} from './categoryData';
import {badgeDetailData} from './badgeDetailData';
import BadgeDetailModel from '../../ui/model/BadgeDetailModel';


class BadgeApi {
  //
  static instance: BadgeApi;

  serverUrl = '/api/badge';
  baseUrl = process.env.REACT_APP_BADGE_LECTURE_API  === undefined || process.env.REACT_APP_BADGE_LECTURE_API  === '' ?
    this.serverUrl : process.env.REACT_APP_BADGE_LECTURE_API ;

  findAllCategories() {
    //
    // return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + '/categoris')
    //   .then(response => response && response.data);

    // for Test by JSM : 테스트 후 지울 것
    return <OffsetElementList<CategoryModel>>(categoryData);
  }

  findPagingAllBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    const params = {
      categoryId: badgeFilterRdo.categoryId,
      difficultyLevel: badgeFilterRdo.difficultyLevel,
      limit: badgeFilterRdo.limit,
      offset: badgeFilterRdo.offset,
    };

    // return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + '/lectures', {params})
    //   .then(response => response && response.data);

    // for Test by JSM : 테스트 후 지울 것
    return <OffsetElementList<BadgeModel>>(badgeData);
  }

  // for Test by JSM : 테스트 후 지울 것
  findPagingMainChallengingBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    return <OffsetElementList<BadgeModel>>(mainBadgeData);
  }

  findPagingChallengingBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    const params = {
      patronKey: badgeFilterRdo.patronKey,
      difficultyLevel: badgeFilterRdo.difficultyLevel,
      limit: badgeFilterRdo.limit,
      offset: badgeFilterRdo.offset,
    };

    // return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + '/challenging', {params})
    //   .then(response => response && response.data);

    // for Test by JSM : 테스트 후 지울 것
    return <OffsetElementList<BadgeModel>>(challengingBadgeData);
  }

  findPagingEarnedBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    const params = {
      patronKey: badgeFilterRdo.patronKey,
      difficultyLevel: badgeFilterRdo.difficultyLevel,
      issueState: badgeFilterRdo.issueState,
      limit: badgeFilterRdo.limit,
      offset: badgeFilterRdo.offset,
    };

    // return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + '/earned', {params})
    //   .then(response => response && response.data);

    // for Test by JSM : 테스트 후 지울 것
    return <OffsetElementList<BadgeModel>>(myBadgeData);
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

  // PSJ 연관뱃지

  findLikedBadges(badgeId: string) {

    // return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + `/badges/${badgeId}/links`)
    //   .then(response => response && response.data);

    // for Test : 테스트 후 지울 것
    return <OffsetElementList<BadgeModel>>(linkedBadgeData);
  }

  findBadgeDetailInformation(badgeId: string) {

    // return axiosApi.get<BadgeDetailModel>(this.baseUrl + `/badges/${badgeId}`)
    //   .then(response => response && response.data);

    // for Test : 테스트 후 지울 것
    return <BadgeDetailModel>badgeDetailData;
  }

  /*
  getTotalBadgeCount(badgeFilterRdo: BadgeFilterRdoModel): number {
    //
    // const params = {
    //   categoryId: badgeFilterRdo.categoryId,
    //   difficultyLevel: badgeFilterRdo.difficultyLevel,
    //   limit: badgeFilterRdo.limit,
    //   offset: badgeFilterRdo.offset,
    // };
    //
    // return axiosApi.get<number>(this.baseUrl + '/totalCount', {params})
    //   .then(response => response.data.valueOf());

    // for Test by JSM : 테스트 후 지울 것
    return 14;
  }
  getChallengingBadgeCount(badgeFilterRdo: BadgeFilterRdoModel): number {
    //
    // const params = {
    //   patronKey: badgeFilterRdo.patronKey,
    //   difficultyLevel: badgeFilterRdo.difficultyLevel,
    //   limit: badgeFilterRdo.limit,
    //   offset: badgeFilterRdo.offset,
    // };
    //
    // return axiosApi.get<number>(this.baseUrl + '/challengingCount', {params})
    //   .then(response => response.data.valueOf());

    // for Test by JSM : 테스트 후 지울 것
    return 16;
  }
  getEarnedBadgeCount(badgeFilterRdo: BadgeFilterRdoModel): number {
    //
    // const params = {
    //   patronKey: badgeFilterRdo.patronKey,
    //   difficultyLevel: badgeFilterRdo.difficultyLevel,
    //   limit: badgeFilterRdo.limit,
    //   offset: badgeFilterRdo.offset,
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
