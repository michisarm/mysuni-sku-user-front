import React from 'react';
import { Area } from '../../../../tracker/model/ActionType';
import { Link } from 'react-router-dom';
import { MAIN_OPENCOMMUNITIES_PATH } from '../../page/MainRoutes';
import { useMainMyCommunityTab } from './services/mycommunity.services';

export function NoCommunityView() {
  const mainMyCommunities = useMainMyCommunityTab();
  if (mainMyCommunities === undefined) {
    return null;
  }
  if (mainMyCommunities.hasItems !== true) {
    return null;
  }
  return (
    <div className="no-cont-wrap" data-area={Area.COMMUNITY_NOCONTENT}>
      <i aria-hidden="true" className="icon no-contents80" />
      <span className="blind">콘텐츠 없음</span>
      <div className="text lms-color-type1">
        현재 가입된 커뮤니티가 없습니다.
      </div>
      <div className="sub-text">
        다양한 분야로 만들어진 Community List에서
        <br />
        관심 있는 커뮤니티를 찾아 Social Learning을 할 수 있습니다.
      </div>
      <Link
        to={MAIN_OPENCOMMUNITIES_PATH}
        className="ui icon button right btn-blue2"
      >
        Community List 바로가기
        <i aria-hidden="true" className="icon morelink" />
      </Link>
    </div>
  );
}
