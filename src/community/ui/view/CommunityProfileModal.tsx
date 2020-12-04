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
                <img 
                  src={(userProfile &&
                      '/files/community/' + userProfile) ||
                    'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCI+DQogICAgPGRlZnM+DQogICAgICAgIDxjaXJjbGUgaWQ9ImEiIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIvPg0KICAgIDwvZGVmcz4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+DQogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNhIi8+DQogICAgICAgIDwvbWFzaz4NCiAgICAgICAgPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzkuNSIgc3Ryb2tlPSIjREREIi8+DQogICAgICAgIDxwYXRoIGZpbGw9IiNEREQiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTU5LjExIDY3Ljc4Yy04LjM5LTMuMDU3LTExLjA3NC01LjYzNy0xMS4wNzQtMTEuMTYyIDAtMy4zMTYgMi43NS01LjQ2NSAzLjY4Ny04LjMwNi45MzgtMi44NDIgMS40OC02LjIwNyAxLjkzLTguNjU0LjQ1MS0yLjQ0OC42My0zLjM5NC44NzUtNi4wMDJDNTQuODI4IDMwLjQwMiA1Mi42NSAyMiA0MSAyMmMtMTEuNjQ2IDAtMTMuODMyIDguNDAyLTEzLjUyNSAxMS42NTYuMjQ1IDIuNjA4LjQyNSAzLjU1NS44NzUgNi4wMDIuNDUgMi40NDcuOTg2IDUuODEyIDEuOTIzIDguNjU0LjkzNyAyLjg0MSAzLjY5IDQuOTkgMy42OSA4LjMwNiAwIDUuNTI1LTIuNjgyIDguMTA1LTExLjA3NCAxMS4xNjJDMTQuNDY3IDcwLjg0NCA5IDczLjg2NiA5IDc2djEwaDY0Vjc2YzAtMi4xMzEtNS40Ny01LjE1Mi0xMy44OS04LjIyeiIgbWFzaz0idXJsKCNiKSIvPg0KICAgIDwvZz4NCjwvc3ZnPg0K'
                  }
                  style={{width:"100%"}} 
                  alt="프로필 사진"
                />
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
