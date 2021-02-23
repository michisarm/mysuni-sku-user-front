import React, { useEffect } from 'react';
import { Button, Icon, Radio, Segment } from 'semantic-ui-react';
import {
  getOpenCommunityIntro,
  setOpenCommunityIntro,
  useOpenCommunityIntro,
} from '../../../store/CommunityMainStore';
import OpenCommunityItem from '../../../viewModel/OpenCommunityIntro/OpenCommunityItem';
import managerIcon from '../../../../style/media/icon-community-manager.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  requestAppendOpenCommunityList,
  requestOpenCommunityList,
} from '../../../service/useOpenCommunityIntro/utility/requestOpenCommunityIntro';
import { useScrollMove } from 'myTraining/useScrollMove';

interface FieldItemViewProps { }

const OpenCommunityItemView: React.FC<OpenCommunityItem &
  FieldItemViewProps> = function OpenCommunityItemView({
    communityId,
    fieldName,
    approvedState,
    name,
    description,
    managerName,
    memberCount,
    thumbnailId,
  }) {
    const { pathname } = useLocation();
    const history = useHistory();
    const { scrollOnceMove, scrollSave } = useScrollMove();

    useEffect(() => {
      scrollOnceMove();
    }, [scrollOnceMove])

    useEffect(() => {
      const listen = history.listen(scrollSave);
      return () => listen();
    }, [pathname])

    return (
      <Link to={`/community/${communityId}`} className="community-open-card">
        <div className="open-card-top">
          <span className="label">{fieldName}</span>
          {approvedState === 'Wait' && <span className="wait">가입대기</span>}
        </div>
        <div className="open-card-content">
          <p>{name}</p>
          <div className="thumbnail">
            <img
              src={thumbnailId}
              style={{ height: 72, width: 72, borderRadius: 8 }}
            />
          </div>
          <div className="community-main-left-list">
            <div
              className="community-main-left-h3"
              dangerouslySetInnerHTML={{ __html: description.substring(0, 60) }}
            />
          </div>
        </div>
        <div className="open-card-bottom">
          <div className="title-area">
            <div className="text-list">
              <img src={managerIcon} />
              <span>{managerName}</span>
            </div>
          </div>
          <div className="right-area">
            <span>멤버</span>
            <span>{memberCount}</span>
          </div>
        </div>
      </Link>
    );
  };

function deleteOffset() {
  sessionStorage.removeItem('communityOffset');
}

function sortCreatedTime() {
  const openCommunityIntro = getOpenCommunityIntro();
  if (openCommunityIntro === undefined) {
    return;
  }
  setOpenCommunityIntro({
    ...openCommunityIntro,
    communitiesSort: 'createdTime',
    communitiesOffset: 0,
  });
  deleteOffset();
  requestOpenCommunityList();
}

function sortMemberCount() {
  const openCommunityIntro = getOpenCommunityIntro();
  if (openCommunityIntro === undefined) {
    return;
  }
  setOpenCommunityIntro({
    ...openCommunityIntro,
    communitiesSort: 'memberCount',
    communitiesOffset: 0,
  });
  deleteOffset();
  requestOpenCommunityList();
}

function sortName() {
  const openCommunityIntro = getOpenCommunityIntro();
  if (openCommunityIntro === undefined) {
    return;
  }
  setOpenCommunityIntro({
    ...openCommunityIntro,
    communitiesSort: 'name',
    communitiesOffset: 0,
  });
  deleteOffset();
  requestOpenCommunityList();
}

function sortApproved() {
  const openCommunityIntro = getOpenCommunityIntro();
  if (openCommunityIntro === undefined) {
    return;
  }
  setOpenCommunityIntro({
    ...openCommunityIntro,
    communitiesSort: 'approved',
    communitiesOffset: 0,
  });
  deleteOffset();
  requestOpenCommunityList();
}

function OpenCommunityIntroCommunityListContainer() {
  const openCommunityIntro = useOpenCommunityIntro();

  if (openCommunityIntro === undefined) {
    return null;
  }

  return (
    <>
      <div className="open-tab-radio">
        <Radio
          className="base"
          label="최신순"
          name="sort"
          value="createdTime"
          checked={openCommunityIntro.communitiesSort === 'createdTime'}
          onClick={sortCreatedTime}
        />
        <Radio
          className="base"
          label="멤버순"
          name="sort"
          value="memberCount"
          checked={openCommunityIntro.communitiesSort === 'memberCount'}
          onClick={sortMemberCount}
        />
        <Radio
          className="base"
          label="가나다순"
          name="sort"
          value="name"
          checked={openCommunityIntro.communitiesSort === 'name'}
          onClick={sortName}
        />
        <Radio
          className="base"
          label="가입대기"
          name="sort"
          value="approved"
          checked={openCommunityIntro.communitiesSort === 'approved'}
          onClick={sortApproved}
        />
      </div>
      <div className="course-detail-center community-containter padding-none">
        <div className="community-open-contants">
          {openCommunityIntro &&
            openCommunityIntro.communities.length > 0 &&
            openCommunityIntro.communities.map(communityItem => (
              <OpenCommunityItemView
                key={communityItem.communityId}
                {...communityItem}
              />
            ))}
          {openCommunityIntro && openCommunityIntro.communities.length === 0 && (
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
                  <Link to="/community/main">
                    <Button icon className="right btn-blue2">
                      My Community 바로가기
                      <Icon className="morelink" />
                    </Button>
                  </Link>
                </div>
              </Segment>
            </section>
          )}
        </div>
      </div>
      <div className="more-comments community-side">
        {openCommunityIntro.communitiesTotalCount >
          openCommunityIntro.communitiesOffset && (
            <Button
              icon
              className="left moreview"
              onClick={requestAppendOpenCommunityList}
            >
              <Icon className="moreview" /> list more
            </Button>
          )}
        {openCommunityIntro.communitiesTotalCount <=
          openCommunityIntro.communitiesOffset && (
            <Button
              icon
              className="left moreview"
              style={{ cursor: 'default' }}
            />
          )}
      </div>{' '}
    </>
  );
}

export default OpenCommunityIntroCommunityListContainer;
