import React, { useEffect, useState } from 'react';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import { useMyProfile } from '../../store/MyProfileStore';
import profileIcon from '../../../style/media/img-profile-80-px.png';
import { Link } from 'react-router-dom';
import FollowerView from '../../ui/logic/FollowModalIntro/FollowModalContainer';
import {Button, Modal} from 'semantic-ui-react';
import {requestFollowCommunityList, requestFollowModalAdd, requestFollowModalDelete} from 'community/service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';
import {useFollowCommunityIntro} from 'community/store/CommunityMainStore';
import { useFollowModal, getFollowModal} from '../../store/CommunityFollowModalStore';
import {requestFollowingModal, requestFollowModal} from 'community/service/useFollowModal/utility/requestFollowModalIntro';
import FollowModalIntro from '../../viewModel/FollowModalIntro/CommunityFollowModalIntro';

//default imgage
import DefaultImg from '../../../style/media/img-profile-80-px.png';

function CommunityMainHeaderContainer() {
  const [open, setOpen] = useState<boolean>(false);
  const [openFollowing, setOpenFollowing] = useState<string>("following");
  const [modalHeader, setModalHeader] = useState<string>("");

  useEffect(() => {
    // requestFollowCommunityList();
    requestFollowModal();
  }, []);


  const followModalContainerList = useFollowCommunityIntro();
  const profile = useMyProfile();
  const followersList = useFollowModal();
 

  console.log('folowersList',followersList);

  const modalOpen = (value: string) => {
    if(value === "followers") {
      requestFollowModal();
      setModalHeader("followers");
    }
    if(value === "following") {
      requestFollowingModal();
      setModalHeader("following");
    }
    setOpen(!open);
  }

  // 팔로잉 모달 리스트 버튼
  const followBtn = (id: string, idx: number, follow: boolean) => {

    if(follow === true) {
       requestFollowModalDelete(id);
    }
    else {
       requestFollowModalAdd(id);
    }
  }

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
                  <img src={profileIcon === null ? `${DefaultImg}` : `/files/community/${profileIcon}`} />
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
              <div style={profile?.followerCount ? {cursor:'pointer'} : {} } className="value2" onClick={()=>modalOpen("followers")}>{profile?.followerCount}</div>
            </div>
            <div className="ui statistic community-num">
              <Label className="onlytext">
                <span>Following</span>
              </Label>
              <div style={profile?.followingCount ? {cursor:'pointer'} : {} } className="value2" onClick={()=>modalOpen("following")}>{profile?.followingCount}</div>
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
                  {followersList?.results.map((item,idx) => (
                      <li>
                        <p className="pic"><img src={item.profileImg === null ? `${DefaultImg}` : `/files/community/${item.profileImg}`} alt="" /></p>
                        <p className="nickname">{item.nickname}</p>
                        <label className="chk_follow">
                          <input type="checkbox" name="" />
                          <span onClick={()=>followBtn(item.id, idx, item.follow)}>{item.follow ? "unfollow" : "follow"}</span>
                        </label>
                      </li>   
                    ))
                  }
                </ul>
              </div> 
            </div>
          </Modal.Content>
          <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={()=>setOpen(false)}>닫기</Button>
        </Modal.Actions>          
      </Modal>
      {/* eslint-enable */}
    </>       
  );
}

export default CommunityMainHeaderContainer;
