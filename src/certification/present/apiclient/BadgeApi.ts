
import {axiosApi} from '@nara.platform/accent';
import {patronInfo} from '@nara.platform/dock';
import {OffsetElementList} from 'shared/model';
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

    return axiosApi.get<OffsetElementList<MyBadgeModel>>(this.baseUrl + '/mybadges/flow/students', {params})
      .then(response => response && response.data);
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

    return axiosApi.get<OffsetElementList<MyBadgeModel>>(this.baseUrl + '/mybadges/flow/students', {params})
      .then(response => response && response.data);

    // for Test by JSM : 테스트 후 지울 것
    // return <OffsetElementList<MyBadgeModel>>(myBadgeData);
  }

  getCountOfBadges() {
    const params = {
      patronKeyString: BadgeFilterRdoModel.getPatonKey(),
    };

    return axiosApi.get<BadgeCountModel>(this.baseUrl + '/mybadges/flow/tab-count', {params})
      .then(response => response && response.data);
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

    return axiosApi.get<MyBadgeModel[]>(this.baseUrl + `/badges/${badgeId}/links/User`)
      .then(response => response && response.data);

    // // for Test : 테스트 후 지울 것
    // return <OffsetElementList<MyBadgeModel>>(linkedBadgeData);
  }

  findBadgeDetailInformation(badgeId: string) {

    return axiosApi.get<BadgeDetailModel>(this.baseUrl + `/badges/${badgeId}/view`)
      .then(response => response && response.data);

    // // for Test : 테스트 후 지울 것
    //return <BadgeDetailModel>badgeDetailData;
  }

  findBadgeComposition(badgeId: string) {
    //
    const params = {
      badgeId,
      // patronKeyString: BadgeFilterRdoModel.getPatonKey(),
    };

    return axiosApi.get<BadgeCompModel[]>(this.baseUrl + '/courseset/flow/lectures', {params})
      .then(response => response && response.data);

    // for Test : 테스트 후 지울 것
    // return <OffsetElementList<BadgeCompModel>>badgeCompData;
  }


  // 뱃지 수강 정보 조회
  findBadgeStudentInfo(id: string) {
    //
    return axiosApi.get<BadgeStudentModel>(this.baseUrl + `/students/${id}`)
      .then(response => response && response.data);

  }

  // 도전하기
  challengeBadge(studentInfo: { name: string, company: string, department: string, email: string }, badgeId: string, challengeState: string) {
    //
    const params = {
      studentInfo,
      badgeId,
      challengeState
    };

    return axiosApi.post<string>(this.baseUrl + '/students',{params})
      .then(response => response && response.data);
  }
}

BadgeApi.instance = new BadgeApi();

export default BadgeApi;
