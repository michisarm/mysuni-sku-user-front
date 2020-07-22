
import {axiosApi} from '@nara.platform/accent';
import {patronInfo} from '@nara.platform/dock';
import {OffsetElementList} from 'shared/model';
import BadgeFilterRdoModel from '../../ui/model/BadgeFilterRdoModel';
import BadgeModel from '../../ui/model/BadgeModel';
import CategoryModel from '../../ui/model/CategoryModel';
// for Test by JSM
import {badgeData, challengingBadgeData, mainBadgeData, myBadgeData, linkedBadgeData} from './badgeData';
import {categoryData} from './categoryData';
import {badgeDetailData} from './badgeDetailData';
import BadgeDetailModel from '../../ui/model/BadgeDetailModel';
import {badgeCompData} from './badgeCompData';
import BadgeCompModel from '../../ui/model/BadgeCompModel';


/***** 뱃지 관리 api 모음 클래스 *****/
class BadgeApi {
  //
  static instance: BadgeApi;

  // .env 파일 설정에 따른 로컬 또는 서버 호출 path 정의
  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_BADGE_API === undefined || process.env.REACT_APP_BADGE_API === '' ?
    '/api/badge' : process.env.REACT_APP_BADGE_API;

  // 뱃지 관련 카테고리 정보 가져오기
  findAllCategories() {
    //
    return axiosApi.get<CategoryModel[]>(this.baseUrl + '/categories')
      .then(response => response && response.data);

    // for Test by JSM : 테스트 후 지울 것
    // return <OffsetElementList<CategoryModel>>(categoryData);
  }

  // 뱃지 정보 가져오기 (파라미터 : 카테고리, 난이도, 시작 위치, 갯수)
  findPagingAllBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    const params = {
      categoryId: badgeFilterRdo.categoryId,
      difficultyLevel: badgeFilterRdo.difficultyLevel,
      limit: badgeFilterRdo.limit,
      offset: badgeFilterRdo.offset,
    };

    return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + '/lectures/flow', {params})
      .then(response => response && response.data);

    // for Test by JSM : 테스트 후 지울 것
    // return <OffsetElementList<BadgeModel>>(badgeData);
  }

  findPagingChallengingBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    const params = {
      patronKeyString: badgeFilterRdo.patronKey,
      difficultyLevel: badgeFilterRdo.difficultyLevel,
      limit: badgeFilterRdo.limit,
      offset: badgeFilterRdo.offset,
    };

    // return axiosApi.get<OffsetElementList<BadgeModel>>(this.baseUrl + '/mybadges/flow/students', {params})
    //   .then(response => response && response.data);

    // for Test by JSM : 테스트 후 지울 것
    if (badgeFilterRdo.limit === 4) {
      return <OffsetElementList<BadgeModel>>(mainBadgeData);
    }
    else {
      return <OffsetElementList<BadgeModel>>(challengingBadgeData);
    }
  }

  findPagingEarnedBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    const params = {
      patronKeyString: badgeFilterRdo.patronKey,
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
      challengedCount: 12,
      issuedCount: 16,
    };
  }

  getCountOfIssuedBadges() {
    //
    // const params = {
    //   patronKeyString: patronInfo.getPatronId()!,
    //   issueState: 'issued',
    // };
    //
    // return axiosApi.get<number>(this.baseUrl + '/mybadges/students/count', {params})
    //   .then(response => response.data.valueOf());

    return 16;
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

  findBadgeComposition(badgeId: string) {
    //
    const params = {
      badgeId,
    };

    // return axiosApi.get<OffsetElementList<BadgeCompModel>>(this.baseUrl + `/courseset/lectures`, {params})
    //   .then(response => response && response.data);

    // for Test : 테스트 후 지울 것
    return <OffsetElementList<BadgeCompModel>>badgeCompData;
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
    //   patronKeyString: badgeFilterRdo.patronKey,
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
    //   patronKeyString: badgeFilterRdo.patronKey,
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
