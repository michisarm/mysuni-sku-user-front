import React, { useState, useCallback } from 'react';
import { Area } from '../../../tracker/model/ActionType';

import { Label, Modal, Button } from 'semantic-ui-react';
import { useMain } from './main.services';
import { requestUnfollow, requestFollow } from './main.request.services';
import { CommunityProfileModal } from '../userProfileInfo/CommunityProfileModal';
import { checkExternalInstructor } from '../app.services';
import { showAlert } from '../../packages/alert/Alert';

type ModalType = 'follower' | 'following';

interface Props {
  openProfileModal: (
    id: string,
    profileNickname: string,
    profileNname: string
  ) => void;
}

function FollowersModal(props: Props) {
  const main = useMain();
  if (main === undefined) {
    return null;
  }
  const { followers } = main;

  if (followers.length === 0) {
    return (
      <p>
        팔로워가 없습니다.
        <br />
        관심있는 커뮤니티를 찾아 활발한 활동을 해보세요!
      </p>
    );
  }

  return (
    <>
      {followers.map(
        ({ id, profileImage, profileName, profileNickName, follow }) => {
          const toggleFollow = () => {
            if (follow === true) {
              requestUnfollow(id);
            } else {
              requestFollow(id);
            }
          };
          return (
            <li key={id} style={{ cursor: 'pointer' }}>
              <p
                className="pic"
                onClick={() =>
                  props.openProfileModal(id, profileNickName, profileName)
                }
              >
                <img src={profileImage} alt="" />
              </p>
              <p
                className="nickname"
                onClick={() =>
                  props.openProfileModal(id, profileNickName, profileName)
                }
              >
                {profileNickName || profileName || ''}
              </p>
              <label className={`chk_follow ${follow && 'checked'}`}>
                <input type="checkbox" name="" />
                <span onClick={toggleFollow}>
                  {follow ? 'Unfollow' : 'Follow'}
                </span>
              </label>
            </li>
          );
        }
      )}
    </>
  );
}

function FollowingsModal(props: Props) {
  const main = useMain();
  if (main === undefined) {
    return null;
  }
  const { followings } = main;

  if (followings.length === 0) {
    return (
      <p>
        팔로우가 없습니다.
        <br />
        커뮤니티에서 만난 학습자들을 팔로우 해보세요!
      </p>
    );
  }

  return (
    <>
      {followings.map(
        ({ id, profileImage, profileName, profileNickName, follow }) => {
          const toggleFollow = () => {
            if (follow === true) {
              requestUnfollow(id);
            } else {
              requestFollow(id);
            }
          };

          return (
            <li key={id} style={{ cursor: 'pointer' }}>
              <p
                className="pic"
                onClick={() =>
                  props.openProfileModal(id, profileNickName, profileName)
                }
              >
                <img src={profileImage} alt="" />
              </p>
              <p
                className="nickname"
                onClick={() =>
                  props.openProfileModal(id, profileNickName, profileName)
                }
              >
                {profileNickName || profileName || ''}
              </p>
              <label className={`chk_follow ${follow && 'checked'}`}>
                <input type="checkbox" name="" />
                <span onClick={toggleFollow}>
                  {follow ? 'Unfollow' : 'Follow'}
                </span>
              </label>
            </li>
          );
        }
      )}
    </>
  );
}

export function MainHeaderView() {
  const main = useMain();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();
  const openFollowerModal = useCallback(() => {
    setModalType('follower');
    setModalOpen(true);
  }, []);
  const openFollowingModal = useCallback(() => {
    setModalType('following');
    setModalOpen(true);
  }, []);

  // 프로필 팝업
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string>('');

  const openProfileModal = useCallback(
    (profileId: string, profileNickname: string, profileNname: string) => {
      if (profileNickname === null && profileNname === null) {
        showAlert({
          title: '알림',
          message: '현재 존재하지 않는 멤버입니다.',
        });
      } else {
        setProfileModalOpen(true);
        setProfileId(profileId);
      }
    },
    []
  );
  if (main === undefined) {
    return null;
  }
  const {
    profileImage,
    profileName,
    profileNickName,
    followerCount,
    followingCount,
    displayNicknameFirst,
  } = main;

  return (
    <>
      <div className="main-info-area" data-area={Area.COMMUNITY_INFO}>
        <div className="progress-info-wrap mypage personal-detail">
          <div className="cell">
            <div className="cell-inner personal-inner">
              <div
                className="profile"
                onClick={() => {
                  window.open(
                    `${window.location.origin}/suni-main/my-training/my-page/MyProfile`,
                    '_blank'
                  );
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="pic">
                  <img src={profileImage} />
                </div>
              </div>
              <div className="text-info">
                <div className="name">
                  <div
                    onClick={() => {
                      window.open(
                        `${window.location.origin}/suni-main/my-training/my-page/MyProfile`,
                        '_blank'
                      );
                    }}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                  >
                    {displayNicknameFirst
                      ? profileNickName || profileName || ''
                      : profileName || profileNickName || ''}
                  </div>
                </div>
                <div className="part">
                  <p>mySUNI 커뮤니티에 가입하고 다양한 활동을 즐겨보세요!</p>
                </div>
              </div>
            </div>
          </div>
          {!checkExternalInstructor() && (
            <>
              <div className="cell followers">
                <div className="cell-inner">
                  <div className="stamp-wrap">
                    <Label className="stamp">
                      <div
                        style={followerCount ? { cursor: 'pointer' } : {}}
                        onClick={openFollowerModal}
                      >
                        <span className="text1">Followers</span>
                        <div className="border_line">
                          <span className="text3">{followerCount}</span>
                          <span className="text5">명</span>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
              <div className="cell following">
                <div className="cell-inner">
                  <div className="stamp-wrap">
                    <Label className="stamp">
                      <div
                        style={followingCount ? { cursor: 'pointer' } : {}}
                        onClick={openFollowingModal}
                      >
                        <span className="text1">Following</span>
                        <div className="border_line">
                          <span className="text2">{followingCount}</span>
                          <span className="text6">명</span>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* <div className="ui statistic community-num">
              <Label className="onlytext">
                <span>Followers</span>
              </Label>
              <div
                style={followerCount > 0 ? { cursor: 'pointer' } : {}}
                className="value2"
                onClick={openFollowerModal}
              >
                {followerCount}
              </div>
            </div>
            <div className="ui statistic community-num">
              <Label className="onlytext">
                <span>Following</span>
              </Label>
              <div
                style={followingCount > 0 ? { cursor: 'pointer' } : {}}
                className="value2"
                onClick={openFollowingModal}
              >
                {followingCount}
              </div>
            </div> */}
        </div>
      </div>

      <Modal open={modalOpen} className="w500 base">
        <Modal.Header>
          {modalType === 'follower' ? 'Followers' : 'Followings'}
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-60vh">
            <div className="content-wrap-follow">
              <ul className="follow_list">
                {modalType === 'follower' ? (
                  <FollowersModal openProfileModal={openProfileModal} />
                ) : (
                  <FollowingsModal openProfileModal={openProfileModal} />
                )}
              </ul>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={() => setModalOpen(false)}>
            닫기
          </Button>
        </Modal.Actions>
      </Modal>

      <CommunityProfileModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        memberId={profileId}
      />
    </>
  );
}
