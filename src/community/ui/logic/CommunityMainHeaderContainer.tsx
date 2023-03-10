/* eslint-disable react-hooks/exhaustive-deps */
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
import ProfileImage from '../../../../src/shared/components/Image/Image';
import ProfileImagePath from '../../../../src/shared/components/Image/ProfileImagePath';
import {
  followMember,
  unfollowMember,
} from '../../../layout/UserApp/api/ProfileInfoAPI';
import { isExternalInstructor } from '../../../shared/helper/findUserRole';

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
    history.push('/my-training/my-page/MyProfile');
  }, []);

  useEffect(() => {
    const isExternal = isExternalInstructor();
    if (isExternal) {
      return;
    }

    if (profile && profile?.nickname === '') {
      reactConfirm({
        title: 'Community ????????? ???????????????!',
        message: '????????? ?????????/????????? ????????? ??????????????????!',
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

  // ????????? ?????? ????????? ??????
  const followersBtn = (id: string, idx: number, follow: boolean) => {
    if (follow === true) {
      // requestFollowModalDelete(id, 'follower');
      unfollowMember(id).then(() => requestFollowersModal());
    } else {
      // requestFollowModalAdd(id, 'follower');
      followMember(id).then(() => requestFollowersModal());
    }
  };

  const followingsBtn = (id: string, idx: number, follow: boolean) => {
    if (follow === true) {
      // requestFollowModalDelete(id, 'following');
      unfollowMember(id).then(() => requestFollowingsModal());
    } else {
      // requestFollowModalAdd(id, 'following');
      followMember(id).then(() => requestFollowingsModal());
    }
  };

  const followersModal =
    followersList?.followers.length !== 0 ? (
      followersList?.followers.map((item, idx) => {
        return (
          <li style={{ cursor: 'pointer' }}>
            <p className="pic" onClick={() => clickProfile(item.id)}>
              <ProfileImage
                src={
                  item.profileImg === null || item.profileImg === ''
                    ? `${DefaultImg}`
                    : `${ProfileImagePath(item.profileImg)}`
                }
                alt=""
              />
            </p>
            <p className="nickname" onClick={() => clickProfile(item.id)}>
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
        ???????????? ????????????.
        <br />
        ???????????? ??????????????? ?????? ????????? ????????? ????????????!
      </p>
    );

  const followingsModal =
    followingsList?.followings.length !== 0 ? (
      followingsList?.followings.map((item, idx) => {
        return (
          <li style={{ cursor: 'pointer' }}>
            <p className="pic" onClick={() => clickProfile(item.id)}>
              <ProfileImage
                src={
                  item.profileImg === null || item.profileImg === ''
                    ? `${DefaultImg}`
                    : `${ProfileImagePath(item.profileImg)}`
                }
                alt=""
              />
            </p>
            <p className="nickname" onClick={() => clickProfile(item.id)}>
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
        ???????????? ????????????.
        <br />
        ?????????????????? ?????? ??????????????? ????????? ????????????!
      </p>
    );

  const clickProfile = useCallback(async (id) => {
    findCommunityProfile(id).then((result) => {
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

  const isExternal = isExternalInstructor();

  return (
    <>
      {/* <FollowerView /> */}
      {/* eslint-disable */}
      <div className="main-info-area" data-area={Area.COMMUNITY_INFO}>
        <div className="progress-info-wrap mypage personal-detail">
          <div className="cell">
            <div className="cell-inner personal-inner">
              <div
                className="profile"
                onClick={() =>
                  !isExternal && history.push('/my-training/my-page')
                }
                style={{ cursor: `${isExternal ? 'default' : 'pointer'}` }}
              >
                <div className="pic">
                  <ProfileImage
                    src={
                      profile?.profileImg === null ||
                      profile?.profileImg === '' ||
                      profile?.profileImg === undefined
                        ? `${DefaultImg}`
                        : `${ProfileImagePath(profile?.profileImg)}`
                    }
                  />
                </div>
              </div>
              <div className="text-info">
                <div className="name">
                  <div
                    onClick={() =>
                      !isExternal && history.push('/my-training/my-page')
                    }
                    style={{
                      cursor: `${isExternal ? 'default' : 'pointer'}`,
                      display: 'inline-block',
                    }}
                  >
                    {profile?.nameFlag === 'N'
                      ? profile?.nickname
                      : profile?.name}
                    ???,
                  </div>
                </div>
                <div className="part">
                  <p>mySUNI ??????????????? ???????????? ????????? ????????? ???????????????!</p>
                  {/* <Link
                    className="ui button orange-arrow2"
                    to="/my-training/my-page"
                    >
                      <i aria-hidden="true" className="icon post" />
                      ????????? ????????????
                    </Link> */}
                </div>
                {/* <div className="part">
                    <Link
                      className="ui button orange-arrow"
                      to="/my-training/my-page"
                    >
                      <i aria-hidden="true" />
                      ????????? ????????????
                    </Link>
                </div> */}
              </div>
            </div>
          </div>
          {!isExternal && (
            <>
              <div className="cell followers">
                <div className="cell-inner">
                  <div className="stamp-wrap">
                    <Label className="stamp">
                      <div
                        style={
                          profile?.followerCount ? { cursor: 'pointer' } : {}
                        }
                        onClick={() => modalOpen('followers')}
                      >
                        <span className="text1">Followers</span>
                        <div className="border_line">
                          <span className="text3">
                            {followersList?.followers.length}
                          </span>
                          <span className="text5">???</span>
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
                        style={
                          profile?.followingCount ? { cursor: 'pointer' } : {}
                        }
                        onClick={() => modalOpen('following')}
                      >
                        <span className="text1">Following</span>
                        <div className="border_line">
                          <span className="text2">
                            {followingsList?.followings.length}
                          </span>
                          <span className="text6">???</span>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            </>
          )}
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
            ??????
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
