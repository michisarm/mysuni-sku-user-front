import React from 'react';
import { Area } from '../../../../tracker/model/ActionType';
import { Segment, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMainFollow } from './follow.services';

export function NoFollowView() {
  const mainFollow = useMainFollow();
  if (mainFollow === undefined) {
    return null;
  }
  if (mainFollow.items.length !== 0) {
    return null;
  }
  return (
    <section className="content community" data-area={Area.COMMUNITY_NOCONTENT}>
      <Segment>
        <div className="no-cont-wrap">
          <Icon className="no-contents80" />
          <span className="blind">콘텐츠 없음</span>
          <div className="text lms-color-type1">팔로우가 없습니다.</div>
          <div className="sub-text">
            팔로우들은 어떤 활동을 하고 있을까요?
            <br />
            커뮤니티에서 만난 학습자들을 팔로우 해보세요!
          </div>
          <Link to="/community/main/open-communities">
            <Button icon className="right btn-blue2">
              Community List 바로가기
              <Icon className="morelink" />
            </Button>
          </Link>
        </div>
      </Segment>
    </section>
  );
}
