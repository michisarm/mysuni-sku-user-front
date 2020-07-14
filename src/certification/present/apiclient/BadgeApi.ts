
import { OffsetElementList } from 'shared/model';
import BadgeFilterRdoModel from '../../../badge/model/BadgeFilterRdoModel';
import BadgeModel from "../../../badge/model/BadgeModel";
import {badgeData} from "./badgeData";


class BadgeApi {
  //
  static instance: BadgeApi;

  serverUrl = '/api/badge';
  baseUrl = process.env.REACT_APP_BADGE_LECTURE_API  === undefined || process.env.REACT_APP_BADGE_LECTURE_API  === '' ?
    this.serverUrl : process.env.REACT_APP_BADGE_LECTURE_API ;

  findBadges(inMyLectureRdo: BadgeFilterRdoModel) {
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
}

BadgeApi.instance = new BadgeApi();

export default BadgeApi;
