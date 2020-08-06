import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import { CubeIntroModel } from '../../../personalcube/cubeintro/model';
import BadgeFilterRdoModel from '../../ui/model/BadgeFilterRdoModel';
import BadgeModel from '../../ui/model/BadgeModel';
import CategoryModel from '../../ui/model/CategoryModel';
import BadgeDetailModel from '../../ui/model/BadgeDetailModel';
import BadgeCompModel from '../../ui/model/BadgeCompModel';
import MyBadgeModel from '../../ui/model/MyBadgeModel';
import BadgeCountModel from '../../ui/model/BadgeCountModel';
import BadgeStudentModel from '../../ui/model/BadgeStudentModel';

/***** 뱃지 관리 api 모음 클래스 *****/
class BadgeApi {
  //
  static instance: BadgeApi;

  // .env 파일 설정에 따른 로컬 또는 서버 호출 path 정의
  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_BADGE_API === undefined || process.env.REACT_APP_BADGE_API === '' ?
    '/api/badge' : process.env.REACT_APP_BADGE_API;

  badgeUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_BADGE_API === undefined || process.env.REACT_APP_BADGE_API === '' ?
    '/api/arrange' : process.env.REACT_APP_BANNER_API;

  // 뱃지 관련 카테고리 정보 가져오기
  findAllCategories() {
    //
    return axiosApi.get<CategoryModel[]>(this.baseUrl + '/categories')
      .then((response) => response && response.data || [])
      .catch((error) => []);

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

    return axiosApi.get<OffsetElementList<BadgeModel>>(this.badgeUrl + '/badges/flow/user', { params })
      .then((response) => response && response.data || null)
      .catch((error) => null);

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

    return axiosApi.get<OffsetElementList<MyBadgeModel>>(this.baseUrl + '/mybadges/flow/students',{ params })
      .then((response) => response && response.data || null)
      .catch((error) => null);
  }

  findPagingEarnedBadges(badgeFilterRdo: BadgeFilterRdoModel) {
    //
    const params = {
      patronKeyString: badgeFilterRdo.patronKey,
      difficultyLevel: badgeFilterRdo.difficultyLevel,
      issueState: badgeFilterRdo.issueState,
      // limit: badgeFilterRdo.limit,
      // offset: badgeFilterRdo.offset,
    };

    return axiosApi.get<OffsetElementList<MyBadgeModel>>(this.baseUrl + '/mybadges/flow/students',{ params })
      .then((response) => response && response.data || null)
      .catch((error) => null);

    // for Test by JSM : 테스트 후 지울 것
    // return <OffsetElementList<MyBadgeModel>>(myBadgeData);
  }

  getCountOfBadges() {
    const params = {
      patronKeyString: BadgeFilterRdoModel.getPatonKey(),
    };

    return axiosApi.get<BadgeCountModel>(this.baseUrl + '/mybadges/flow/tab-count', { params })
      .then((response) => response && response.data || null)
      .catch((error) => null);
  }

  getCountOfIssuedBadges() {
    //
    // const params = {
    //   patronKeyString: patronInfo.getDenizenId()!,
    //   issueState: 'issued',
    // };
    //
    // return axiosApi.get<number>(this.baseUrl + '/mybadges/students/count', {params})
    //   .then(response => response.data.valueOf());

    return 16;
  }

  // PSJ 연관뱃지
  findLikedBadges(badgeId: string) {
    return axiosApi.get<MyBadgeModel[]>(this.baseUrl + `/badges/${badgeId}/links/User`)
      .then((response) => response && response.data || [])
      .catch((error) => []);

    // // for Test : 테스트 후 지울 것
    // return <OffsetElementList<MyBadgeModel>>(linkedBadgeData);
  }

  findBadgeDetailInformation(badgeId: string) {
    return axiosApi.get<BadgeDetailModel>(this.baseUrl + `/badges/${badgeId}/detail`)
      .then((response) => response && response.data || null)
      .catch((error) => null);

    // // for Test : 테스트 후 지울 것
    //return <BadgeDetailModel>badgeDetailData;
  }

  findBadgeComposition(badgeId: string) {
    //
    return axiosApi.get<BadgeCompModel[]>(this.baseUrl + `/badges/flow/${badgeId}/lectures`)
      .then((response) => response && response.data || [])
      .catch((error) => []);
  }

  // 뱃지 수강 정보 조회
  findBadgeStudentInfo(badgeId: string) {
    //
    const params = {
      patronKeyString: BadgeFilterRdoModel.getPatonKey(),
      badgeId,
    };

    // return axiosApi.get<BadgeStudentModel[]>(this.baseUrl + `/students/${id}`)
    //   .then(response => response && response.data);

    return axiosApi.get<OffsetElementList<BadgeStudentModel>>(this.baseUrl + '/students', {params})
      .then(response => response && response.data || null)
      .catch((error) => null);

  }

  // 도전하기
  challengeBadge(id: string | null, studentInfo: { name: string, company: string, department: string, email: string, }, badgeId: string, challengeState: string) {
    //
    const params = {
      id,
      studentInfo,
      badgeId,
      challengeState,
    };

    return axiosApi.post(this.baseUrl + '/students', params)
      .then((response) => response && response.data || null)
      .catch((error) => null);
  }

  // 도전취소
  cancelChallengeBadge(badgeStudentId: string, challengeState: string) {
    //
    const params = {
      challengeState,
    };

    return axiosApi.patch(this.baseUrl + `/students/${badgeStudentId}/challenge-state`, params)
      .then((response) => response && response.data || null)
      .catch((error) => null);
  }

  // 수동 뱃지발급 요청
  requestManualIssued(badgeStudentId: string, issueState: string) {
    //
    const params = {
      issueState
    };

    return axiosApi.patch(this.baseUrl + `/students/flow/${badgeStudentId}/issue-request`, params)
      .then((response) => response && response.data || null)
      .catch((error) => null);
  }

  // 자동 뱃지발급 요청
  requestAutoIssued(List: any[]) {
    //
    const params = {
      List
    };

    return axiosApi.post(this.baseUrl + '/students/issue-state', params)
      .then((response) => response && response.data || null)
      .catch((error) => null);
  }

  // 획득뱃지 카운트
  earnedBadgeCount(issueState: string) {
    //
    const params = {
      patronKeyString: BadgeFilterRdoModel.getPatonKey(),
      issueState,
    };

    return axiosApi.get<number>(this.baseUrl + '/mybadges/students/count', {params})
      .then((response) => response && response.data || -1)
      .catch((error) => -1);
  }

  /********************************************************************************************************************/
  // 뱃지 상세 정보를 위한 api

  findCubeIntro(cubeIntroId: string) {
    //
    return axiosApi.get<CubeIntroModel>(this.baseUrl + `/${cubeIntroId}`)
      .then((response) => response && response.data || null)
      .catch((error) => null);
  }
}

BadgeApi.instance = new BadgeApi();

export default BadgeApi;
