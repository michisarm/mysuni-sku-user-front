import React from 'react';
import { Button, Icon, Radio } from 'semantic-ui-react';
import {
  getOpenCommunityIntro,
  setOpenCommunityIntro,
  useOpenCommunityIntro,
} from '../../../store/CommunityMainStore';
import OpenCommunityItem from '../../../viewModel/OpenCommunityIntro/OpenCommunityItem';
import managerIcon from '../../../../style/media/icon-community-manager.png';
import { Link } from 'react-router-dom';
import {
  requestAppendOpenCommunityList,
  requestOpenCommunityList,
} from '../../../service/useOpenCommunityIntro/utility/requestOpenCommunityIntro';

interface FieldItemViewProps {}

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
            dangerouslySetInnerHTML={{ __html: description }}
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
  requestOpenCommunityList();
}

function sortLastPostTime() {
  const openCommunityIntro = getOpenCommunityIntro();
  if (openCommunityIntro === undefined) {
    return;
  }
  setOpenCommunityIntro({
    ...openCommunityIntro,
    communitiesSort: 'lastPostTime',
    communitiesOffset: 0,
  });
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
          value="lastPostTime"
          checked={openCommunityIntro.communitiesSort === 'lastPostTime'}
          onClick={sortLastPostTime}
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
            openCommunityIntro.communities.map(communityItem => (
              <OpenCommunityItemView
                key={communityItem.communityId}
                {...communityItem}
              />
            ))}
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
