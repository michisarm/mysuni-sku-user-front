import React, { useEffect, useState, useCallback } from 'react';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import { useMyProfile } from '../../store/MyProfileStore';
import profileIcon from '../../../style/media/img-profile-80-px.png';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';
import {
  requestFollowModalAdd,
  requestFollowModalDelete,
} from 'community/service/useFollowModal/utility/requestFollowModalIntro';
import { useFollowCommunityIntro } from 'community/store/CommunityMainStore';
import {
  useFollowersModal,
  useFollowingsModal,
} from '../../store/CommunityFollowModalStore';
import {
  requestFollowingsModal,
  requestFollowersModal,
} from 'community/service/useFollowModal/utility/requestFollowModalIntro';
import { useHistory } from 'react-router-dom';

//default imgage
import DefaultImg from '../../../style/media/img-profile-80-px.png';
import { render } from 'react-dom';
import { reactConfirm } from '@nara.platform/accent';
import {
  getCommunityProfileItem,
  setCommunityProfileItem,
} from 'community/store/CommunityProfileStore';
import { Area } from 'tracker/model';
import { findCommunityProfile } from '../../api/profileApi';
import CommunityProfileModal from '../view/CommunityProfileModal';

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}

function CommunityMainHeaderContainer() {
  const [open, setOpen] = useState<boolean>(false);
  const [openFollowing, setOpenFollowing] = useState<string>('following');
  const [modalHeader, setModalHeader] = useState<string>('');
  const [profileInfo, setProfileInfo] = useState<profileParams>();
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  useEffect(() => {
    requestFollowersModal();
    requestFollowingsModal();
  }, [open]);

  // const followModalContainerList = useFollowCommunityIntro();
  const profile = useMyProfile();

  const myProfileEdit = useCallback(async () => {
    //
    const profileItem = getCommunityProfileItem();
    if (profileItem === undefined) {
      return;
    }
    const nextProfileItem = { ...profileItem, editing: true };
    await setCommunityProfileItem(nextProfileItem);
    history.push('/community/my-profile');
  }, []);

  useEffect(() => {
    if (profile && profile?.nickname === '') {
      reactConfirm({
        title: 'Community 방문을 환영합니다!',
        message: '나만의 닉네임/프로필 사진을 등록해보세요!',
        onOk: () => myProfileEdit(),
      });
    }
  }, [profile]);
  // profile

  const followersList = useFollowersModal();
  const followingsList = useFollowingsModal();

  const history = useHistory();

  const modalOpen = (value: string) => {
    if (value === 'followers') {
      requestFollowersModal();
      setModalHeader('followers');
      setOpen(!open);
    }
    if (value === 'following') {
      requestFollowingsModal();
      setModalHeader('following');
      setOpen(!open);
    }
  };

  // 팔로잉 모달 리스트 버튼
  const followersBtn = (id: string, idx: number, follow: boolean) => {
    if (follow === true) {
      requestFollowModalDelete(id, 'follower');
    } else {
      requestFollowModalAdd(id, 'follower');
    }
  };

  const followingsBtn = (id: string, idx: number, follow: boolean) => {
    if (follow === true) {
      requestFollowModalDelete(id, 'following');
    } else {
      requestFollowModalAdd(id, 'following');
    }
  };

  const followersModal =
    followersList?.followers.length !== 0 ? (
      followersList?.followers.map((item, idx) => {
        return (
          <li style={{ cursor: 'pointer' }}>
            <p
              className="pic"
              onClick={() => clickProfile(item.id)}
            >
              <img
                src={
                  item.profileImg === null || item.profileImg === ''
                    ? `${DefaultImg}`
                    : `/files/community/${item.profileImg}`
                }
                alt=""
              />
            </p>
            <p
              className="nickname"
              onClick={() => clickProfile(item.id)}
            >
              {item.nickname === '' ? item.name : item.nickname}
            </p>
            <label className="chk_follow">
              <input type="checkbox" name="" />
              <span onClick={() => followersBtn(item.id, idx, item.follow)}>
                {item.follow ? 'unfollow' : 'follow'}
              </span>
            </label>
          </li>
        );
      })
    ) : (
      <p>
        팔로워가 없습니다.
        <br />
        관심있는 커뮤니티를 찾아 활발한 활동을 해보세요!
      </p>
    );

  const followingsModal =
    followingsList?.followings.length !== 0 ? (
      followingsList?.followings.map((item, idx) => {
        return (
          <li style={{ cursor: 'pointer' }}>
            <p
              className="pic"
              onClick={() => clickProfile(item.id)}
            >
              <img
                src={
                  item.profileImg === null || item.profileImg === ''
                    ? `${DefaultImg}`
                    : `/files/community/${item.profileImg}`
                }
                alt=""
              />
            </p>
            <p
              className="nickname"
              onClick={() => clickProfile(item.id)}
            >
              {item.nickname === '' ? item.name : item.nickname}
            </p>
            <label className="chk_follow">
              <input type="checkbox" name="" />
              <span onClick={() => followingsBtn(item.id, idx, item.follow)}>
                {item.follow ? 'unfollow' : 'follow'}
              </span>
            </label>
          </li>
        );
      })
    ) : (
      <p>
        팔로우가 없습니다.
        <br />
        커뮤니티에서 만난 학습자들을 팔로우 해보세요!
      </p>
    );

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
    }, []);

  return (
    <>
      {/* <FollowerView /> */}
      {/* eslint-disable */}
      <div
        className="main-info-area community-main-header"
        data-area={Area.COMMUNITY_INFO}
      >
        <div className="progress-info-wrap">
          <div className="cell">
            <div className="cell-inner">
              <div
                className="profile"
                onClick={() => history.push('/community/my-profile')}
                style={{ cursor: 'pointer' }}
              >
                <div className="pic">
                  <img
                    src={
                      profile?.profileImg === null ||
                      profile?.profileImg === '' ||
                      profile?.profileImg === undefined
                        ? `${DefaultImg}`
                        : `/files/community/${profile?.profileImg}`
                    }
                  />
                </div>
              </div>
              <div className="text-info">
                <div className="name">
                  <div
                    onClick={() => history.push('/community/my-profile')}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                  >
                    {profile?.nickname || profile?.name || ''}
                  </div>
                  <Link
                    className="ui button orange-arrow2"
                    to="/community/my-profile"
                  >
                    <i aria-hidden="true" className="icon post" />
                    프로필 상세
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="cell">
            <div className="ui statistic community-num">
              <Label className="onlytext">
                <span>Followers</span>
              </Label>
              <div
                style={profile?.followerCount ? { cursor: 'pointer' } : {}}
                className="value2"
                onClick={() => modalOpen('followers')}
              >
                {followersList?.followers.length}
              </div>
            </div>
            <div className="ui statistic community-num">
              <Label className="onlytext">
                <span>Following</span>
              </Label>
              <div
                style={profile?.followingCount ? { cursor: 'pointer' } : {}}
                className="value2"
                onClick={() => modalOpen('following')}
              >
                {followingsList?.followings.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} className="w500 base">
        <Modal.Header>
          {modalHeader === 'followers' ? 'Followers' : 'Followings'}
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-60vh">
            <div className="content-wrap-follow">
              <ul className="follow_list">
                {modalHeader === 'followers' ? followersModal : followingsModal}
              </ul>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Modal.Actions>
      </Modal>
      <CommunityProfileModal
        open={profileOpen}
        setOpen={setProfileOpen}
        userProfile={profileInfo && profileInfo.profileImg}
        memberId={profileInfo && profileInfo.id}
        introduce={profileInfo && profileInfo.introduce}
        nickName={profileInfo && profileInfo.nickName}
        name={profileInfo && profileInfo.creatorName}
      />
      {/* eslint-enable */}
    </>
  );
}

export default CommunityMainHeaderContainer;
