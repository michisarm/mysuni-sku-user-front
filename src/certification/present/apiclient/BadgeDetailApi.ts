
import {axiosApi} from '@nara.platform/accent';
import {patronInfo} from '@nara.platform/dock';
import {OffsetElementList} from 'shared/model';
import {CubeIntroModel} from '../../../personalcube/cubeintro/model';
import BadgeFilterRdoModel from '../../ui/model/BadgeFilterRdoModel';
import BadgeModel from '../../ui/model/BadgeModel';
import CategoryModel from '../../ui/model/CategoryModel';
import BadgeDetailModel from '../../ui/model/BadgeDetailModel';
import BadgeCompModel from '../../ui/model/BadgeCompModel';
import MyBadgeModel from '../../ui/model/MyBadgeModel';
import BadgeCountModel from '../../ui/model/BadgeCountModel';
import BadgeStudentModel from '../../ui/model/BadgeStudentModel';


/***** 뱃지 상세 정 api 모음 클래스 *****/
class BadgeDetailApi {
  //
  static instance: BadgeDetailApi;

  // .env 파일 설정에 따른 로컬 또는 서버 호출 path 정의
  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_BADGE_API === undefined || process.env.REACT_APP_BADGE_API === '' ?
    '/api/badge' : process.env.REACT_APP_BADGE_API;

  findBadgeComposition(badgeId: string) {
    //
    const params = {
      badgeId,
    };

    return axiosApi.get<BadgeCompModel[]>(this.baseUrl + '/courseset/flow/lectures', {params})
      .then(response => response && response.data);
  }

}

BadgeDetailApi.instance = new BadgeDetailApi();

export default BadgeDetailApi;
