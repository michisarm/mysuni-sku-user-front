import React, { useEffect, useState } from 'react';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import { useMyProfile } from '../../store/MyProfileStore';
import profileIcon from '../../../style/media/img-profile-80-px.png';
import { Link } from 'react-router-dom';
import {Button, Modal} from 'semantic-ui-react';
import { requestFollowModalAdd, requestFollowModalDelete} from 'community/service/useFollowModal/utility/requestFollowModalIntro';
import {useFollowCommunityIntro} from 'community/store/CommunityMainStore';
import { useFollowersModal, useFollowingsModal} from '../../store/CommunityFollowModalStore';
import {requestFollowingsModal, requestFollowersModal} from 'community/service/useFollowModal/utility/requestFollowModalIntro';

//default imgage
import DefaultImg from '../../../style/media/img-profile-80-px.png';
import {render} from 'react-dom';

function CommunityMainHeaderContainer() {
  const [open, setOpen] = useState<boolean>(false);
  const [openFollowing, setOpenFollowing] = useState<string>('following');
  const [modalHeader, setModalHeader] = useState<string>('');

  useEffect(() => {
    requestFollowersModal();
    requestFollowingsModal();
  },[]);


  // const followModalContainerList = useFollowCommunityIntro();
  const profile = useMyProfile();

  const followersList = useFollowersModal();
  const followingsList = useFollowingsModal();
 

  const modalOpen = (value: string) => {
    if(value === "followers") {
      requestFollowersModal();
      setModalHeader("followers");
      setOpen(!open);

    }
    if(value === "following") {
      requestFollowingsModal();
      setModalHeader("following");
      setOpen(!open);
    }
  }


  // 팔로잉 모달 리스트 버튼
  const followersBtn = (id: string, idx: number, follow: boolean) => {

    if(follow === true) {
      requestFollowModalDelete(id, 'follower');
    }
    else {
      requestFollowModalAdd(id, 'follower');
    }
  }

  const followingsBtn = (id: string, idx: number, follow: boolean) => {

    if(follow === true) {
      requestFollowModalDelete(id, 'following');
    }
    else {
      requestFollowModalAdd(id, 'following');
    }
  };

  const followersModal = followersList?.followers.map((item,idx) => {
    return(
      <li>
        <p className="pic"><img src={item.profileImg === null || item.profileImg === '' ? `${DefaultImg}` : `/files/community/${item.profileImg}`} alt="" /></p>
        <p className="nickname">{item.nickname}</p>
        <label className="chk_follow">
          <input type="checkbox" name="" />
          <span onClick={()=>followersBtn(item.id, idx, item.follow)}>{item.follow ? "unfollow" : "follow"}</span>
        </label>
      </li>
    );   
  });

  const followingsModal = followingsList?.followings.map((item,idx) => {
    return(
      <li>
        <p className="pic"><img src={item.profileImg === null || item.profileImg === ''  ? `${DefaultImg}` : `/files/community/${item.profileImg}`} alt="" /></p>
        <p className="nickname">{item.nickname}</p>
        <label className="chk_follow">
          <input type="checkbox" name="" />
          <span onClick={()=>followingsBtn(item.id, idx, item.follow)}>{item.follow ? "unfollow" : "follow"}</span>
        </label>
      </li>
    );   
  });

  return (
    <>
      {/* <FollowerView /> */}
      {/* eslint-disable */}
      <div className="main-info-area community-main-header">
        <div className="progress-info-wrap">
          <div className="cell">
            <div className="cell-inner">
              <div className="profile">
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
                  {profile?.nickname || profile?.name || ''}
                  <Link
                    className="ui button orange-arrow2"
                    to="/community/my-profile"
                  >
                    <i aria-hidden="true" className="icon post" />
                    프로필 수정
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
        <Modal.Header>{modalHeader === "followers" ? 'Followers' : "Followings"}</Modal.Header>
          <Modal.Content>
            <div className="scrolling-60vh">
              <div className="content-wrap-follow">
                <ul className="follow_list">
                  {modalHeader === "followers" ? followersModal : followingsModal}
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
      {/* eslint-enable */}
    </>
  );
}

export default CommunityMainHeaderContainer;
