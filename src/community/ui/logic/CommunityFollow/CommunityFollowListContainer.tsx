import React, { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import classNames from 'classnames';
import { useFollowCommunityIntro } from '../../../store/CommunityMainStore';
import FollowListItem from '../../../viewModel/CommunityFollowIntro/FollowCommunityItem';
import { requestFollowCommunityList } from '../../../service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';

//default imgage
import DefaultImg from '../../../../style/media/img-profile-80-px.png';

const FollowListItemView: React.FC<FollowListItem> = function FollowListItemView({
  nickname,
  profileImg,
  followerCount,
  followingCount,
}) {
  return (
    <>
      {/* Right */}
      {/* 프로필 카드 */}
      <div className="community-main-left-contents">
        <div className="thumbnail">
          <img src={profileImg === null ? `${DefaultImg}` : `/files/community/${profileImg}`} />
        </div>
        <div className="community-main-left-list">
          <div className="community-main-left-h3">{nickname}</div>
          <div className="community-main-left-span">
            Followers
            <span>{followerCount}</span>
            Following<span>{followingCount}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const CommunityFollowListContainer: React.FC = () => {
  const communityFollowList = useFollowCommunityIntro();
  const [text, setText] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  // 페이지네이션 
  const addList = () => {
    if (communityFollowList && communityFollowList.communitiesTotalCount < limit) {
      console.log('list return');
      return;
    }
    setLimit(limit + 5);
    requestFollowCommunityList(0, limit, text);
  }

  return (
    <>
      <div className="community-left community-main-left">
        <div className="sub-info-box">
          <div className="main-left-search">
            {/* searchBox */}
            <div className={classNames('ui h38 search input')}>
              <input
                type="text"
                placeholder="닉네임을 입력하세요."
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <div onClick={() => { requestFollowCommunityList(0, 10, text) }}>

                <Icon className="search link" />
              </div>
            </div>
          </div>
          {communityFollowList !== undefined && (
            <>
              {communityFollowList.communities.map(communityItem => (
                <FollowListItemView
                  key={communityItem.email}
                  {...communityItem}
                />
              ))}
            </>
          )}

          <div className="more-comments community-side">
            <div onClick={addList}>
              <Button icon className="ui icon button left moreview">
                <Icon className="moreview" /> list more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityFollowListContainer;
