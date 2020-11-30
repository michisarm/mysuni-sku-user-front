import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import FollowModalItem from '../../../viewModel/FollowModalIntro/FollowModalItem';
import { useFollowModal } from '../../../store/CommunityFollowModalStore';

const FollowModalItemView: React.FC<FollowModalItem> = function FollowModalItemViewFunction({
  id,
  nickname,
  profileImg,
  follow,
}) {
  return (
    <>
  
    </>
  );
};

function FollowModalContainer() {
  const [open, setOpen] = useState<boolean>(true);

  // const followModalContainerList = useFollowModal();
  return (
    <>
      {/* <Modal open={open} className="w500 base">
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
      </Modal.Actions> */}
    </>
  );
}

export default FollowModalContainer;