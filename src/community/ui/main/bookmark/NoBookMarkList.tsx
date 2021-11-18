import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

import { Area } from '../../../../tracker/model/ActionType';

export function NoBookMarkList() {
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
                북마크한 게시글이 없습니다.
              </div>
            </div>
          </Segment>
        </section>
      </div>
    </div>
  );
}
