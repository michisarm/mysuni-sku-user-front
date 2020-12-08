import React, { useRef } from 'react';
import Sticky from 'semantic-ui-react/dist/commonjs/modules/Sticky';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import { Link } from 'react-router-dom';
import OpenCommunityIntroFieldListContainer from '../logic/OpenCommunityIntro/OpenCommunityIntroFieldListContainer';
import OpenCommunityIntroCommunityListContainer from '../logic/OpenCommunityIntro/OpenCommunityIntroCommunityListContainer';
import { useOpenCommunityIntro } from 'community/store/CommunityMainStore';

interface OpenCommunityViewProps {}

const OpenCommunityView: React.FC<OpenCommunityViewProps> = function OpenCommunityView() {
  const contextRef = useRef(null);
  const openCommunityIntro = useOpenCommunityIntro();

  return (
    <>

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
                active={true}
                as={Link}
                to="/community/main/open-communities"
              >
                Open Community
              </Menu.Item>
              <Menu.Item
                name="MyFeed"
                active={false}
                as={Link}
                to="/community/main/follow"
              >
                Follow
              </Menu.Item>
            </Menu>
          </div>
        </Sticky>
        {
          // 컨텐츠 영역 
          openCommunityIntro && openCommunityIntro !== undefined &&
          openCommunityIntro && openCommunityIntro.communities.length !== 0 &&
          openCommunityIntro && openCommunityIntro.communitiesTotalCount !== 0 ? (
            
            // 컨텐츠가 있을 경우
            <Segment className="full">
              <OpenCommunityIntroFieldListContainer />
              <OpenCommunityIntroCommunityListContainer />
            </Segment>

          ) : (
            // 컨텐츠가 없을 경우
            <div className="course-detail-center community-containter">
              <Segment className="full">
                <div className="no-cont-wrap">
                  <i aria-hidden="true" className="icon no-contents80" />
                  <span className="blind">콘텐츠 없음</span>
                  <div className="text lms-color-type1">
                    현재 오픈 커뮤니티가 없습니다.
                  </div>
                  <div className="sub-text">
                    다양한 분야로 만들어진 Open Community에서
                    <br />
                    관심 있는 커뮤니티를 찾아 Social Learning을 할 수 있습니다.
                  </div>
                  <Link
                    to="/community/main"
                    className="ui icon button right btn-blue2"
                  >
                    My Community 바로가기
                    <i aria-hidden="true" className="icon morelink" />
                  </Link>
                </div>
              </Segment>
            </div> 
          )
        }
      </div>
    </>
  );
};

export default OpenCommunityView;
