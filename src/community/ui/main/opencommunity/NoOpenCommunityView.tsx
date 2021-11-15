import React, { useMemo } from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { MAIN_MYCOMMUNITIES_PATH } from '../../page/MainRoutes';
import { useMainOpenCommunities } from './opencommunity.services';
import { Area } from '../../../../tracker/model/ActionType';
import { find } from 'lodash';

export function NoOpenCommunityView() {
  const openCommunities = useMainOpenCommunities();
  if (openCommunities === undefined) {
    return null;
  }

  const { fieldItems, fieldId, ingRequest, totalCount } = openCommunities;

  if (ingRequest === true || totalCount !== 0) {
    return null;
  }

  if (fieldId === 'bookmark') {
    return (
      <div
        className="course-detail-center community-containter padding-none"
        data-area={Area.COMMUNITY_LIST}
      >
        <div className="community-open-contants">
          <section className="content community">
            <Segment className="full">
              <div className="no-cont-wrap">
                <Icon className="no-contents80" />
                <span className="blind">콘텐츠 없음</span>
                <div className="text lms-color-type1">
                  즐겨찾기한 커뮤니티가 없습니다.
                </div>
                <div className="sub-text">
                  관심 있는 커뮤니티를 즐겨찾기 해보세요!
                </div>
              </div>
            </Segment>
          </section>
        </div>
      </div>
    );
  }

  if (fieldId !== 'bookmark' && fieldId !== 'all') {
    const findField = find(fieldItems, { id: fieldId });

    if (findField?.communityCount === 0) {
      return (
        <div
          className="course-detail-center community-containter padding-none"
          data-area={Area.COMMUNITY_LIST}
        >
          <div className="community-open-contants">
            <section className="content community">
              <Segment className="full">
                <div className="no-cont-wrap">
                  <Icon className="no-contents80" />
                  <span className="blind">콘텐츠 없음</span>
                  <div className="text lms-color-type1">
                    개설된 Community가 없습니다.
                  </div>
                </div>
              </Segment>
            </section>
          </div>
        </div>
      );
    }
  }

  return (
    <div
      className="course-detail-center community-containter padding-none"
      data-area={Area.COMMUNITY_LIST}
    >
      <div className="community-open-contants">
        <section className="content community">
          <Segment className="full">
            <div className="no-cont-wrap">
              <Icon className="no-contents80" />
              <span className="blind">콘텐츠 없음</span>
              <div className="text lms-color-type1">
                모든 Community에 가입되었습니다.
              </div>
              <div className="sub-text">
                My Community 탭에서 커뮤니티 활동을 해보세요~!
              </div>
              <Link to={MAIN_MYCOMMUNITIES_PATH}>
                <Button icon className="right btn-blue2">
                  My Community 바로가기
                  <Icon className="morelink" />
                </Button>
              </Link>
            </div>
          </Segment>
        </section>
      </div>
    </div>
  );
}
