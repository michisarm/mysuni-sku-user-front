import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import FollowModalItem from '../../../viewModel/FollowModalIntro/FollowModalItem';
import { useFollowModal } from '../../../store/CommunityFollowModalStore';

const FollowModalItemView: React.FC<FollowModalItem> = function FollowModalItemViewFunction({
  id,
  nickname,
  profileImg,
  unfollow,
}) {
  return (
    <>
      <div className="scrolling-60vh">
        <div className="content-wrap-follow">
          <ul className="follow_list">
            <li>
              <p className="pic"><img src={`/files/community/profileImg`} alt="프로필 사진" /></p>
              <p className="nickname">nickName</p>
              {/*Follow checkbox : default*/}
              <label className="chk_follow">
                <input type="checkbox" name="" />
                <span>unfollow</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

function FollowModalContainer() {
  const [open, setOpen] = useState<boolean>(true);

  const followModalContainerList = useFollowModal();
  console.log('open', open);
  return (
    <>
      <Modal open={open} className="w500 base">
        <Modal.Header>Followers</Modal.Header>
        <Modal.Content>
          {followModalContainerList !== undefined &&
            followModalContainerList.communities.map(item => (
              <FollowModalItemView key={item.id} {...item} />
            ))}
        </Modal.Content>
      </Modal>
      <Modal.Actions className="actions2">
        <Button className="pop2 d">닫기</Button>
      </Modal.Actions>
    </>
  );
}

export default FollowModalContainer;