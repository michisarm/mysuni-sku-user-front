import React,{useState,useEffect,useCallback} from 'react';
import { Comment } from "semantic-ui-react";
import moment from 'moment';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import AvartarImage from '../../../../style/media/img-profile-80-px.png';
import { useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import { getGroupMemberData } from 'community/service/useGroupList/useGroupList';
import { onFollowGroupMember,onUnFollowGroupMember } from 'community/service/useGroupList/useGroupList';
import { CommunityGroupMemberList } from 'community/model/CommunityMemberGroup';

function ItemBox({
  groupMemberList, memberData, setMemberData, activePage, groupId} 
  :{groupMemberList:any, memberData:any, setMemberData:any, activePage:number, groupId:string,}) 
{

  const handleFollow = useCallback(async (communityId:string, memberId:string, followState:boolean) => {
    if(activePage === undefined || memberData === undefined) {
      return false
    }
    
    if(followState === false) {
      onFollowGroupMember(communityId, groupId, memberId, (activePage - 1) * 8).then((result) => {
        setMemberData(result);
      })
      
    } else {
      onUnFollowGroupMember(communityId, groupId, memberId, (activePage - 1) * 8).then((result) => {
        setMemberData(result);
      })
    }
    
  },[activePage, memberData])

  return (
    <div className="member-card">
      <Comment>
        <Comment.Avatar src={groupMemberList.profileImg ? `/files/community/${groupMemberList.profileImg}` : `${AvartarImage}`} />
        <Comment.Content>
          <Comment.Author as="a">
            {/* 어드민 아이콘 영역 */}
            <img src={AdminIcon} style={groupMemberList.manager ? {display:"inline"} : {display:"none"}} /><span>{groupMemberList.nickname}</span>
            <button type="button" title="Follow" onClick={() => handleFollow(groupMemberList.communityId, groupMemberList.memberId, groupMemberList.follow)}>
              <span className="card-follow">{groupMemberList.follow  ? "Unfollow" : "Follow"}</span>
            </button>
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

interface Props {
  groupId: string
}

export const CommunityGroupMemberListView:React.FC<Props> = function GroupListView({groupId}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [memberData, setMemberData] = useState<CommunityGroupMemberList>();
  const {communityId} = useParams<Params>();
  

  async function MemberData(){
    const data = await getGroupMemberData(communityId, groupId, 0);
    setMemberData(data);
  }
  
  useEffect(() => {
    MemberData();
  }, [])
  
  const totalPages = () => {
    let totalPage = Math.ceil(memberData!.totalCount / 8)
    if (memberData!.totalCount % 8 < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }
  
  useEffect(() => {
    if(memberData === undefined) {
      return
    }
    totalPages();
  }, [memberData])

  const onPageChange = async (data:any) => {
    const newData = await getGroupMemberData(communityId, groupId, (data.activePage - 1 ) * 8);
    setMemberData(newData);
    setActivePage(data.activePage)
  }

  return (
    <>
      {memberData && memberData.results.map((item, index) => <ItemBox groupMemberList={item} memberData={memberData} setMemberData={setMemberData} groupId={groupId} key={index} activePage={activePage} />)}
      <div className="lms-paging-holder">
        <Pagination
          activePage={activePage}
          totalPages={totalPage}
          firstItem={null}
          lastItem={null}
          onPageChange={(e, data) => onPageChange(data)}
        />
      </div>
    </>
  )
}
