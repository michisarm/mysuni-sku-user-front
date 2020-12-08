import React from 'react';
import { Button, DropdownProps, Icon, Select } from 'semantic-ui-react';
import {
  getMyCommunityIntro,
  setMyCommunityIntro,
  useMyCommunityIntro,
} from '../../../store/CommunityMainStore';
import CommunityItem from '../../../viewModel/MyCommunityIntro/CommunityItem';
import managerIcon from '../../../../style/media/icon-community-manager.png';
import { Link } from 'react-router-dom';
import {
  requestAppendMyCommunityList,
  requestMyCommunityList,
} from '../../../service/useMyCommunityIntro/utility/requestMyCommunityIntro';

const SORT_OPTIONS = [
  { key: 'memberCreatedTime', value: 'memberCreatedTime', text: '최근가입순' },
  { key: 'lastPostTime', value: 'lastPostTime', text: '최신글순' },
  { key: 'name', value: 'name', text: '가나다순' },
];

const CommunityItemView: React.FC<CommunityItem> = function CommunityItemView({
  communityId,
  name,
  thumbnailId,
  hasNewPost,
  managerName,
  memberCount,
}) {
  return (
    <Link
      className="community-main-left-contents"
      to={`/community/${communityId}`}
    >
      <div className="thumbnail">
        <img src={thumbnailId} />
      </div>
      <div className="community-main-left-list">
        <div className="community-main-left-h3">
          {name}
          <span className="count">{`${hasNewPost ? '+N' : ''}`}</span>
        </div>
        <div className="community-main-left-span">
          <span>
            <img src={managerIcon} />
            {managerName}
          </span>
          멤버<span>{memberCount}</span>
        </div>
      </div>
    </Link>
  );
};

function changeSort(_: any, data: DropdownProps) {
  const myCommunityIntro = getMyCommunityIntro();
  if (myCommunityIntro === undefined) {
    return;
  }
  const communitiesSort = (data.value || 'memberCreatedTime').toString();
  setMyCommunityIntro({
    ...myCommunityIntro,
    communitiesSort
  });
  requestMyCommunityList();
}

function MyCommunityListContainer() {
  const myCommunityIntro = useMyCommunityIntro();
  if (myCommunityIntro === undefined) {
    return null;
  }

  return (
    <div className="community-left community-main-left">
      <div className="sub-info-box">
        <div className="commnuity-left-top">
          <Select
            placeholder="선택해주세요"
            className="dropdown w302 selection"
            options={SORT_OPTIONS}
            value={myCommunityIntro.communitiesSort}
            onChange={changeSort}
          />
        </div>
        {myCommunityIntro !== undefined && (
          <>
            {myCommunityIntro.communities.map(communityItem => (
              <CommunityItemView
                key={communityItem.communityId}
                {...communityItem}
              />
            ))}
          </>
        )}
        {myCommunityIntro.communitiesTotalCount > 
          myCommunityIntro.communitiesOffset && (
          <div className="more-comments community-side">
            <Button
              icon
              className="left moreview"
              onClick={requestAppendMyCommunityList}
            >
              <Icon className="moreview" /> list more
            </Button>
          </div>
        ) }
      </div>
    </div>
  );
}

export default MyCommunityListContainer;
