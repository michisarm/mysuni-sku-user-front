import React, {useState} from 'react';
import { Button, Modal } from 'semantic-ui-react';
import FollowModalItem from '../../../viewModel/FollowModalIntro/FollowModalItem';


const FollowModalItemView: React.FC<FollowModalItem> = function FollowModalItemViewFunction({
  id, 
  nickname, 
  profileImg, 
  unfollow
}) {
  return(
    <>
      <Modal.Header>Followers</Modal.Header>
      <Modal.Content>
        <div className="scrolling-60vh">
          <div className="content-wrap-follow">
            <ul className="follow_list">
              <li>
                <p className="pic"><img src={`/files/community/${profileImg}`} alt="프로필 사진"/></p>
                <p className="nickname">{nickname}</p>
                {/*Follow checkbox : default*/}
                <label className="chk_follow">
                  <input type="checkbox" name=""/>
                  <span>{unfollow}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 d">닫기</Button>
      </Modal.Actions>
    </>
  );
};

interface ModalOpenProps {
  open: boolean;
}

const FollowModalContainer:React.FC<ModalOpenProps> = function FollowModalContainer ({
  open
}) {
  console.log('opopen', open);
  return(
    <>
      <Modal open={open} className="w500 base">
        {FollowModalItemView}
      </Modal>
    </>
  );
}

export default FollowModalContainer;