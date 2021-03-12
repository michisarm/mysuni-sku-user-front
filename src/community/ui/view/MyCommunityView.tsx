import React, { useRef, useEffect } from 'react';
import Sticky from 'semantic-ui-react/dist/commonjs/modules/Sticky';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import { Link, useHistory } from 'react-router-dom';
import MyCommunityListContainer from '../logic/MyCommunityIntro/MyCommunityListContainer';
import MyCommunityPostListContainer from '../logic/MyCommunityIntro/MyCommunityPostListContainer';
import { useMyCommunityIntro } from '../../store/CommunityMainStore';

import ReactGA from 'react-ga';

interface MyCommunityViewProps {}

const MyCommunityView: React.FC<MyCommunityViewProps> = function MyCommunityView() {
  const contextRef = useRef(null);
  const myCommunityIntro = useMyCommunityIntro();
  const history = useHistory();
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
    if (name === 'MyCommunity') history.replace('/community/main');
    if (name === 'CommunityList') history.replace('/community/main/open-communities');
    if (name === 'Follow') history.replace('/community/main/follow');
  };

  useEffect(() => {
    // react-ga (초기 진입 시)
    ReactGA.event({
      category: 'Community',
      action: 'Click',
      label: `Community-MyCommunity`,
    });
  }, []);

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="MyCommunity"
              active={true}
              as={Link}
              // to="/community/main"
              onClick={() => gaOnClick('MyCommunity')}
            >
              My Community
              <span className="count" />
            </Menu.Item>
            <Menu.Item
              name="MyCreatedCommunity"
              active={false}
              as={Link}
              // to="/community/main/open-communities"
              onClick={() => gaOnClick('CommunityList')}
            >
              Community List
            </Menu.Item>
            <Menu.Item
              name="MyFeed"
              active={false}
              as={Link}
              // to="/community/main/follow"
              onClick={() => gaOnClick('Follow')}
            >
              Follow
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>

      {/* 컨텐츠 영역 */}
      <Segment className="full">
        {myCommunityIntro !== undefined &&
          myCommunityIntro.communities.length > 0 && (
            <div className="course-detail-center community-containter">
              <MyCommunityListContainer />
              <MyCommunityPostListContainer />
            </div>
          )}
        {myCommunityIntro !== undefined &&
          myCommunityIntro.communities.length === 0 &&
          myCommunityIntro.requested === true && (
            <div className="no-cont-wrap">
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
                to="/community/main/open-communities"
                className="ui icon button right btn-blue2"
              >
                Community List 바로가기
                <i aria-hidden="true" className="icon morelink" />
              </Link>
            </div>
          )}
      </Segment>
    </div>
  );
};

export default MyCommunityView;
