import React from 'react';
import UserProfileInfoView from '../../../../layout/UserApp/Header/ui/view/UserProfileInfoView';

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
  memberId: string | undefined;
  preProfileInfo: {
    isSetProfile: boolean; // true
    nickName: string;
    introduce: string;
    profileImg: string;
    profileBgImg: string;
  };
}

function CommunityProfileModalPreview(props: Props) {
  return (
    <div style={{ display: 'none' }}>
      <UserProfileInfoView
        open={props.open}
        setOpen={props.setOpen}
        memberId={props.memberId}
        preProfileInfo={props.preProfileInfo}
      />
    </div>
  );
}

export default CommunityProfileModalPreview;
