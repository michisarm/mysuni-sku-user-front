import React, { useCallback, useEffect, useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import classNames from 'classnames';
import { useFollowCommunityIntro } from '../../../store/CommunityMainStore';
import FollowListItem from '../../../viewModel/CommunityFollowIntro/FollowCommunityItem';
import {
  requestAppendFollowCommunityList,
  requestFollowCommunityList,
  requestFollowSearchList,
} from '../../../service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';

//default imgage
import DefaultImg from '../../../../style/media/img-profile-80-px.png';
import { useHistory } from 'react-router-dom';
import { Area } from 'tracker/model';
import { findCommunityProfile } from '../../../api/profileApi';
import CommunityProfileModal from '../../view/CommunityProfileModal';

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}

const FollowListItemView: React.FC<FollowListItem> = function FollowListItemView({
  id,
  nickname,
  profileImg,
  followerCount,
  followingCount,
  name,
}) {
  const history = useHistory();
  const [profileInfo, setProfileInfo] = useState<profileParams>();
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const clickProfile = useCallback(async (id) => {
    findCommunityProfile(id).then(result => {
      setProfileInfo({
        id: result!.id,
        profileImg: result!.profileImg,
        introduce: result!.introduce,
        nickName: result!.nickname,
        creatorName: result!.name,
      });
      setProfileOpen(true);
    });
  }, [id]);

  return (
    <>
      {/* Right */}
      {/* 프로필 카드 */}
      <div
        className="community-main-left-contents"
        style={{ cursor: 'pointer' }}
        onClick={() => clickProfile(id)}
      >
        <div className="thumbnail">
          <img
            src={
              profileImg === null || profileImg === ''
                ? `${DefaultImg}`
                : `/files/community/${profileImg}`
            }
          />
        </div>
        <div className="community-main-left-list">
          <div className="community-main-left-h3">
            {nickname === '' ? name : nickname}
          </div>
          <div className="community-main-left-span">
            Followers
            <span>{followerCount}</span>
            Following<span>{followingCount}</span>
          </div>
        </div>
      </div>
      <CommunityProfileModal
        open={profileOpen}
        setOpen={setProfileOpen}
        userProfile={profileInfo && profileInfo.profileImg}
        memberId={profileInfo && profileInfo.id}
        introduce={profileInfo && profileInfo.introduce}
        nickName={profileInfo && profileInfo.nickName}
        name={profileInfo && profileInfo.creatorName}
      />
    </>
  );
};

const CommunityFollowListContainer: React.FC = () => {
  const [text, setText] = useState<string>('');

  const communityFollowList = useFollowCommunityIntro();
  if (communityFollowList === undefined) {
    return null;
  }

  // 페이지네이션
  const addList = (offset: number) => {
    requestAppendFollowCommunityList(offset, 10, text);
  };

  // 검색 엔터 이벤트
  const serchEnterEvent = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      requestFollowSearchList(0, 5, encodeURIComponent(text));
    }
  };

  return (
    <>
      <div
        className="community-left community-main-left"
        data-area={Area.COMMUNITY_FOLLOWING}
      >
        <div className="sub-info-box">
          <div className="main-left-search">
            {/* searchBox */}
            <div className={classNames('ui h38 search input')}>
              <input
                type="text"
                placeholder="닉네임을 입력하세요."
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress={serchEnterEvent}
              />
              <button
                onClick={() => {
                  requestFollowSearchList(0, 5, encodeURIComponent(text));
                }}
              >
                <Icon className="search link" />
              </button>
            </div>
          </div>
          <div className="commu-home-scroll">
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
          </div>
          {/* <div className="more-comments community-side">
            {communityFollowList.communitiesTotalCount >
              communityFollowList.communitiesOffset && (
              <Button
                icon
                className="ui icon button left moreview"
                onClick={() => addList(communityFollowList.communitiesOffset)}
              >
                <Icon className="moreview" /> list more
              </Button>
            )}
            {communityFollowList.communitiesTotalCount <=
              communityFollowList.communitiesOffset && (
              <Button icon className="moreview" style={{ cursor: 'default' }} />
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CommunityFollowListContainer;
