import React, {useEffect} from 'react'
import { Button, Checkbox, Image, Modal,} from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';
import Avartar from '../../../style/media/img-profile-80-px.png'

interface Props {
  open: boolean;
  setOpen: (state:boolean) => void,
  userProfile:string | undefined,
  memberId:string | undefined,
  introduce:string | undefined,
  nickName:string | undefined,
}

const CommunityProfileModal:React.FC<Props> = ({open, setOpen, userProfile, memberId, introduce, nickName}) => {
  const history = useHistory();
  const currentUser = patronInfo.getDenizenId();

  const handleProfileView = (targetId:string | undefined) => {
    if (targetId === currentUser) {
      history.push('/community/my-profile')
    } else {
      history.push(`/community/profile/${targetId}`)
    }
  }
  
  return (
    // open={open}
    <Modal open={open} className="w500 base">
      <Modal.Header>
        프로필 보기
      </Modal.Header>
      <Modal.Content>
        <div className="profile_box profile_v">
          <div className="profile_pic">
            <div className="pic_area user">
              <p style={{width:"85px",margin:"0 auto"}}>
              <img src={ userProfile === null || userProfile === '' || userProfile === undefined ? `${Avartar}` : `/files/community/${userProfile}`} style={{width:"100%"}} alt="프로필 사진"/>
              </p>
            </div>
          </div>

          <div className="profile_info">
            <p className="name">{nickName}</p>
            <p>{introduce}</p>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions actions2">
        <button className="ui button pop2 d" onClick={() => setOpen(!open)}>닫기</button>
        <button className="ui button pop2 p" onClick={() => handleProfileView(memberId)}>{memberId === currentUser ? "프로필 수정" : "상세보기"}</button>
      </Modal.Actions>
    </Modal>
  )
}

export default CommunityProfileModal;
