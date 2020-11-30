import React, { useEffect, useState } from 'react';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import { useMyProfile } from '../../store/MyProfileStore';
import profileIcon from '../../../style/media/img-profile-80-px.png';
import { Link } from 'react-router-dom';
import FollowerView from '../../ui/logic/FollowModalIntro/FollowModalContainer';
import {Button, Modal} from 'semantic-ui-react';
import {useFollowModal} from 'community/store/CommunityFollowModalStore';
import {requestFollowCommunityList, requestFollowModalAdd, requestFollowModalDelete} from 'community/service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';
import {useFollowCommunityIntro} from 'community/store/CommunityMainStore';



function CommunityMainHeaderContainer() {
  const [open, setOpen] = useState<boolean>(false);
  const [openFollowing, setOpenFollowing] = useState<string>("following");
  const [modalHeader, setModalHeader] = useState<string>("");

  useEffect(() => {
    // requestFollowCommunityList();
    // requestFollowersList();
  }, []);

  const followModalContainerList = useFollowCommunityIntro();

  const profile = useMyProfile();

  const modalOpen = (value: string) => {
    if(value === "followers") {
      setModalHeader("followers");
    }
    if(value === "following") {
      setModalHeader("following");
    }
    setOpen(!open);
  }

  const followBtn = (id: string, idx: number, follow: boolean) => {
    console.log('idx', idx, id, follow);

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
                  <img src={profileIcon} />
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
                    프로필수정
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
            <div className="value2" onClick={()=>modalOpen("followers")}>0</div>
            </div>
            <div className="ui statistic community-num">
              <Label className="onlytext">
                <span>Following</span>
              </Label>
              <div className="value2" onClick={()=>modalOpen("following")}>0</div>
            </div>
          </div>
        </div> 
      </div>

      <Modal open={open} className="w500 base">
        <Modal.Header>{modalHeader === "followers" ? 'Followers' : "Followings"}</Modal.Header>
          <Modal.Content>
            <div className="content-wrap-follow">
              <ul className="follow_list">
                {modalHeader === "following" ? followModalContainerList !== undefined &&
                  followModalContainerList.communities.map((item,idx) => (
                    <li>
                      <p className="pic"><img src={`/files/community/${item.profileImg}`} alt="" /></p>
                      <p className="nickname">{item.nickname}</p>
                      <label className="chk_follow">
                        <input type="checkbox" name="" />
                        <span onClick={()=>followBtn(item.id, idx, item.follow)}>{item.follow && "unfollow"}</span>
                      </label>
                    </li>      
                  )) : '.'
                }
              </ul>
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
