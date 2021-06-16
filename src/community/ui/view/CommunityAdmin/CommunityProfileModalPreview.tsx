import React, { useEffect } from 'react'
import { Button, Checkbox, Image, Modal, } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';
import Avartar from '../../../style/media/img-profile-80-px.png'
import UserProfileInfoView from '../../../../layout/UserApp/Header/ui/view/UserProfileInfoView';

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void,
  memberId: string | undefined,
  preProfileInfo: {
    isSetProfile: boolean,
    nickName: string,
    hobby: string,
    profileImg: string,
    profileBgImg: string,
  },
}

function CommunityProfileModalPreview(props: Props) {
  return (
    <div style={{ display: 'none' }}>
      <UserProfileInfoView open={props.open} setOpen={props.setOpen} memberId={props.memberId} preProfileInfo={props.preProfileInfo} />
    </div>
  );
}

export default CommunityProfileModalPreview;
