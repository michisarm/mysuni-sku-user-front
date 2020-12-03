import React, { useEffect, useRef, useState } from 'react';
import Sticky from 'semantic-ui-react/dist/commonjs/modules/Sticky';
// import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import { Link } from 'react-router-dom';
import {Segment, Icon, Button} from "semantic-ui-react";

import CommunityFollowListContainer from '../logic/CommunityFollow/CommunityFollowListContainer';
import CommunityFollowPostListContainer from '../logic/CommunityFollow/CommunityFollowPostListContainer';
import {useFollowCommunityIntro} from 'community/store/CommunityMainStore';


const FollowView: React.FC = function FollowView() {
  const contextRef = useRef(null);

  const followCommunityIntro = useFollowCommunityIntro();
  console.log('@@@@@@', followCommunityIntro);

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="MyCommunity"
              active={false}
              as={Link}
              to="/community/main"
            >
              My Community
              <span className="count" />
            </Menu.Item>
            <Menu.Item
              name="MyCreatedCommunity"
              active={false}
              as={Link}
              to="/community/main/open-communities"
            >
              Open Community
            </Menu.Item>
            <Menu.Item
              name="MyFeed"
              active={true}
              as={Link}
              to="/community/main/follow"
            >
              Follow
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>
      <Segment className="full">
        <div className="course-detail-center community-containter">
          {followCommunityIntro?.postsTotalCount !== 0 ?
            <>
              <CommunityFollowPostListContainer />
              <CommunityFollowListContainer />
            </> 
            :
            <>
              <section className="content community">
                <Segment className="full">
                  <div className="no-cont-wrap">
                    <Icon className="no-contents80"/><span className="blind">콘텐츠 없음</span>
                    <div className="text lms-color-type1">팔로우가 없습니다.</div>
                    <div className="sub-text">팔로우들은 어떤 활동을 하고 있을까요?<br />커뮤니티에서 만난 학습자들을 팔로우 해보세요!</div>
                    <Link to="/community/main/open-communities">
                      <Button icon className="right btn-blue2" >
                        Open Community 바로가기<Icon className="morelink"/>
                      </Button>
                    </Link>
                  </div>
                </Segment>
              </section>
            </>
          }
        </div>
      </Segment>    
    </div>
  );
};

export default FollowView;