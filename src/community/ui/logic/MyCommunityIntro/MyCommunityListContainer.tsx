import React, { useEffect } from 'react';
import { Button, Icon, Select } from 'semantic-ui-react';
import { useMyCommunityIntro } from '../../../store/CommunityMainStore';
import CommunityItem from '../../../viewModel/MyCommunityIntro/CommunityItem';
import managerIcon from '../../../../style/media/icon-community-manager.png';

const SORT_OPTIONS = [
  { key: 'last-join', value: 'last-join', text: '최근가입순' },
  { key: 'last-writing', value: 'last-writing', text: '최신글순' },
  { key: 'Alphabetically', value: 'Alphabetically', text: '가나다순' },
];

const CommunityItemView: React.FC<CommunityItem> = function CommunityItemView({
  name,
  image,
  hasNewPost,
  manager,
  memberCount,
}) {
  return (
    <>
      <div className="community-main-left-contents">
        <div className="thumbnail">
          <img src={image} />
        </div>
        <div className="community-main-left-list">
          <div className="community-main-left-h3">
            {name}
            <span className="count">{`${hasNewPost ? '+N' : ''}`}</span>
          </div>
          <div className="community-main-left-span">
            <span>
              <img src={managerIcon} />
              {manager}
            </span>
            멤버<span>{memberCount}</span>
          </div>
        </div>
      </div>
    </>
  );
};

function MyCommunityListContainer() {
  const myCommunityIntro = useMyCommunityIntro();
  return (
    <div className="community-left community-main-left">
      <div className="sub-info-box">
        <div className="commnuity-left-top">
          <Select
            placeholder="선택해주세요"
            className="dropdown w302 selection"
            options={SORT_OPTIONS}
            value="last-join"
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

        <div className="more-comments community-side">
          <Button icon className="left moreview">
            {/* <Icon className="moreview" /> list more */}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyCommunityListContainer;
