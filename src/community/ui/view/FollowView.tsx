import React, { useEffect, useRef, useState } from 'react';
import Sticky from 'semantic-ui-react/dist/commonjs/modules/Sticky';
// import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import { Link, useHistory } from 'react-router-dom';
import { Segment, Icon, Button } from 'semantic-ui-react';

import CommunityFollowListContainer from '../logic/CommunityFollow/CommunityFollowListContainer';
import CommunityFollowPostListContainer from '../logic/CommunityFollow/CommunityFollowPostListContainer';
import { useFollowCommunityIntro } from 'community/store/CommunityMainStore';
import ReactGA from 'react-ga';
import { Area } from 'tracker/model';
import { isExternalInstructor } from '../../../shared/helper/findUserRole';

const FollowView: React.FC = function FollowView() {
  const contextRef = useRef(null);
  const followCommunityIntro = useFollowCommunityIntro();
  const history = useHistory();
  const isExternal = isExternalInstructor();

  const gaOnClick = (name: string) => {
    // react-ga
    ReactGA.event({
      category: 'Community',
      action: 'Click',
      label: `Community-${name}`,
    });
    window.scrollTo(0, 0);
    sessionStorage.removeItem('communityOffset');
    sessionStorage.removeItem('openCommunityOffset');
    if (name === 'MyCommunity') {
      history.replace('/community/main');
    }
    if (name === 'CommunityList') {
      history.replace('/community/main/open-communities');
    }
    if (name === 'Follow') {
      history.replace('/community/main/follow');
    }
    if (name === 'MyFeed') {
      history.replace('/community/main/feed');
    }
    if (name === 'Bookmark') {
      history.replace('/community/main/bookmark');
    }
  };

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="MyCommunity"
              active={false}
              as={Link}
              onClick={() => gaOnClick('MyCommunity')}
            >
              My Community
              <span className="count" />
            </Menu.Item>
            {!isExternal && (
              <Menu.Item
                name="MyCreatedCommunity"
                active={false}
                as={Link}
                onClick={() => gaOnClick('CommunityList')}
              >
                Community List
              </Menu.Item>
            )}
            <Menu.Item
              name="MyFeed"
              active={false}
              as={Link}
              onClick={() => gaOnClick('MyFeed')}
            >
              My Feed
            </Menu.Item>
            {!isExternal && (
              <Menu.Item
                name="Follow"
                active={true}
                as={Link}
                onClick={() => gaOnClick('Follow')}
              >
                Follower Feed
              </Menu.Item>
            )}
            <Menu.Item
              name="Bookmark"
              active={false}
              as={Link}
              onClick={() => gaOnClick('Bookmark')}
            >
              Bookmark
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>
      <Segment className="full">
        <div className="course-detail-center community-containter">
          {followCommunityIntro?.postsTotalCount !== 0 ? (
            <>
              <CommunityFollowPostListContainer />
              <CommunityFollowListContainer />
            </>
          ) : (
            <>
              <section
                className="content community"
                data-area={Area.COMMUNITY_NOCONTENT}
              >
                <Segment className="full">
                  <div className="no-cont-wrap">
                    <Icon className="no-contents80" />
                    <span className="blind">콘텐츠 없음</span>
                    <div className="text lms-color-type1">
                      팔로우가 없습니다.
                    </div>
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
            </>
          )}
        </div>
      </Segment>
    </div>
  );
};

export default FollowView;
