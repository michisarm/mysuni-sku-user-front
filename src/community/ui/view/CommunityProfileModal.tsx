import React, {useEffect} from 'react'
import { Button, Checkbox, Image, Modal,} from 'semantic-ui-react'
import { useCommunityPostDetail } from 'community/service/useCommunityPostDetail/useCommunityPostDetail'
import { useParams, useHistory } from 'react-router-dom';
import { getCommunityPostDetail } from 'community/service/useCommunityPostCreate/utility/getCommunityPostDetail';

interface Props {
  open: boolean;
  setOpen: (state:boolean) => void,
  userProfile:string,
  creatorId:string,
  introduce:string,
  nickName:string
}

const CommunityProfileModal:React.FC<Props> = ({open, setOpen, userProfile, creatorId, introduce, nickName}) => {
  const history = useHistory();

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
              <p style={{width:"85px",margin:"0 auto"}}><img src={`/files/community/${userProfile}`} style={{width:"100%"}} alt="프로필 사진"/></p>
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
        <button className="ui button pop2 p" onClick={() => history.push(`/community/profile/${creatorId}`)}>상세보기</button>
      </Modal.Actions>
    </Modal>
  )
}

export default CommunityProfileModal;
