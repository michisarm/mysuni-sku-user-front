import React,{useState,useEffect,useCallback} from 'react';
import { Comment } from "semantic-ui-react";
import moment from 'moment';
import { useCommunityGroupMember } from 'community/store/CommunityGroupMemberStore';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import AvartarImage from '../../../../style/media/img-profile-80-px.png';
import { useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import { onFollow, onUnFollow } from 'community/service/useMemberList/useMemberList';
import { getGroupMember } from 'community/service/useGroupList/useGroupList';

function ItemBox({groupMemberList, activePage} :{groupMemberList:any, activePage:number}) {
  const [follow, setFollow] = useState<boolean>(false);

  const handleFollow = useCallback(async (communityId:string,memberId:string, followState:boolean) => {
    
    if(followState === false) {
      onFollow(communityId, memberId,(activePage - 1) * 8)
    } else {
      onUnFollow(communityId, memberId, (activePage - 1) * 8)
    }
  }, [activePage])

  return (
    <div className="member-card">
      <Comment>
        <Comment.Avatar src={groupMemberList.profileImg != null ? `/files/community/${groupMemberList.profileImg}` : `${AvartarImage}`} />
        <Comment.Content>
          <Comment.Author as="a">
            {/* 어드민 아이콘 영역 */}
            <img src={AdminIcon} style={groupMemberList.manager ? {display:"inline"} : {display:"none"}} /><span>{groupMemberList.nickname}</span>
            <button type="button" title="Follow" onClick={() => handleFollow(groupMemberList.communityId, groupMemberList.memberId, groupMemberList.follow)}><span className="card-follow">{groupMemberList.follow || follow ? "Unfollow" : "Follow"}</span></button>
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

interface Params {
  communityId: string,
  groupId: string
}

export const CommunityGroupMemberListView:React.FC = function GroupListView() {
  const groupMemberData = useCommunityGroupMember();
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const {communityId, groupId} = useParams<Params>();

  const totalPages = () => {
    let totalPage = Math.ceil(groupMemberData!.totalCount / 8)
    if (groupMemberData!.totalCount % 8 < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }
  
  useEffect(() => {
    if(groupMemberData === undefined) {
      return
    }
    totalPages();
  }, [groupMemberData])

  const onPageChange = (data:any) => {
    getGroupMember(communityId, groupId, (data.activePage - 1 ) * 8)
    setActivePage(data.activePage)
  }

  return (
    <>
      {groupMemberData && groupMemberData.results.map((item, index) => <ItemBox groupMemberList={item} key={index} activePage={activePage} />)}
      {
        groupMemberData && groupMemberData.totalCount >= 8 ? (
          <div className="lms-paging-holder">
            <Pagination
              activePage={activePage}
              totalPages={totalPage}
              firstItem={null}
              lastItem={null}
              onPageChange={(e, data) => onPageChange(data)}
            />
          </div>
        ) : (
          null
        )
      } 
    </>
  )
}
