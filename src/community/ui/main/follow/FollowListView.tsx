import { useMainFollow } from './follow.services';
import { MainFollowItem } from './follow.model';
import React, { useState, useCallback } from 'react';
import { Area } from '../../../../tracker/model/ActionType';
import { FollowSearchView } from './FollowSearchView';
import { CommunityProfileModal } from '../../userProfileInfo/CommunityProfileModal';
import { showAlert } from '../../../packages/alert/Alert';

interface ItemViewModel {
  item: MainFollowItem;
  onClickMember: (profileId: string, profileNickname: string) => void;
}

export function ItemView(props: ItemViewModel) {
  const { item, onClickMember } = props;
  const { id, profileNickName, profileImage, followerCount, followingCount } =
    item;

  return (
    <div
      className="community-main-left-contents"
      style={{ cursor: 'pointer' }}
      onClick={() => onClickMember(id, profileNickName)}
    >
      <div className="thumbnail">
        <img src={profileImage} />
      </div>
      <div className="community-main-left-list">
        <div className="community-main-left-h3">{profileNickName}</div>
        <div className="community-main-left-span">
          Followers
          <span>{followerCount}</span>
          Following<span>{followingCount}</span>
        </div>
      </div>
    </div>
  );
}

export function FollowListView() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string>('');

  //팔로우 모델의 nickName은 뷰모델 초기화 시, name과 || 연산적용, 즉 view에서 사용하는 nickcname은 nickname = name || nickname
  const onClickMember = useCallback(
    (profileId: string, profileNickname: string) => {
      if (profileNickname === null) {
        showAlert({
          title: '알림',
          message: '현재 존재하지 않는 멤버입니다.',
        });
      } else {
        setModalOpen(true);
        setProfileId(profileId);
      }
    },
    []
  );

  const mainFollow = useMainFollow();
  if (mainFollow === undefined) {
    return null;
  }
  if (mainFollow.items.length === 0) {
    return null;
  }
  const { filteredItems } = mainFollow;
  return (
    <>
      <div
        className="community-left community-main-left"
        data-area={Area.COMMUNITY_FOLLOWING}
      >
        <div className="sub-info-box">
          <FollowSearchView />
          <div className="commu-home-scroll">
            {filteredItems.map((item) => (
              <ItemView
                key={item.id}
                item={item}
                onClickMember={onClickMember}
              />
            ))}
          </div>
        </div>
      </div>
      <CommunityProfileModal
        open={modalOpen}
        setOpen={setModalOpen}
        memberId={profileId}
      />
    </>
  );
}
