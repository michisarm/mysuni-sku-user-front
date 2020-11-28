import React,{useState,useCallback} from 'react';
import { Comment } from "semantic-ui-react";
import moment from 'moment';
import { useCommunityMember } from 'community/store/CommunityMemberStore';
import AvartarImage from '../../../../style/media/img-profile-80-px.png';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import { onFollow } from 'community/service/useMemberList/useMemberList';
import { getFollowMember, useFollowMember } from 'community/store/CommunityMemberFollowStore';
import { memberFollowDel } from 'community/api/MemberApi';

function ItemBox({memberList}: {memberList:any}) {
  const [follow, setFollow] = useState<boolean>(false)
  const follwer = useFollowMember();

  const handleFollow = useCallback((memberId) => {
    setFollow(!follow)
    getFollowMember();
    if(follow) {
      onFollow(memberId)
    } else {
      memberFollowDel(memberId)
    }
  }, [])

  console.log(follwer)

  return (
    <>
      <div className="member-card">
        <Comment>
          <Comment.Avatar src={memberList.profileImg != null ? `/files/community/${memberList.profileImg}` : `${AvartarImage}`} />
          <Comment.Content>
            <Comment.Author as="a">
              {/* 어드민 아이콘 영역 */}
              <img src={AdminIcon} style={memberList.manager ? {display:"inline"} : {display:"none"}} /><span>{memberList.name}</span>
              <button type="button" title="Follow" onClick={() => handleFollow(memberList.memberId)}><span className="card-follow">{follow ? "Unfollow" : "Follow"}</span></button>
            </Comment.Author>
            <Comment.Metadata>
              <span>게시물</span>
              <span>{memberList.postCount === null ? 0 : memberList.postCount}</span>
              <span>댓글</span>
              <span>{memberList.replyCount === null ? 0 : memberList.replyCount}</span>
            </Comment.Metadata>
            <Comment.Metadata>
              <span className="date">{memberList.createdTime && moment(memberList.createdTime).format('YYYY.MM.DD')}</span>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
      </div>
    </>
  );
}

export const CommunityMemberView = () => {
  const memberData = useCommunityMember();
  
  return (
    <>
      <div className="mycommunity-card-list">
        {memberData?.results.map((item, index) => <ItemBox memberList={item} key={index} /> )}
      </div>
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
