import React,{useState} from 'react';
import { Comment } from "semantic-ui-react";
import moment from 'moment';
import { useCommunityGroupMember } from 'community/store/CommunityGroupMemberStore';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import AvartarImage from '../../../../style/media/img-profile-80-px.png';

function ItemBox({groupMemberList} :{groupMemberList:any}) {
  const [follow, setFollow] = useState<boolean>(false)

  return (
    <div className="member-card">
      <Comment>
        <Comment.Avatar src={groupMemberList.profileImg != null ? `/files/community/${groupMemberList.profileImg}` : `${AvartarImage}`} />
        <Comment.Content>
          <Comment.Author as="a">
            {/* 어드민 아이콘 영역 */}
            <img src={AdminIcon} style={groupMemberList.manager ? {display:"inline"} : {display:"none"}} /><span>{groupMemberList.name}</span>
            <button type="button" title="Follow" onClick={() => setFollow(!follow)}><span className="card-follow">{follow ? "Unfollow" : "Follow"}</span></button>
          </Comment.Author>
          <Comment.Metadata>
            <span>게시물</span>
            <span>{groupMemberList.postCount === null ? 0 : groupMemberList.postCount}</span>
            <span>댓글</span>
            <span>{groupMemberList.replyCount === null ? 0 : groupMemberList.replyCount}</span>
          </Comment.Metadata>
          <Comment.Metadata>
            <span className="date">{groupMemberList.createdTime && moment(groupMemberList.createdTime).format('YYYY.MM.DD')}</span>
          </Comment.Metadata>
        </Comment.Content>
      </Comment>
    </div>
  )
}

export const CommunityGroupMemberListView:React.FC = function GroupListView() {
  const groupMemberData = useCommunityGroupMember();
  return (
    <>
      {groupMemberData && groupMemberData.results.map((item, index) => <ItemBox groupMemberList={item} key={index} />)}
      <div className="paging mb0">
        <div className="lms-paging-holder">
          <a className="lms-prev">이전10개</a>
          <a className="lms-num lms-on">1</a>
          <a className="lms-num">2</a>
          <a className="lms-num">3</a>
          <a className="lms-num">4</a>
          <a className="lms-num">5</a>
          <a className="lms-num">6</a>
          <a className="lms-num">7</a>
          <a className="lms-num">8</a>
          <a className="lms-num">9</a>
          <a className="lms-num">10</a>
          <a className="lms-next">이후10개</a>
        </div>
      </div>
    </>
  )
}
